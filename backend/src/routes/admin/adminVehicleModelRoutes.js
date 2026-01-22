import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  getModelsByBrand,
  createVehicleModel,
  updateVehicleModel,
} from "../../controllers/vehicleModelController.js";

const router = express.Router();

router.get("/vehicle-models/:brandId", getModelsByBrand);

router.post(
  "/vehicle-models",
  protect,
  authorizeRoles("admin"),
  createVehicleModel
);

router.put(
  "/vehicle-models/:id",
  protect,
  authorizeRoles("admin"),
  updateVehicleModel
);

export default router;
