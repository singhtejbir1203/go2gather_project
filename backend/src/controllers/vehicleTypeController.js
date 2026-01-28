import fs from "fs";
import path from "path";
import VehicleType from "../models/VehicleType.js";
import uploadToBlob from "../utils/uploadToBlob.js";

/**
 * GET /api/admin/vehicle-types
 */
export const getVehicleTypes = async (req, res) => {
  const types = await VehicleType.find().sort({ createdAt: 1 });
  res.json(types);
};

/**
 * POST /api/admin/vehicle-types
 */
export const createVehicleType = async (req, res) => {
  try {
    const { key, displayName, description } = req.body;

    if (!key || !displayName) {
      return res.status(400).json({
        message: "key and displayName are required",
      });
    }

    const exists = await VehicleType.findOne({ key });

    if (exists) {
      return res.status(400).json({
        message: "Vehicle type already exists",
      });
    }

    const imageUrl = req.file
      ? await uploadToBlob(req.file, "vehicle-types")
      : null;

    const vehicleType = await VehicleType.create({
      key,
      displayName,
      imageUrl,
      description,
    });

    res.status(201).json(vehicleType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/admin/vehicle-types/:id
 */
export const updateVehicleType = async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, description, isActive } = req.body;

    const vehicleType = await VehicleType.findById(id);

    if (!vehicleType) {
      return res.status(404).json({
        message: "Vehicle type not found",
      });
    }

    // If new image uploaded → delete old image
    // if (req.file) {
    //   if (vehicleType.imageUrl) {
    //     const oldPath = path.join(process.cwd(), vehicleType.imageUrl);

    //     if (fs.existsSync(oldPath)) {
    //       fs.unlinkSync(oldPath);
    //     }
    //   }

    //   vehicleType.imageUrl = `/uploads/vehicle-types/${req.file.filename}`;
    // }

    if (req.file) {
      const newImageUrl = await uploadToBlob(req.file, "vehicle-types");

      vehicleType.imageUrl = newImageUrl;
    }

    if (displayName !== undefined) vehicleType.displayName = displayName;

    if (description !== undefined) vehicleType.description = description;

    if (isActive !== undefined) vehicleType.isActive = isActive;

    await vehicleType.save();

    res.json(vehicleType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
