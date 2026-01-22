import mongoose from "mongoose";

const platformConfigSchema = new mongoose.Schema(
  {
    platformFeePercent: {
      type: Number,
      required: true,
      default: 25,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("PlatformConfig", platformConfigSchema);
