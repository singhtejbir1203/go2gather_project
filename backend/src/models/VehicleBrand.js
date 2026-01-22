import mongoose from "mongoose";

const vehicleBrandSchema = new mongoose.Schema(
  {
    vehicleTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleType",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate brand names under same vehicle type
vehicleBrandSchema.index({ vehicleTypeId: 1, name: 1 }, { unique: true });

export default mongoose.model("VehicleBrand", vehicleBrandSchema);
