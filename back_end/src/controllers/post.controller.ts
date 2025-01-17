import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { CustomError } from "../middlewares/errorHandler";
import { formatTimeAgo } from "../middlewares/timeAgo";
import cloudinaryService from "../services/cloudinary.service";
import postService from "../services/post-service";
import { RequestWithUser } from "../types/post";
import { postSchema } from "../utils/schema/post.schema";
const redis = require('ioredis');

const prisma = new PrismaClient();
const client = new redis()

class postController {
    async getAllPost(req: RequestWithUser, res: Response) {
        const page = isNaN(parseInt(req.query.page || '1')) ? 1 : parseInt(req.query.page || '1');
        const limit = isNaN(parseInt(req.query.limit || '10')) ? 10 : parseInt(req.query.limit || '10');
        const skip = (page - 1) * limit;

        const cacheKey = `posts:page:${page}:limit:${limit}`;
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }
        const posts = await prisma.post.findMany({
            include: {
                like: true,
                author: {
                    select: {
                        fullName: true,
                        userName: true,
                        image: true
                    }
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        })

        const postWithTimeAgo = posts.map((post) => ({
            ...post,
            isLike: post.like.some((like) => like.userId === req.user.id),
            timeAgo: formatTimeAgo(new Date(post.createdAt)),
        }));
        res.json(postWithTimeAgo)
    }

    async getPostByAuthor(req: RequestWithUser, res: Response) {
        const authorId = Number(req.params.authorId)
        const post = await postService.getPostByAuthor(authorId);
        const postWithTimeAgo = post.map((post) => ({
            ...post,
            likesCount: post.likesCount,
            timeAgo: formatTimeAgo(new Date(post.createdAt))
        }))
        res.json(postWithTimeAgo)
    }

    async getPostByUserId(req: RequestWithUser, res: Response) {
        const userId = Number(req.params.userId);
        const post = await postService.getAllPostsByAuthor(userId);
        const postWithTimeAgo = post.map((post) => ({
            ...post,
            timeAgo: formatTimeAgo(new Date(post.createdAt))
        }))
        res.json(postWithTimeAgo)
    }

    async getPostById(req: RequestWithUser, res: Response) {
        const { postId } = req.params;
        const post = await postService.getPostById(parseInt(postId));
        if (!post) {
            return new CustomError("Post not found", 404);
        }
        const postWithTimeAgo = {
            ...post,
            timeAgo: formatTimeAgo(new Date(post.createdAt))
        };
        res.json({ data: postWithTimeAgo })
    }

    async createPost(req: RequestWithUser, res: Response) {
        let imageUrl: string | undefined;
        if (req.file) {
            const image = await cloudinaryService.upload(req.file);
            imageUrl = image.secure_url;
        }
        const body = { ...req.body, ...(imageUrl && { image: imageUrl }) }
        const value = await postSchema.validateAsync(body);
        const createPost = await postService.createPost(value, req.user.id);
        res.json(createPost)
    }

    async updatePost(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        let imageUrl: string | undefined;
        if (req.file) {
            const image = await cloudinaryService.upload(req.file);
            imageUrl = image.secure_url;
        }
        const body = { ...req.body, ...(imageUrl && { image: imageUrl }) }
        const value = await postSchema.validateAsync(body);
        const updatePost = await postService.updatePost({ ...value, id });
        if (!updatePost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(updatePost)
    }

    async deletePost(req: RequestWithUser, res: Response) {
        const id = Number(req.params.id);
        const deletePost = await postService.deletePost(id);
        if (!deletePost) {
            throw new CustomError("Post not found", 404);
        }
        res.json({ post: deletePost });
    }
}

export default new postController()