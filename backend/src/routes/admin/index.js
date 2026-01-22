import express from "express";
import adminRoutes from "./adminRoutes.js";
import adminVehicleTypeRoutes from "./adminVehicleTypeRoutes.js";
import adminSeatTemplateRoutes from "./adminSeatTemplateRoutes.js";
import adminVehicleBrandRoutes from "./adminVehicleBrandRoutes.js";
import adminVehicleModelRoutes from "./adminVehicleModelRoutes.js";
import adminRevenueRoutes from "./adminRevenueRoutes.js";
import adminRideRoutes from "./adminRideRoutes.js";

const router = express.Router();

router.use(adminRoutes);
router.use(adminVehicleTypeRoutes);
router.use(adminSeatTemplateRoutes);
router.use(adminVehicleBrandRoutes);
router.use(adminVehicleModelRoutes);
router.use(adminRevenueRoutes);
router.use(adminRideRoutes);

export default router;
