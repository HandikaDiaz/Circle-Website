import { PrismaClient, Reply } from "@prisma/client";
import { ReplyDTO, UpdateReplyDTO } from "../dto/reply.dto";

const prisma = new PrismaClient();
class replyService {
    async getAllReply(): Promise<Reply[]> {
        return await prisma.reply.findMany({
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
                },
                post: {
                    select: {
                        id: true,
                        authorId: true,
                        author: true,
                        content: true,
                        createdAt: true,
                        image: true,
                        likesCount: true,
                        repliesCount: true,
                        reply: true,
                        updatedAt: true
                    }
                }
            }
        });
    };

    async getReplyById(id: number): Promise<Reply | null> {
        return await prisma.reply.findUnique({
            where: {
                id
            },
            include: {
                post: true
            }
        });
    };

    async createReply(data: ReplyDTO): Promise<Reply | null> {
        return await prisma.reply.create({
            data: {
                ...data,
                postId: 1,
                authorId: 1 
            }
        });
    };

    async updateReply(data: UpdateReplyDTO): Promise<Reply | null> {
        const reply = await prisma.reply.findUnique({
            where: {
                id: data.id,
            }
        });

        const update: Partial<Reply> = {};
        if (reply && data.content) {
            reply.content = data.content;
        }

        if (reply && data.image) {
            reply.image = data.image;
        }

        return await prisma.reply.update({
            data: update,
            where: { id: 2 },
        });
    }

    async deleteReply(id: number): Promise<Reply | null> {
        const post = await prisma.reply.findUnique({
            where: { id },
        });

        return await prisma.reply.delete({
            where: { id }
        });
    }
};

export default new replyService();