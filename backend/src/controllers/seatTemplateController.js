import SeatTemplate from "../models/SeatTemplate.js";
import VehicleType from "../models/VehicleType.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const getSeatTemplatesByVehicleType = async (req, res) => {
  try {
    const { vehicleTypeId } = req.params;

    const templates = await SeatTemplate.find({
      vehicleTypeId,
    }).sort({ createdAt: 1 });

    res.json(templates);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const createSeatTemplate = async (req, res) => {
  try {
    const {
      vehicleTypeId,
      seatCode,
      label,
      isDriverSeat = false,
      position,
    } = req.body;

    if (!vehicleTypeId || !seatCode || !label) {
      const err = new Error("vehicleTypeId, seatCode and label are required");
      err.statusCode = 400;
      throw err;
    }

    const vehicleType = await VehicleType.findById(vehicleTypeId);
    if (!vehicleType) {
      const err = new Error("Invalid vehicle type");
      err.statusCode = 400;
      throw err;
    }

    const exists = await SeatTemplate.findOne({
      vehicleTypeId,
      seatCode,
    });

    if (exists) {
      const err = new Error("Seat code already exists for this vehicle type");
      err.statusCode = 400;
      throw err;
    }

    const seatTemplate = await SeatTemplate.create({
      vehicleTypeId,
      seatCode,
      label,
      isDriverSeat,
      position,
    });

    logDbOperation({
      operation: "CREATE",
      model: "SeatTemplate",
      documentId: seatTemplate._id,
      userId: req.user._id,
    });

    res.status(201).json(seatTemplate);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const updateSeatTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, isDriverSeat, position, isActive } = req.body;

    const seatTemplate = await SeatTemplate.findById(id);
    if (!seatTemplate) {
      const err = new Error("Seat template not found");
      err.statusCode = 404;
      throw err;
    }

    if (label !== undefined) seatTemplate.label = label;
    if (isDriverSeat !== undefined) seatTemplate.isDriverSeat = isDriverSeat;
    if (position !== undefined) seatTemplate.position = position;
    if (isActive !== undefined) seatTemplate.isActive = isActive;

    await seatTemplate.save();

    logDbOperation({
      operation: "UPDATE",
      model: "SeatTemplate",
      documentId: seatTemplate._id,
      userId: req.user._id,
    });

    res.json(seatTemplate);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const deleteSeatTemplate = async (req, res) => {
  try {
    const seatTemplate = await SeatTemplate.findById(req.params.id);
    if (!seatTemplate) {
      const err = new Error("Seat template not found");
      err.statusCode = 404;
      throw err;
    }

    seatTemplate.isActive = false;
    await seatTemplate.save();

    logDbOperation({
      operation: "DELETE",
      model: "SeatTemplate",
      documentId: seatTemplate._id,
      userId: req.user._id,
    });

    res.json({ message: "Seat template disabled successfully" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
