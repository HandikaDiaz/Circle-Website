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

        if(follow) {
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
}

export default new followService()