import { Response } from "express";
import { RequestWithUser } from "../types/post";
import { replySchema } from "../utils/schema/reply.schema";
import replyService from "../services/reply-service";


class replyController {
    async replyPost(req: RequestWithUser, res: Response) {
        const value = await replySchema.validateAsync(req.body);
        const user = await replyService.replyPost({ ...value, postId: req.user.id });
        res.json(user);
    }
}

export default new replyController()