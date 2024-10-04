import { PrismaClient, Reply } from "@prisma/client";
import { ReplyDTO, UpdateReplyDTO } from "../dto/reply.dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();
class replyService {
    async getReplyByPost(postId: number): Promise<Reply[]> {
        return await prisma.reply.findMany({
            where: { postId },
            include: {
                author: {
                    select: {
                        fullName: true,
                        userName: true,
                        image: true
                    }
                }
            },orderBy: {
                createdAt: 'desc'
            }
        });
    };

    async createReply(data: ReplyDTO, authorId: number, postId: number): Promise<Reply | null> {
        const newReply = await prisma.reply.create({
            data: {
                content: data.content,
                image: data.image || null,
                postId,
                authorId
            }
        });
        const replyCount = await prisma.reply.count({
            where: { postId }
        });
        await prisma.post.update({
            where: { id: postId },
            data: { repliesCount: replyCount }
        });
        return newReply;
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
            where: { id: data.id },
        });
    }

    async deleteReply(id: number): Promise<Reply | null> {
        const reply = await prisma.reply.findUnique({
            where: { id },
        });

        if (!reply) {
            throw new CustomError("Reply not found", 404);
        }

        await prisma.reply.delete({
            where: { id }
        });

        const replyCount = await prisma.reply.count({
            where: { postId: reply.postId }
        });

        await prisma.post.update({
            where: { id: reply.postId },
            data: { repliesCount: replyCount }
        });

        return reply
    }
};

export default new replyService();