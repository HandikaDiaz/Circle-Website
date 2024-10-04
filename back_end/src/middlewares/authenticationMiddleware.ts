import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler";
import { RequestWithUser } from "../types/post";

export function authentication(req: RequestWithUser, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return new CustomError("Authentication failed", 401);
    }
    
    const token = authorizationHeader.replace("Bearer ", "");
    if(!token) {
        return new CustomError("Authentication failed", 401);
    }

    const secretKey = process.env.JWT_SECRET as string;
    const decode = jwt.verify(token, secretKey);
    req.user = decode as any;
    next();
}