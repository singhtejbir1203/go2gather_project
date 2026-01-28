import multer from "multer";

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
}).single("image");

export default uploadMiddleware;

