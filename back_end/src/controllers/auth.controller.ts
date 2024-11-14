import { Request, Response } from "express";
import authService from "../services/auth-service";
import { loginSchema, registerSchema } from "../utils/schema/auth.schema";
import { RequestWithUser } from "../types/post";

class AuthController {
    async register(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/RegisterDTO"
                    }  
                }
            }
        } 
    */
        const value = await registerSchema.validateAsync(req.body);
        const user = await authService.register(value);
        res.json(user);
    }
    async login(req: Request, res: Response) {
        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/LoginDTO"
                    }  
                }
            }
        } 
    */
        const value = await loginSchema.validateAsync(req.body);
        const user = await authService.login(value);
        res.json(user);
    }
    async check(req: Request, res: Response) {
        const user = (req as any).user;
        res.json(user);
    }

    async forgot(req: RequestWithUser, res: Response) {
        const userName = req.body.userName;
        await authService.forgot(userName);
        res.json({ message: 'Reset password link has been sent to your email' })
    }

    async reset(req: RequestWithUser, res: Response) {
        const token = req.params.token;
        const password = req.body.password;
        await authService.reset(token, password);
        res.json({ message: 'Password reset successfully' })
    }
}

export default new AuthController();