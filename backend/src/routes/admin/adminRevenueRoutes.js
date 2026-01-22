import express from "express";
import protect from "../../middlewares/authMiddleware.js";
import authorizeRoles from "../../middlewares/roleMiddleware.js";
import {
  getDriverRevenue,
  getRevenueSummary,
  getRevenueTimeline,
  getRevenueTransactions,
} from "../../controllers/adminRevenueController.js";

const router = express.Router();

router.get(
  "/revenue/summary",
  protect,
  authorizeRoles("admin"),
  getRevenueSummary
);
router.get(
  "/revenue/timeline",
  protect,
  authorizeRoles("admin"),
  getRevenueTimeline
);
router.get(
  "/revenue/transactions",
  protect,
  authorizeRoles("admin"),
  getRevenueTransactions
);
router.get(
  "/revenue/driver/:driverId",
  protect,
  authorizeRoles("admin"),
  getDriverRevenue
);

export default router;
