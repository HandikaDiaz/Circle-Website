import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class followService {
    async updateFollow(currentUserId: number, targetUserId: number) {
        const follow = await prisma.follow.findFirst({
            where: {
                followerId: currentUserId,
                followingId: targetUserId
            }
        });

        if (follow) {
            await prisma.follow.delete({
                where: { id: follow.id }
            })
            return { isFollowing: false };
        } else {
            await prisma.follow.create({
                data: {
                    followerId: currentUserId,
                    followingId: targetUserId,
                    isFollowing: true,
                }
            })
            return { isFollowing: true };
        }
    }

    async getFollowStatus(currentUserId: number, targetUserId: number) {
        const follow = await prisma.follow.findFirst({
            where: {
                followerId: currentUserId,
                followingId: targetUserId,
            }
        });
        return { isFollowing: follow ? true : false };
    }

    async getFollowersByCurrentUserId(currentUserId: number) {
        return await prisma.follow.findMany({
            where: { followerId: currentUserId },
            select: {
                following: {
                    select: {
                        fullName: true,
                        userName:true,
                        image: true,
                    }
                },
                isFollowing: true,
                followerId: true,
                followingId:true,
                id: true
            }
        })
    }
}

export default new followService()