import { Post, PrismaClient, Reply   } from "@prisma/client";
import { CreatePostDTO, UpdatePostDTO } from "../dto/post.dto";

const prisma = new PrismaClient();

class postService {
    async getAllPosts(authorId: number): Promise<Post[]> {
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
                        updatedAt: true
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
                        userName: true
                    }
                }
            }
        });
    };

    async createPost(data: CreatePostDTO, authorId: number, image: string): Promise<Post | null> {
        return await prisma.post.create({
            data: {
                ...data,
                image,
                authorId
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
            where: { id: data.id },
        });
    }

    async deletePost(id: number): Promise<Post | null> {
        return await prisma.post.delete({
            where: { id }
        });
    }
};

export default new postService();