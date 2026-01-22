import PlatformConfig from "../models/PlatformConfig.js";

export const getPlatformFeePercent = async () => {
  const config = await PlatformConfig.findOne({ isActive: true });
  return config?.platformFeePercent || 0;
};
