import mongoose from "mongoose";

const revenueTransactionSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
      index: true,
    },

    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
      index: true,
    },

    passengerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    stripeChargeId: {
      type: String,
    },

    refundId: {
      type: String,
    },

    refundedAt: {
      type: Date,
    },

    grossAmount: {
      type: Number,
      required: true,
    },

    platformFee: {
      type: Number,
      required: true,
    },

    driverPayout: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["completed", "refunded"],
      default: "completed",
    },

    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("RevenueTransaction", revenueTransactionSchema);
