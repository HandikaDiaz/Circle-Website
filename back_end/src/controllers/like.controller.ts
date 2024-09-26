import { Response } from "express";
import { RequestWithUser } from "../types/post";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class LikeController {
    async getLikes(req: RequestWithUser, res: Response) {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                like: {
                    where: { userId },
                }
            }
        })
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.like && post.like.length > 0;
        const likesCount = post.like ? post.like.length : 0;
        res.json({ isLiked, likesCount });
    }

    async likePost(req: RequestWithUser, res: Response) {
        const postId = parseInt(req.params.postId);
        const userId = req.user.id;
        const checkLike = await prisma.like.findUnique({
            where: { userId_postId: { postId, userId } }
        })
        if (checkLike) {
            await prisma.like.delete({
                where: { id: checkLike.id },
            });
            await prisma.post.update({
                where: { id: postId },
                data: { likesCount: { decrement: 1 } },
            });
            return res.json({ message: 'Like removed' });
        } else {
            await prisma.like.create({
                data: { postId, userId },
            });
            await prisma.post.update({
                where: { id: postId },
                data: { likesCount: { increment: 1 } },
            });
            return res.json({ message: 'Like added' });
        }
    }
}

export default new LikeController()