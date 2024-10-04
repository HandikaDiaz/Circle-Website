import { Response } from "express";
import { RequestWithUser } from "../types/post";
import { PrismaClient } from "@prisma/client";
import followService from "../services/follow-service";

const prisma = new PrismaClient();

class FollowController {
    async toggleFollow(req: RequestWithUser, res: Response) {
        const currentUserId = req.user.id;
        const targetUserId = parseInt(req.params.userId);
        const followStatus = await followService.updateFollow(currentUserId, targetUserId);
        return res.json(followStatus);
    }

    async checkFollowStatus(req: RequestWithUser, res: Response) {
        const currentUserId = req.user.id;
        const targetUserId = parseInt(req.params.userId);
        const followStatus = await followService.getFollowStatus(currentUserId, targetUserId);
        return res.json(followStatus);
    }
}

export default new FollowController()