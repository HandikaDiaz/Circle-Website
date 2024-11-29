import { Request, Response, NextFunction } from "express"

export const catchAsync = (fn : Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next)
    }
};