import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user-service'
const { PrismaClient } = require('@prisma/client');
import { updateUserSchema } from '../utils/schema/user.schema';
import { RequestWithUser } from '../types/post';
import cloudinaryService from '../services/cloudinary.service';
import { CustomError } from '../middlewares/errorHandler';
import userService from '../services/user-service';

const prisma = new PrismaClient();

class userController {
    async getAllUser(req: RequestWithUser, res: Response) {
        const userId = req.user?.id;
        const user = await prisma.user.findMany({
            where: { id: { not: userId } },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
                email: true,
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                },
                role: true,
                createdAt: true,
                updatedAt: true,
                image: true
            }
        })

        return res.json(user)
    }

    async getUser(req: RequestWithUser, res: Response) {
        const userId = req.user.id
        const user = await UserService.getUser(userId);
        const following = user?._count.followers;
        const followers = user?._count.following;
        res.json({
            ...user,
            following,
            followers
        })
    }

    async getUserById(req: RequestWithUser, res: Response) {
        const { userId } = req.params;
        const user = await UserService.getUserById(parseInt(userId));
        const following = user?._count.followers;
        const followers = user?._count.following;
        res.json({
            ...user,
            following,
            followers
        })
    }

    async update(req: RequestWithUser, res: Response) {
        const userId = req.user.id;
        let imageUrl: string | undefined;
        let backgroundUrl: string | undefined;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (files?.image) {
            const image = await cloudinaryService.upload(files.image[0]);
            imageUrl = image.secure_url;
        }

        if (files?.background) {
            const background = await cloudinaryService.upload(files.background[0]);
            backgroundUrl = background.secure_url;
        }

        const body = {
            ...req.body,
            ...(imageUrl && { image: imageUrl }),
            ...(backgroundUrl && { background: backgroundUrl })
        }
        const value = await updateUserSchema.validateAsync(body)
        const user = await UserService.updateUser(userId, value)
        res.json(user);
    }

    async deleteUser(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new CustomError("You do not have permission to delete this post", 403);
        }
        const deletePost = await userService.deleteUser(id);
        if (!deletePost) {
            throw new CustomError("Post not found", 404);
        }
        res.json(deletePost);
    }
}

export default new userController()