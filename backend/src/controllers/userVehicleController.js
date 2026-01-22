import UserVehicle from "../models/UserVehicle.js";
import VehicleBrand from "../models/VehicleBrand.js";
import VehicleModel from "../models/VehicleModel.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const requestVehicleApproval = async (req, res) => {
  try {
    const { modelId, plateNumber } = req.body;

    if (!req.file) {
      const err = new Error("License file is required");
      err.statusCode = 400;
      throw err;
    }

    if (!modelId || !plateNumber) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const model = await VehicleModel.findById(modelId);
    if (!model) {
      const err = new Error("Invalid vehicle model");
      err.statusCode = 400;
      throw err;
    }

    const brand = await VehicleBrand.findById(model.brandId);

    const existing = await UserVehicle.findOne({
      userId: req.user._id,
    }).populate({
      path: "modelId",
      populate: {
        path: "brandId",
        select: "vehicleTypeId",
      },
    });

    if (
      existing &&
      existing.modelId.brandId.vehicleTypeId.toString() ===
        brand.vehicleTypeId.toString()
    ) {
      const err = new Error("You already have a vehicle of this type");
      err.statusCode = 400;
      throw err;
    }

    const vehicle = await UserVehicle.create({
      userId: req.user._id,
      modelId,
      plateNumber,
      licenseFile: `/uploads/vehicle-licenses/${req.file.filename}`,
      approvalStatus: "pending",
      isActive: false,
    });

    logDbOperation({
      operation: "CREATE",
      model: "UserVehicle",
      documentId: vehicle._id,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Vehicle approval request submitted successfully",
      vehicleId: vehicle._id,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const getApprovedVehicles = async (req, res) => {
  try {
    const vehicles = await UserVehicle.find({
      userId: req.user._id,
      approvalStatus: "approved",
      isActive: true,
    }).populate({
      path: "modelId",
      populate: {
        path: "brandId",
        populate: {
          path: "vehicleTypeId",
        },
      },
    });

    res.json(vehicles);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getApprovedVehicleTypes = async (req, res) => {
  try {
    const vehicles = await UserVehicle.find({
      userId: req.user._id,
      approvalStatus: "approved",
      isActive: true,
    }).populate({
      path: "modelId",
      populate: {
        path: "brandId",
        select: "vehicleTypeId",
      },
    });

    const approvedTypeIds = [
      ...new Set(
        vehicles.map((v) => v.modelId.brandId.vehicleTypeId.toString()),
      ),
    ];

    res.json(approvedTypeIds);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getPendingVehicles = async (req, res) => {
  try {
    const vehicles = await UserVehicle.find({
      approvalStatus: "pending",
    })
      .populate("userId", "name email")
      .populate({
        path: "modelId",
        populate: {
          path: "brandId",
          populate: {
            path: "vehicleTypeId",
          },
        },
      });

    res.json(vehicles);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const approveUserVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const userVehicle = await UserVehicle.findById(id).populate("modelId");
    if (!userVehicle) {
      const err = new Error("Vehicle not found");
      err.statusCode = 404;
      throw err;
    }

    const brand = await VehicleBrand.findById(userVehicle.modelId.brandId);
    const vehicleTypeId = brand.vehicleTypeId;

    const existingApproved = await UserVehicle.findOne({
      userId: userVehicle.userId,
      approvalStatus: "approved",
      _id: { $ne: userVehicle._id },
    }).populate({
      path: "modelId",
      populate: {
        path: "brandId",
        select: "vehicleTypeId",
      },
    });

    if (
      existingApproved &&
      existingApproved.modelId.brandId.vehicleTypeId.toString() ===
        vehicleTypeId.toString()
    ) {
      const err = new Error(
        "User already has an approved vehicle of this type",
      );
      err.statusCode = 400;
      throw err;
    }

    userVehicle.approvalStatus = "approved";
    userVehicle.isActive = true;
    await userVehicle.save();

    logDbOperation({
      operation: "UPDATE",
      model: "UserVehicle",
      documentId: userVehicle._id,
      userId: req.user._id,
    });

    res.json({ message: "Vehicle approved successfully" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const rejectUserVehicle = async (req, res) => {
  try {
    const vehicle = await UserVehicle.findById(req.params.id);
    if (!vehicle) {
      const err = new Error("Vehicle not found");
      err.statusCode = 404;
      throw err;
    }

    vehicle.approvalStatus = "rejected";
    vehicle.isActive = false;
    await vehicle.save();

    logDbOperation({
      operation: "UPDATE",
      model: "UserVehicle",
      documentId: vehicle._id,
      userId: req.user._id,
    });

    res.json({ message: "Vehicle rejected" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
