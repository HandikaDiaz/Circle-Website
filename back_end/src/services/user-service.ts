import { PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../dto/user.dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class UserService {
    async updateUser(id: number, data: UpdateUserDTO
    ): Promise<{ user: Pick<User, "fullName" | "userName" | "bio" | "id"> }> {
        const user = await prisma.user.findUnique({
            where: {
                id: 1
            }
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        };

        const updateUser = await prisma.user.update ({
            where: { id: 1 },
            data: {
                fullName: data.fullName || user.fullName,
                userName: data.userName || user.userName,
                bio: data.bio || user.bio
            },
            select: {
                id: true,
                fullName: true,
                userName: true,
                bio: true,
            }
        })

        return {
            user: updateUser
        };
    }
}

export default new UserService()