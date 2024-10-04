import multer from 'multer';
import { CustomError } from './errorHandler';

const storage = multer.memoryStorage();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Batasi ukuran file 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true); // Hanya izinkan file gambar
        } else {
            cb(new CustomError("File harus berupa gambar", 400));
        }
    }
});

export default upload;