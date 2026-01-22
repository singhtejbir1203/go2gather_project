import mongoose from "mongoose";

const vehicleTypeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // e.g. car, bike, auto, bus
    },

    displayName: {
      type: String,
      required: true,
      // e.g. Car, Bike, Auto-Rickshaw
    },

    imageUrl: {
      type: String,
      required: true,
      // Used in UI (publish ride, seat selection)
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VehicleType", vehicleTypeSchema);
