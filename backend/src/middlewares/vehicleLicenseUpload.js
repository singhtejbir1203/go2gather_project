import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/vehicle-licenses");
  },
  filename(req, file, cb) {
    cb(
      null,
      `vehicle-${req.user._id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadVehicleLicense = multer({
  storage,
}).single("license");

export default uploadVehicleLicense;
