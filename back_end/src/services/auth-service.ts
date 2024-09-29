import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { CustomError } from "../middlewares/errorHandler";

const prisma = new PrismaClient();

class AuthService {
    async register(
        data: RegisterDTO
    ): Promise<{ user: Omit<User, "password">, token: string }> {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const userName = data.email.split('@')[0];
        
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                userName
            }
        });

        const { password, ...userToSign } = user;
        const token = jwt.sign(
            {id : user.id, email: user.email},
            process.env.JWT_SECRET as string,
            {expiresIn: '1d'}
        )
        return { 
            user: userToSign,
            token
        };
    }

    async login(
        data: LoginDTO
    ): Promise<{ user: Omit<User, "password">; token: string }> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new CustomError("Email not found", 404);
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new CustomError("Password is wrong", 401);
        }
        const { password, ...userToSign } = user;
        const secretKey = process.env.JWT_SECRET as string;
        const token = jwt.sign(userToSign, secretKey);

        return {
            user: userToSign,
            token: token
        }
    }
};

export default new AuthService();