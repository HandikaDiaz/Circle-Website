import { Response } from "express";
import replyService from "../services/reply-service";
import { RequestWithUser } from "../types/post";
import { replySchema } from "../utils/schema/reply.schema";

class replyController {
    async getReplyByPost(req: RequestWithUser, res: Response) {
        const postId = Number(req.params.postId)
        const reply = await replyService.getReplyByPost(postId); 
        res.json(reply)
    }

    async createReply(req: RequestWithUser, res: Response) {
        const value = await replySchema.validateAsync(req.body);
        const createReply = await replyService.createReply(value, req.user.id);
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