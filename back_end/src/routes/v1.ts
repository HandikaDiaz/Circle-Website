const express = require('express');
import { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import FollowController from "../controllers/follow.controller";
import likePostController from "../controllers/like.post.controller";
import likeReplyController from "../controllers/like.reply.controller";
import postController from "../controllers/post.controller";
import replyController from "../controllers/reply.controller";
import { searchController } from "../controllers/search.controller";
import userController from "../controllers/user.controller";
import { authentication } from "../middlewares/authenticationMiddleware";
import { authorize } from "../middlewares/authorization";
import upload from "../middlewares/uploadImage";
import { catchAsync } from "../utils/catch.async";

export const routerV1 = express.Router();

routerV1.get("/", (req: Request, res: Response) => {
    res.send("Hello from backend");
});

routerV1.post("/logout", (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
});

routerV1.post("/auth/register", catchAsync(authController.register));
routerV1.post("/auth/login", catchAsync(authController.login));
routerV1.get("/auth/check", catchAsync(authentication), catchAsync(authController.check));
routerV1.post('/auth/forgot-password', catchAsync(authController.forgot));
routerV1.get('/auth/reset-password/:token', catchAsync(authController.reset));
routerV1.post('/auth/reset-password/:token', catchAsync(authController.reset));

routerV1.put("/user", catchAsync(authentication), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'background', maxCount: 1 }]), catchAsync(userController.update));
routerV1.get("/getUser", catchAsync(authentication), catchAsync(userController.getUser));
routerV1.get("/getUserById/:userId", catchAsync(userController.getUserById.bind(userController)));
routerV1.get("/getAllUser", catchAsync(authentication), catchAsync(userController.getAllUser));

routerV1.get("/getAllPost", catchAsync(authentication), catchAsync(postController.getAllPost));
routerV1.post("/post", catchAsync(authentication), upload.single('image'), catchAsync(postController.createPost));
routerV1.post("/post/:postId/reply", catchAsync(authentication), upload.single('image'), catchAsync(replyController.createReply));
routerV1.get("/post/status/:postId", catchAsync(postController.getPostById));
routerV1.get("/post/:postId/reply", catchAsync(authentication), catchAsync(replyController.getReplyByPost));
routerV1.get("/post/:authorId", catchAsync(postController.getPostByAuthor));
routerV1.get("/profile/post/:userId", catchAsync(postController.getPostByUserId));

routerV1.post("/post/:postId/like", catchAsync(authentication), catchAsync(likePostController.likePost));
routerV1.post("/reply/:replyId/like", catchAsync(authentication), catchAsync(likeReplyController.likeReply));
routerV1.get("/post/:postId/like", catchAsync(authentication), catchAsync(likePostController.getLikes));
routerV1.get("/reply/:replyId/like", catchAsync(authentication), catchAsync(likeReplyController.getLikes));

routerV1.get("/follow/:userId", catchAsync(authentication), catchAsync(FollowController.checkFollowStatus));
routerV1.patch('/follow/:userId', catchAsync(authentication), catchAsync(FollowController.toggleFollow));
routerV1.get('/followers', catchAsync(authentication), catchAsync(FollowController.getFollowers));

routerV1.get('/search', catchAsync(authentication), catchAsync(searchController));

routerV1.get("/dashboard", catchAsync(authentication), catchAsync(authorize("ADMIN")), (req: Request, res: Response) => {
    res.json({ message: "Hello from dashboard!" });
});
routerV1.delete("/post/:id", catchAsync(authentication), catchAsync(postController.deletePost));
routerV1.delete("/userDelete/:id", catchAsync(authentication), catchAsync(authorize("ADMIN")), catchAsync(userController.deleteUser));

routerV1.put("/post/:id", catchAsync(authentication), upload.single('image'), catchAsync(postController.updatePost));
routerV1.put("/reply/:id", catchAsync(authentication), catchAsync(replyController.updateReply));
routerV1.delete("/reply/:id", catchAsync(authentication), catchAsync(replyController.deleteReply));
