import VehicleModel from "../models/VehicleModel.js";
import VehicleBrand from "../models/VehicleBrand.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const getModelsByBrand = async (req, res) => {
  try {
    const { brandId } = req.params;

    const models = await VehicleModel.find({
      brandId,
    }).sort({ createdAt: 1 });

    res.json(models);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const createVehicleModel = async (req, res) => {
  try {
    const { brandId, name } = req.body;

    if (!brandId || !name) {
      const err = new Error("brandId and name are required");
      err.statusCode = 400;
      throw err;
    }

    const brand = await VehicleBrand.findById(brandId);
    if (!brand) {
      const err = new Error("Invalid vehicle brand");
      err.statusCode = 400;
      throw err;
    }

    const exists = await VehicleModel.findOne({
      brandId,
      name,
    });

    if (exists) {
      const err = new Error("Model already exists for this brand");
      err.statusCode = 400;
      throw err;
    }

    const model = await VehicleModel.create({
      brandId,
      name,
    });

    logDbOperation({
      operation: "CREATE",
      model: "VehicleModel",
      documentId: model._id,
      userId: req.user?._id,
    });

    res.status(201).json(model);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const updateVehicleModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const model = await VehicleModel.findById(id);
    if (!model) {
      const err = new Error("Vehicle model not found");
      err.statusCode = 404;
      throw err;
    }

    if (name !== undefined) model.name = name;
    if (isActive !== undefined) model.isActive = isActive;

    await model.save();

    logDbOperation({
      operation: "UPDATE",
      model: "VehicleModel",
      documentId: model._id,
      userId: req.user?._id,
    });

    res.json(model);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
