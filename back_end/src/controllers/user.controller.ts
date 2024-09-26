import { NextFunction, Request, Response } from 'express'
import UserService from '../services/user-service'
const { PrismaClient } = require('@prisma/client');
import { updateUserSchema } from '../utils/schema/user.schema';
import { RequestWithUser } from '../types/post';

const prisma = new PrismaClient();

class userController {
    async getAllUser(req: RequestWithUser, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        const user = await prisma.user.findMany({
            where: { id: { not: userId } },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
                email: true,
                followers: true,
                following: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return res.json(user)
    }

    async getUser(req: RequestWithUser, res: Response) {
        const userId = req.user.id
        const user = await UserService.getUser(userId);
        res.json(user)
    }

    

    async update(req: Request, res: Response) {
        const userId = parseInt(req.params.id)
        const value = await updateUserSchema.validateAsync(req.body)
        const user = await UserService.updateUser(userId, value)
        res.json(user);
    }
}

export default new userController()