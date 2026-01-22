import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  cancelPublishedRide,
  getMyPublishedRideDetails,
  getMyPublishedRides,
  getRideDetails,
  publishRide,
  searchRides,
} from "../controllers/rideController.js";

const router = express.Router();

router.post("/", protect, publishRide);
router.get("/search", searchRides);
router.get("/:id/details", getRideDetails);

router.get("/my-publications", protect, getMyPublishedRides);
router.get("/my-publication/:rideId", protect, getMyPublishedRideDetails);
router.post("/my-publication/:rideId/cancel", protect, cancelPublishedRide);

export default router;
