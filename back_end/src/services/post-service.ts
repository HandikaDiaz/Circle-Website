import { PrismaClient, Post } from "@prisma/client";
import { PostDTO } from "../dto/post.dto";

const prisma = new PrismaClient();
class postService {
    async createPost(data: PostDTO): Promise<Post | null> {
        return await prisma.post.create({
            data,
        });
    }
};

export default new postService();