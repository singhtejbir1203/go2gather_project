import express from "express";
import protect from "../middlewares/authMiddleware.js";
import uploadVehicleLicense from "../middlewares/vehicleLicenseUpload.js";
import {
  getApprovedVehicles,
  getApprovedVehicleTypes,
  requestVehicleApproval,
} from "../controllers/userVehicleController.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/request-approval",
  protect,
  uploadMiddleware,
  requestVehicleApproval
);

router.get("/approved", protect, getApprovedVehicles);
router.get("/approved/types", protect, getApprovedVehicleTypes);

export default router;
