import express from "express";
import {
  getAllRidesAdmin,
  getRideDetailsAdmin,
  adminCancelBooking,
  adminCancelRide,
} from "../../controllers/adminRideController.js";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/rides", protect, authorizeRoles("admin"), getAllRidesAdmin);
router.get(
  "/rides/:rideId",
  protect,
  authorizeRoles("admin"),
  getRideDetailsAdmin,
);
router.post(
  "/rides/:rideId/cancel",
  protect,
  authorizeRoles("admin"),
  adminCancelRide,
);
router.post(
  "/bookings/:bookingId/cancel",
  protect,
  authorizeRoles("admin"),
  adminCancelBooking,
);

export default router;
