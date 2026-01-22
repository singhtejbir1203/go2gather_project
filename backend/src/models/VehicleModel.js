import mongoose from "mongoose";

const vehicleModelSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleBrand",
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

// Prevent duplicate model names under same brand
vehicleModelSchema.index({ brandId: 1, name: 1 }, { unique: true });

export default mongoose.model("VehicleModel", vehicleModelSchema);
