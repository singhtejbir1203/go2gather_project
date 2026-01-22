import express from "express";
import protect from "../middlewares/authMiddleware.js";
import uploadGovtId from "../middlewares/uploadMiddleware.js";
import { uploadGovtId as uploadGovtIdController } from "../controllers/userController.js";

const router = express.Router();

router.post("/upload-govt-id", protect, uploadGovtId, uploadGovtIdController);

export default router;
