import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  approveUserVehicle,
  getPendingVehicles,
  rejectUserVehicle,
} from "../../controllers/userVehicleController.js";

const router = express.Router();

router.get(
  "/vehicles/pending",
  protect,
  authorizeRoles("admin"),
  getPendingVehicles
);

router.put(
  "/vehicles/:id/approve",
  protect,
  authorizeRoles("admin"),
  approveUserVehicle
);

router.put(
  "/vehicles/:id/reject",
  protect,
  authorizeRoles("admin"),
  rejectUserVehicle
);

export default router;
