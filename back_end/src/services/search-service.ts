import { PrismaClient } from '@prisma/client';
import { CustomError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const searchService = async (query: string, userId: number) => {
    if (!query) {
        throw new CustomError("Query is required", 400);
    }
    return await prisma.user.findMany({
        where: {
            AND: [
                { id: { not: userId } },
                {
                    OR: [
                        { fullName: { contains: query, mode: 'insensitive' } },
                        { userName: { contains: query, mode: 'insensitive' } },
                    ]
                }
            ]
        }, select: {
            id: true,
            email: true,
            fullName: true,
            userName: true,
            image: true
        }
    })
}