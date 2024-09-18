import express from "express";
import { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import { catchAsync } from "../utils/catch.async";
import userService from "../services/user-service";
import userController from "../controllers/user.controller";
import postController from "../controllers/post.controller";
import { authentication } from "../middlewares/authenticationMiddleware";
import replyController from "../controllers/reply.controller";

export const routerV1 = express.Router();

routerV1.get("/", (req: Request, res: Response) => {
    res.send("Nice Try");
});

routerV1.patch("/user/:id", catchAsync(userController.update));

routerV1.post("/auth/register", catchAsync(authController.register));
routerV1.post("/auth/login", catchAsync(authController.login));

routerV1.post("/create-post", catchAsync(authentication), catchAsync(postController.createPost));
routerV1.post("/reply-post", catchAsync(authentication), catchAsync(replyController.replyPost));