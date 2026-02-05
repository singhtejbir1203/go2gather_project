import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { resolveQr } from "../controllers/qrController.js";

const router = express.Router();

router.get("/:token", protect, resolveQr);

export default router;
