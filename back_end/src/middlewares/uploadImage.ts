const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;