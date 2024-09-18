import { PrismaClient, Reply } from "@prisma/client";
import { ReplyDTO } from "../dto/reply.dto";

const prisma = new PrismaClient();
class replyService {
    async replyPost(data: ReplyDTO): Promise<Reply | null> {
        return await prisma.reply.create({
            data,
        });
    }
};

export default new replyService();