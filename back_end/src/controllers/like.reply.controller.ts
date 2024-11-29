import { Response } from "express";
import { RequestWithUser } from "../types/post";
import { PrismaClient } from "@prisma/client";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class LikeReplyController {
    async getLikes(req: RequestWithUser, res: Response) {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const reply = await prisma.reply.findUnique({
            where: { id: postId },
            include: {
                post : {
                    select: {
                        like: {
                            where: { userId }
                        }
                    }
                },

            }
        })
        if (!reply) {
            return new CustomError("Post not found", 404);
        }

        const isLiked = reply.post.like && reply.post.like.length > 0;
        const likesCount = reply.post.like ? reply.post.like.length : 0;
        res.json({ isLiked, likesCount });
    }

    async likeReply(req: RequestWithUser, res: Response) {
        const replyId = parseInt(req.params.replyId);
        const userId = req.user.id;
        const checkLike = await prisma.like.findUnique({
            where: { userId_replyId: { replyId, userId } }
        })
        if (checkLike) {
            await prisma.like.delete({
                where: { id: checkLike.id },
            });
            await prisma.reply.update({
                where: { id: replyId },
                data: { likesCount: { decrement: 1 } },
            });
            return res.json({ message: 'Like removed' });
        } else {
            await prisma.like.create({
                data: { replyId, userId },
            });
            await prisma.reply.update({
                where: { id: replyId },
                data: { likesCount: { increment: 1 } },
            });
            return res.json({ message: 'Like added' });
        }
    }
}

export default new LikeReplyController()