import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/govt-ids");
  },
  filename(req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const uploadGovtId = multer({
  storage,
  fileFilter,
}).single("govtId");

export default uploadGovtId;
