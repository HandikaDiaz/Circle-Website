import { Request } from "express";

export interface RequestWithUser extends Request {
    user?: any;
    file: Express.Multer.File
}