import { NextFunction, Request, Response } from "express";
import { CustomError } from "./errorHandler";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        })
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};