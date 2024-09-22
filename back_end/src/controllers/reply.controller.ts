import { Response } from "express";
import replyService from "../services/reply-service";
import { RequestWithUser } from "../types/post";
import { replySchema } from "../utils/schema/reply.schema";

class replyController {
    async getReply(req: RequestWithUser, res: Response) {
        const post = await replyService.getAllReply(); 
        res.json(post)
    }

    async getReplyById(req: RequestWithUser, res: Response) {
        const id = req.params.id;
        const post = await replyService.getReplyById(Number(id));
        res.json(post)
    }

    async createReply(req: RequestWithUser, res: Response) {
        const value = await replySchema.validateAsync(req.body);
        const post = await replyService.createReply(value);
        res.json(post)
    }

    async updateReply(req: RequestWithUser, res: Response) {
        const post = await replyService.updateReply(req.body)
        res.json(post)
    }

    async deleteReply(req: RequestWithUser, res: Response) {
        const post = await replyService.deleteReply(req.body)
        res.json(post)
    }
}

export default new replyController()