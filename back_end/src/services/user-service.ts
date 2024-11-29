import { Post, PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../dto/user.dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class UserService {
    async getUser(userId: number): Promise<Omit<User, "password"> & { _count: { followers: number; following: number } } | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
                email: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
                role: true,
                createdAt: true,
                updatedAt: true,
                image: true,
                background: true
            }
        });
        return user
    };

    async getUserById(id: number): Promise<Omit<User, "password"> & { _count: { followers: number; following: number } } | null> {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
                email: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
                role: true,
                createdAt: true,
                updatedAt: true,
                image: true,
                background: true
            }
        });
        return user
    }


    async updateUser(id: number, data: UpdateUserDTO
    ): Promise<{ user: Pick<User, "fullName" | "userName" | "bio" | "image" | "id" | "background"> }> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        };

        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                fullName: data.fullName || user.fullName,
                userName: data.userName || user.userName,
                bio: data.bio || user.bio,
                image: data.image || user.image,
                background: data.background || user.background
            },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
                image: true,
                background: true
            }
        })

        return {
            user: updateUser
        };
    }

    async deleteUser(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return null;
        }

        await prisma.follow.deleteMany({
            where: {
                OR: [
                    { followerId: id },
                    { followingId: id }
                ]
            }
        });

        await prisma.like.deleteMany({
            where: { userId: id }
        });

        await prisma.reply.deleteMany({
            where: { authorId: id }
        });

        const posts = await prisma.post.findMany({
            where: { authorId: id }
        });

        for (const post of posts) {
            await prisma.reply.deleteMany({
                where: { postId: post.id }
            });

            await prisma.like.deleteMany({
                where: { postId: post.id }
            });

            await prisma.post.delete({
                where: { id: post.id }
            });
        }

        return await prisma.user.delete({
            where: { id },
        });
    }
}

export default new UserService()