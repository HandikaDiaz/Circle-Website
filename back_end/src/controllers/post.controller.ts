import { Request, Response } from "express";
import { postSchema } from "../utils/schema/post.schema";
import postService from "../services/post-service";
import { RequestWithUser } from "../types/post";

class postController {
    async getPost(req: RequestWithUser, res: Response) {
        const post = await postService.getAllPosts(); 
        res.json(post)
    }

    async getPostById(req: RequestWithUser, res: Response) {
        const id = req.params.id;
        const post = await postService.getPostById(Number(id));
        res.json(post)
    }

    async createPost(req: RequestWithUser, res: Response) {
        const value = await postSchema.validateAsync(req.body);
        const post = await postService.createPost(value);
        res.json(post)
    }

    async updatePost(req: RequestWithUser, res: Response) {
        const post = await postService.updatePost(req.body)
        res.json(post)
    }

    async deletePost(req: RequestWithUser, res: Response) {
        const post = await postService.deletePost(req.body)
        res.json(post)
    }
}

export default new postController()