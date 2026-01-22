import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  getBrandsByVehicleType,
  createVehicleBrand,
  updateVehicleBrand,
} from "../../controllers/vehicleBrandController.js";

const router = express.Router();

router.get("/vehicle-brands/:vehicleTypeId", getBrandsByVehicleType);

router.post(
  "/vehicle-brands",
  protect,
  authorizeRoles("admin"),
  createVehicleBrand
);

router.put(
  "/vehicle-brands/:id",
  protect,
  authorizeRoles("admin"),
  updateVehicleBrand
);

export default router;
