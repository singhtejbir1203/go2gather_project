import express from "express";
import { getTimeSlots } from "../controllers/timeController.js";

const router = express.Router();

router.get("/slots", getTimeSlots);

export default router;
