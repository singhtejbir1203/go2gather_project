import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  getSeatTemplatesByVehicleType,
  createSeatTemplate,
  updateSeatTemplate,
  deleteSeatTemplate,
} from "../../controllers/seatTemplateController.js";

const router = express.Router();

router.get("/seat-templates/:vehicleTypeId", getSeatTemplatesByVehicleType);

router.post(
  "/seat-templates",
  protect,
  authorizeRoles("admin"),
  createSeatTemplate
);

router.put(
  "/seat-templates/:id",
  protect,
  authorizeRoles("admin"),
  updateSeatTemplate
);

router.delete(
  "/seat-templates/:id",
  protect,
  authorizeRoles("admin"),
  deleteSeatTemplate
);

export default router;
