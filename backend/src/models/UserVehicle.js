import mongoose from "mongoose";

const userVehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleModel",
      required: true,
    },

    plateNumber: {
      type: String,
      required: true,
      trim: true,
    },

    licenseFile: {
      type: String,
      required: true,
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate vehicle models per user (1 vehicle per type logic will be enforced via model chain)
userVehicleSchema.index({ userId: 1, modelId: 1 }, { unique: true });

export default mongoose.model("UserVehicle", userVehicleSchema);
