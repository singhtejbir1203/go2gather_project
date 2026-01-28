import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import stripeConnectRoutes from "./routes/stripeConnectRoutes.js";
import adminIndexRoutes from "./routes/admin/index.js";
import { stripeWebhook } from "./controllers/stripeWebhookController.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRoutes);

app.use("/api/vehicles", vehicleRoutes);

app.use("/api/rides", rideRoutes);

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);

app.use("/api/routes", routeRoutes);

app.use("/api/time", timeRoutes);

app.use("/api/admin", adminIndexRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/stripe", stripeConnectRoutes);

app.use("/api/chat", chatRoutes);

app.use(errorHandler);

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
