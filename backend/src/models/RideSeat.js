import mongoose from "mongoose";

const rideSeatSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    seatTemplateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SeatTemplate",
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookedAt: Date,
  },
  { timestamps: true }
);

// Prevent duplicate seats per ride
rideSeatSchema.index({ rideId: 1, seatTemplateId: 1 }, { unique: true });

export default mongoose.model("RideSeat", rideSeatSchema);
