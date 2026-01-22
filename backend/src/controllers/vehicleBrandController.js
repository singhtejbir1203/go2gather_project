import VehicleBrand from "../models/VehicleBrand.js";
import VehicleType from "../models/VehicleType.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const getBrandsByVehicleType = async (req, res) => {
  try {
    const { vehicleTypeId } = req.params;

    const brands = await VehicleBrand.find({
      vehicleTypeId,
    }).sort({ createdAt: 1 });

    res.json(brands);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const createVehicleBrand = async (req, res) => {
  try {
    const { vehicleTypeId, name } = req.body;

    if (!vehicleTypeId || !name) {
      const err = new Error("vehicleTypeId and name are required");
      err.statusCode = 400;
      throw err;
    }

    const vehicleType = await VehicleType.findById(vehicleTypeId);
    if (!vehicleType) {
      const err = new Error("Invalid vehicle type");
      err.statusCode = 400;
      throw err;
    }

    const exists = await VehicleBrand.findOne({
      vehicleTypeId,
      name,
    });

    if (exists) {
      const err = new Error("Brand already exists for this vehicle type");
      err.statusCode = 400;
      throw err;
    }

    const brand = await VehicleBrand.create({
      vehicleTypeId,
      name,
    });

    logDbOperation({
      operation: "CREATE",
      model: "VehicleBrand",
      documentId: brand._id,
      userId: req.user?._id,
    });

    res.status(201).json(brand);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const updateVehicleBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const brand = await VehicleBrand.findById(id);
    if (!brand) {
      const err = new Error("Vehicle brand not found");
      err.statusCode = 404;
      throw err;
    }

    if (name !== undefined) brand.name = name;
    if (isActive !== undefined) brand.isActive = isActive;

    await brand.save();

    logDbOperation({
      operation: "UPDATE",
      model: "VehicleBrand",
      documentId: brand._id,
      userId: req.user?._id,
    });

    res.json(brand);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
