import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  getVehicleTypes,
  createVehicleType,
  updateVehicleType,
} from "../../controllers/vehicleTypeController.js";
import uploadVehicleTypeImage from "../../middlewares/vehicleTypeUpload.js";
import uploadMiddleware from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/vehicle-types", getVehicleTypes);
router.post(
  "/vehicle-types",
  protect,
  authorizeRoles("admin"),
  uploadMiddleware,
  createVehicleType
);
router.put(
  "/vehicle-types/:id",
  protect,
  authorizeRoles("admin"),
  uploadMiddleware,
  updateVehicleType
);

export default router;
