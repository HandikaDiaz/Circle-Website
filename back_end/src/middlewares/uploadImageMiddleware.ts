import multer from 'multer'
import path from 'path'

export const fileUploadMiddleware = (fieldName: string, dir: string = 'user_image') => {

    return multer({
        storage: multer.diskStorage({
            destination: 'assets/' + dir,
            filename: (req, file, cb) => {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        }),
        limits: {
            fileSize: 1024 * 1024 * 3
        },
        fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only JPEG and PNG images are allowed.'), false);
            }
        }
    }).single(fieldName);
}