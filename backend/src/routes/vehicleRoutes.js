import express from "express";
import protect from "../middlewares/authMiddleware.js";
import uploadVehicleLicense from "../middlewares/vehicleLicenseUpload.js";
import {
  getApprovedVehicles,
  getApprovedVehicleTypes,
  requestVehicleApproval,
} from "../controllers/userVehicleController.js";

const router = express.Router();

router.post(
  "/request-approval",
  protect,
  uploadVehicleLicense,
  requestVehicleApproval
);

router.get("/approved", protect, getApprovedVehicles);
router.get("/approved/types", protect, getApprovedVehicleTypes);

export default router;
