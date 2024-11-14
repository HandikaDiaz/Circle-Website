import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { CustomError } from "../middlewares/errorHandler";
import { sendEmail } from "./mail-service";

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
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        )
        return {
            user: userToSign,
            token
        };
    }

    async login(
        data: LoginDTO
    ): Promise<{ user: Omit<User, "password">; token: string }> {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.userName },
                    { userName: data.userName }
                ],
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

    async forgot(usernameOrEmail : string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: usernameOrEmail},
                    {userName: usernameOrEmail}
                ]
            }
        });
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    
        await sendEmail(usernameOrEmail, token);
        return 'Success'
    };

    async reset(token: string, password: string) {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decode) {
            throw new CustomError('Invalid token', 401);
        }

        const user = await prisma.user.findFirst({
            where: {
                email: (decode as any).email
            }
        });
        if (!user) {
            throw new CustomError("User not found", 404);
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        await prisma.user.update({
            where: { email: user.email },
            data: {
                password: hashedPassword
            } 
        })
        return 'Success'
    }
};

export default new AuthService();