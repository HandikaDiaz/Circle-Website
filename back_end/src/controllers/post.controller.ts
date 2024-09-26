import { Request, Response } from "express";
import { postSchema } from "../utils/schema/post.schema";
import postService from "../services/post-service";
import { RequestWithUser } from "../types/post";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class postController {
    async getAllPost(req: Request, res: Response) {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        fullName: true,
                        userName: true
                    }
                },
            },
            orderBy: { createdAt: 'desc' }
        })
        res.json(posts)
    }

    async getPostByAuthor(req: RequestWithUser, res: Response) {
        const authorId = Number(req.params.authorId)
        const post = await postService.getAllPosts(authorId); 
        res.json(post)
    }

    async getPostById(req: RequestWithUser, res: Response) {
        const { postId } = req.params;
        const post = await postService.getPostById(parseInt(postId));
        res.json({data: post})
    }

    async createPost(req: RequestWithUser, res: Response) {
        const file = req.file?.filename as string;
        const value = await postSchema.validateAsync(req.body);
        const createPost = await postService.createPost(value, req.user.id, file);
        res.json(createPost)
    }

    async updatePost(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        const value = await postSchema.validateAsync(req.body);
        const updatePost = await postService.updatePost({ ...value, id });
        res.json(updatePost)
    }

    async deletePost(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        const deletePost = await postService.deletePost(id);
        res.json(deletePost);
    }
}

export default new postController()