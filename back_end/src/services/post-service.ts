import { Post, PrismaClient } from "@prisma/client";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";

const prisma = new PrismaClient();
class postService {
    async getAllPosts(): Promise<Post[]> {
        return await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        userName: true,
                        bio: true,
                        createdAt: true,
                        email: true,
                        followers: true,
                        following: true,
                        post: true,
                        reply: true,
                        role: true,
                        updatedAt: true
                    }
                }
            }
        });
    };

    async getPostById(id: number): Promise<Post | null> {
        return await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        fullName: true,
                        userName: true,
                        bio: true,
                        createdAt: true,
                        email: true,
                        followers: true,
                        following: true,
                        post: true,
                        reply: true,
                        role: true,
                        updatedAt: true
                    }
                }
            }
        });
    };

    async createPost(data: CreatePostDTO): Promise<Post | null> {
        return await prisma.post.create({
            data: {
                ...data,
                authorId: 1
            }
        });
    };

    async updatePost(data: UpdatePostDTO): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id: data.id,
            }
        });

        const update: Partial<Post> = {};
        if (post && data.content) {
            post.content = data.content;
        }

        if (post && data.image) {
            post.image = data.image;
        }

        return await prisma.post.update({
            data: update,
            where: { id: 2 },
        });
    }

    async deletePost(id: number): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        return await prisma.post.delete({
            where: { id }
        });
    }
};

export default new postService();