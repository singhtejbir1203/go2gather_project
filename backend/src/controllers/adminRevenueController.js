import mongoose from "mongoose";
import RevenueTransaction from "../models/RevenueTransaction.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const getRevenueSummary = async (req, res) => {
  try {
    const result = await RevenueTransaction.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: null,
          totalGMV: { $sum: "$grossAmount" },
          totalPlatformFee: { $sum: "$platformFee" },
          totalDriverPayout: { $sum: "$driverPayout" },
          totalTransactions: { $sum: 1 },
        },
      },
    ]);

    res.json(
      result[0] || {
        totalGMV: 0,
        totalPlatformFee: 0,
        totalDriverPayout: 0,
        totalTransactions: 0,
      },
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getRevenueTimeline = async (req, res) => {
  try {
    const range = Number(req.query.range || 30);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - range);

    const data = await RevenueTransaction.aggregate([
      {
        $match: {
          status: "completed",
          paidAt: { $gte: fromDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          gmv: { $sum: "$grossAmount" },
          platformFee: { $sum: "$platformFee" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getRevenueTransactions = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      RevenueTransaction.find()
        .populate("driverId", "name email")
        .populate("passengerId", "name email")
        .populate("rideId", "from to startTime")
        .sort({ paidAt: -1 })
        .skip(skip)
        .limit(limit),
      RevenueTransaction.countDocuments(),
    ]);

    res.json({
      data: transactions,
      page,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getDriverRevenue = async (req, res) => {
  try {
    const { driverId } = req.params;

    const data = await RevenueTransaction.aggregate([
      {
        $match: {
          driverId: new mongoose.Types.ObjectId(driverId),
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalTrips: { $sum: 1 },
          totalPayout: { $sum: "$driverPayout" },
        },
      },
    ]);

    res.json(
      data[0] || {
        totalTrips: 0,
        totalPayout: 0,
      },
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};
