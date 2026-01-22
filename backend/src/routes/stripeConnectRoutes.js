import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createStripeAccount,
  createStripeOnboardingLink,
  syncStripeAccountStatus,
} from "../controllers/stripeConnectController.js";

const router = express.Router();

router.post("/connect/create", protect, createStripeAccount);
router.post("/connect/onboarding", protect, createStripeOnboardingLink);
router.get("/connect/status", protect, syncStripeAccountStatus);

export default router;
