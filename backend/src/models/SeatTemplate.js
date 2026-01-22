import mongoose from "mongoose";

const seatTemplateSchema = new mongoose.Schema(
  {
    vehicleTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleType",
      required: true,
    },

    seatCode: {
      type: String,
      required: true,
      // e.g. FL, BR, S12, P1
    },

    label: {
      type: String,
      required: true,
      // e.g. Front Left, Seat 12, Pillion
    },

    isDriverSeat: {
      type: Boolean,
      default: false,
    },

    position: {
      row: Number,
      column: Number,
      x: Number,
      y: Number,
      // optional — used later for visual layout
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate seat codes per vehicle type
seatTemplateSchema.index({ vehicleTypeId: 1, seatCode: 1 }, { unique: true });

export default mongoose.model("SeatTemplate", seatTemplateSchema);
