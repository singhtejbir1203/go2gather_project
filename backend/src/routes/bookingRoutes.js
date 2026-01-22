import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  cancelBooking,
  confirmBooking,
  getBookingDetails,
  getMyBookingsSummary,
  prepareBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/my", protect, getMyBookingsSummary);

router.post("/prepare", protect, prepareBooking);
router.post("/confirm", protect, confirmBooking);

router.post("/:bookingId/cancel", protect, cancelBooking);
router.get("/:bookingId", protect, getBookingDetails);

export default router;
