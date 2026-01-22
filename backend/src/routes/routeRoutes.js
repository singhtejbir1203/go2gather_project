import express from "express";
import { previewRoute } from "../controllers/routeController.js";

const router = express.Router();

router.post("/preview", previewRoute);

export default router;
