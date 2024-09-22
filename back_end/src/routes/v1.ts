import express from "express";
import { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import { catchAsync } from "../utils/catch.async";
import userService from "../services/user-service";
import userController from "../controllers/user.controller";
import postController from "../controllers/post.controller";
import { authentication } from "../middlewares/authenticationMiddleware";
import replyController from "../controllers/reply.controller";
import { fileUploadMiddleware } from "../middlewares/uploadImageMiddleware";
import { searchController } from "../controllers/search.controller";

export const routerV1 = express.Router();
routerV1.get("/", (req: Request, res: Response) => {
    res.send("Nice Try");
});

routerV1.put("/user", catchAsync(userController.update));

routerV1.post("/logout", (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Logout successful" });
});
routerV1.post("/auth/register", catchAsync(authController.register));
routerV1.post("/auth/login", catchAsync(authController.login));
routerV1.get("/auth/check", authentication, authController.check);

// routerV1.get('/search', catchAsync(searchController));

routerV1.get("/post", catchAsync(postController.getPost));
routerV1.get("/post/:id", catchAsync(postController.getPostById));
routerV1.post("/post", catchAsync(postController.createPost));
routerV1.put("/update-post/:id", catchAsync(postController.updatePost));
routerV1.delete("/delete-post/:id", catchAsync(postController.deletePost));

routerV1.get("/reply-post", catchAsync(replyController.getReply));
routerV1.get("/reply-post/:id", catchAsync(replyController.getReplyById));
routerV1.post("/reply-post", catchAsync(replyController.createReply));
routerV1.put("/reply-post/:id", catchAsync(replyController.updateReply));
routerV1.delete("/reply-post/:id", catchAsync(replyController.deleteReply));