import { Request, Response } from "express";
import { postSchema } from "../utils/schema/post.schema";
import postService from "../services/post-service";
import { RequestWithUser } from "../types/post";

class postController {
    async createPost(req: RequestWithUser, res: Response) {
        const value = await postSchema.validateAsync(req.body);
        const post = await postService.createPost({ ...value, authorId: req.user.id })
        res.json(post)
    }
}

export default new postController()