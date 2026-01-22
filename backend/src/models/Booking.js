import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "refunded"],
      default: "completed",
    },

    cancelledAt: {
      type: Date,
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },

    chargeId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
