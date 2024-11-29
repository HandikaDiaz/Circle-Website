import { Response } from "express";
import replyService from "../services/reply-service";
import { RequestWithUser } from "../types/post";
import { replySchema } from "../utils/schema/reply.schema";
import cloudinaryService from "../services/cloudinary.service";
import { formatTimeAgo } from "../middlewares/timeAgo";

class replyController {
    async getReplyByPost(req: RequestWithUser, res: Response) {
        const postId = Number(req.params.postId)
        const reply = await replyService.getReplyByPost(postId);
        const postWithTimeAgo = reply.map((reply) => ({
            ...reply,
            timeAgo: formatTimeAgo(new Date(reply.createdAt))
        }))
        res.json(postWithTimeAgo)
    }

    async createReply(req: RequestWithUser, res: Response) {
        const postId = Number(req.params.postId);
        let imageUrl: string | undefined;
        if (req.file) {
            const image = await cloudinaryService.upload(req.file);
            imageUrl = image.secure_url;
        }
        const body = { ...req.body, ...(imageUrl && { image: imageUrl }) }
        const value = await replySchema.validateAsync(body);
        const createReply = await replyService.createReply(value, req.user.id, postId);
        res.json(createReply)
    }

    async updateReply(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        const value = await replySchema.validateAsync(req.body);
        const updateReply = await replyService.updateReply({ ...value, id });
        res.json(updateReply)
    }

    async deleteReply(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        const deletedReply = await replyService.deleteReply(id);
        res.json(deletedReply)
    }
}

export default new replyController()