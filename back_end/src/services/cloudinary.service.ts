import { v2 as cloudinary } from "cloudinary";

class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async upload(file: Express.Multer.File) {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = "data:" + file.mimetype + ";base64," + b64;
        return await cloudinary.uploader.upload(dataURI, {
            folder: process.env.CLOUDINARY_FOLDER
        });
    }
}

export default new CloudinaryService();