import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";
import postController from "../controllers/post.controller";
import replyController from "../controllers/reply.controller";
import userController from "../controllers/user.controller";
import { authentication } from "../middlewares/authenticationMiddleware";
import { catchAsync } from "../utils/catch.async";
import upload from "../middlewares/uploadImage";
import LikeController from "../controllers/like.controller";
import FollowController from "../controllers/follow.controller";
import { searchController } from "../controllers/search.controller";
import { authorize } from "../middlewares/authorization";

// Inisialisasi router versi 1
export const routerV1 = express.Router();

// Route default untuk root
routerV1.get("/", (req: Request, res: Response) => {
    res.send("Nice Try");
});

// Route untuk logout, menghapus cookie token dan mengembalikan respons sukses
routerV1.post("/logout", (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).json({ message: "Logout successful" });
});

/** Authentication Routes **/
// Registrasi pengguna baru
routerV1.post("/auth/register", catchAsync(authController.register));
// Login pengguna
routerV1.post("/auth/login", catchAsync(authController.login));
// Mengecek status autentikasi pengguna
routerV1.get("/auth/check", catchAsync(authentication), catchAsync(authController.check));

/** User Routes **/
// Mengupdate data pengguna yang telah diautentikasi
routerV1.put("/user", catchAsync(authentication), upload.fields([{ name: 'image', maxCount: 1 }, { name: 'background', maxCount: 1 }]), catchAsync(userController.update));
// Mendapatkan data pengguna berdasarkan autentikasi
routerV1.get("/getUser", catchAsync(authentication), catchAsync(userController.getUser));
// Mendapatkan data pengguna berdasarkan ID
routerV1.get("/getUserById/:userId", catchAsync(userController.getUserById.bind(userController)));
// Mendapatkan semua data pengguna (hanya pengguna yang terautentikasi)
routerV1.get("/getAllUser", catchAsync(authentication), catchAsync(userController.getAllUser));

/** Post Routes **/
// Mendapatkan semua postingan
routerV1.get("/getAllPost", catchAsync(authentication), catchAsync(postController.getAllPost));
// Membuat postingan baru dengan gambar (opsional) dan autentikasi
routerV1.post("/post", catchAsync(authentication), upload.single('image'), catchAsync(postController.createPost));
// Membuat balasan (reply) baru untuk postingan dengan gambar (opsional) dan autentikasi
routerV1.post("/post/:postId/reply", catchAsync(authentication), upload.single('image'), catchAsync(replyController.createReply));
// Mendapatkan postingan berdasarkan ID
routerV1.get("/post/status/:postId", catchAsync(postController.getPostById.bind(postController)));
// Mendapatkan balasan dari sebuah postingan
routerV1.get("/post/:postId/reply", catchAsync(authentication), catchAsync(replyController.getReplyByPost));
// Mendapatkan semua postingan dari seorang author berdasarkan ID
routerV1.get("/post/:authorId", catchAsync(postController.getPostByAuthor));
// Mendapatkan semua postingan pengguna berdasarkan ID pengguna
routerV1.get("/profile/post/:userId", catchAsync(postController.getPostByUserId));

/** Like Routes **/
// Menyukai postingan berdasarkan ID
routerV1.post("/post/:postId/like", catchAsync(authentication), catchAsync(LikeController.likePost));
// Mendapatkan semua like dari sebuah postingan
routerV1.get("/post/:postId/like", catchAsync(authentication), catchAsync(LikeController.getLikes));

/** Follow Routes **/
// Mengecek status follow seorang pengguna
routerV1.get("/follow/:userId", catchAsync(authentication), catchAsync(FollowController.checkFollowStatus));
// Mengikuti atau berhenti mengikuti seorang pengguna
routerV1.patch('/follow/:userId', catchAsync(authentication), catchAsync(FollowController.toggleFollow));

/** Search Routes **/
// Mencari postingan berdasarkan kata kunci
routerV1.get('/search', catchAsync(authentication), catchAsync(searchController));

routerV1.get("/dashboard", catchAsync(authentication), catchAsync(authorize("ADMIN")), (req, res) => {
    res.json({ message: "Hello from dashboard!" });
});
routerV1.delete("/post/:id", catchAsync(authentication), catchAsync(authorize("ADMIN")), catchAsync(postController.deletePost));
routerV1.delete("/userDelete/:id", catchAsync(authentication), catchAsync(authorize("ADMIN")), catchAsync(userController.deleteUser));

/** Future Routes (Komentar)**/
// Update postingan berdasarkan ID (belum diaktifkan)
// routerV1.put("/post/:id", catchAsync(postController.updatePost));

// Menghapus postingan berdasarkan ID (belum diaktifkan)

// Mengupdate balasan berdasarkan ID (belum diaktifkan)
// routerV1.put("/reply/:id", catchAsync(replyController.updateReply));

// Menghapus balasan berdasarkan ID (belum diaktifkan)
// routerV1.delete("/reply/:id", catchAsync(replyController.deleteReply));
