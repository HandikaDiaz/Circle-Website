import { Post, PrismaClient } from "@prisma/client";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";

const prisma = new PrismaClient();

class postService {
    async getPostByAuthor(authorId: number): Promise<Post[]> {
        const post = await prisma.post.findMany({
            where: { authorId },
            include: {
                reply: true,
                like: true,
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
                        role: true,
                        updatedAt: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        const postsWithReplyCount = post.map((post) => {
            return {
                ...post,
                repliesCount: post.reply.length,
            };
        });

        return postsWithReplyCount;
    };

    async getPostById(postId: number): Promise<Post | null> {
        return await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                reply: true,
                author: {
                    select: {
                        fullName: true,
                        userName: true,
                        image: true
                    }
                }
            }
        });
    };

    async getAllPostsByAuthor(authorId: number): Promise<Post[]> {
        const post = await prisma.post.findMany({
            where: { authorId },
            include: {
                reply: true,
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
                        role: true,
                        updatedAt: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        const postsWithReplyCount = post.map((post) => {
            return {
                ...post,
                repliesCount: post.reply.length
            };
        });

        return postsWithReplyCount;
    };

    async createPost(data: CreatePostDTO, authorId: number): Promise<Post | null> {

        return await prisma.post.create({
            data: {
                ...data,
                authorId
            }
        })
    };

    async updatePost(data: UpdatePostDTO): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: {
                id: data.id,
            }
        });

        const update: Partial<Post> = {};
        if (data.content) {
            update.content = data.content;
        }

        if (data.image) {
            update.image = data.image;
        }

        return await prisma.post.update({
            where: { id: data.id },
            data: update,
        });
    }

    async deletePost(id: number): Promise<Post | null> {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return null;
        }

        await prisma.post.deleteMany({
            where: { authorId: id }
        });

        await prisma.reply.deleteMany({
            where: {
                AND: [
                    { authorId: id },
                    { postId: id }
                ]
            }
        });

        await prisma.like.deleteMany({
            where: {
                post: {
                    authorId: id
                }
            }
        });

        await prisma.follow.deleteMany({
            where: {
                OR: [
                    { followerId: id },
                    { followingId: id }
                ]
            }
        });

        return await prisma.post.delete({
            where: { id },
        });
    }
};

export default new postService();