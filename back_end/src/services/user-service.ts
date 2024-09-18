import { PrismaClient, User } from "@prisma/client";
import { UpdateUserDTO } from "../dto/user.dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class UserService {
    async updateUser(data: UpdateUserDTO
    ): Promise<{ user: Omit<User, "password"> }> {
        const user = await prisma.user.findUnique({
            where: {
                id: 1/*data.id*/
            }
        });

        if (!user) {
            throw new CustomError("User not found", 404);
        };

        if (data.fullName || data.userName || data.bio) {
            user.fullName = data.fullName;
            user.userName = data.userName;
            user.bio = data.bio;
        };

        const { password, ...userToSign } = user;

        return {
            user: userToSign
        };
    }
}

export default new UserService()