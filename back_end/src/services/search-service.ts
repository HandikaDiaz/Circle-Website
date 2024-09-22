import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const searchService = async (query: string) => {
    return await prisma.post.findMany({
        where: {
            OR: [
                {author: {fullName: {contains: query, mode: 'insensitive'}}},
                {content: {contains: query, mode: 'insensitive'}},
            ]
        },
        include: {
            author: {
                select: {
                    fullName: true,
                    userName: true,
                }
            },
            reply: true
        }
    })
}