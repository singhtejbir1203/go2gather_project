import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/vehicle-types");
  },
  filename(req, file, cb) {
    cb(null, `vehicle-type-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadVehicleTypeImage = multer({
  storage,
}).single("image");

export default uploadVehicleTypeImage;
