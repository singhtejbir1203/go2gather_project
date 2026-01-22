import Ride from "../models/Ride.js";
import RideSeat from "../models/RideSeat.js";
import Booking from "../models/Booking.js";
import stripe from "../config/stripe.js";
import RevenueTransaction from "../models/RevenueTransaction.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const getAllRidesAdmin = async (req, res) => {
  try {
    const rides = await Ride.find()
      .sort({ createdAt: -1 })
      .populate("driverId", "name email")
      .populate("userVehicleId")
      .select("from to startTime endTime status pricePerSeat createdAt");

    res.json(rides);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getRideDetailsAdmin = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId)
      .populate("driverId", "name email")
      .populate({
        path: "userVehicleId",
        populate: {
          path: "modelId",
          populate: { path: "brandId" },
        },
      });

    if (!ride) {
      const err = new Error("Ride not found");
      err.statusCode = 404;
      throw err;
    }

    const bookings = await Booking.find({ rideId: ride._id })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const seats = await RideSeat.find({ rideId: ride._id }).populate(
      "seatTemplateId",
    );

    const totalSeats = seats.length;
    const bookedSeatCount = seats.filter((s) => s.isBooked).length;

    res.json({
      ride,
      bookings,
      seats,
      totalSeats,
      bookedSeatCount,
      isFutureRide: new Date(ride.startTime) > new Date(),
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const adminCancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      const err = new Error("Booking not found");
      err.statusCode = 404;
      throw err;
    }

    const ride = await Ride.findById(booking.rideId);
    if (new Date(ride.startTime) <= new Date()) {
      const err = new Error("Cannot cancel past ride booking");
      err.statusCode = 400;
      throw err;
    }

    let refund;
    try {
      refund = await stripe.refunds.create({
        payment_intent: booking.paymentIntentId,
        reverse_transfer: true,
        refund_application_fee: true,
      });
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    await RideSeat.updateMany(
      { bookingId },
      { isBooked: false, bookingId: null, bookedBy: null, bookedAt: null },
    );

    booking.status = "cancelled";
    booking.paymentStatus = "refunded";
    booking.cancelledAt = new Date();
    await booking.save();

    logDbOperation({
      operation: "UPDATE",
      model: "Booking",
      documentId: booking._id,
      userId: req.user?._id,
    });

    await RevenueTransaction.findOneAndUpdate(
      { bookingId },
      { status: "refunded", refundId: refund.id, refundedAt: new Date() },
    );

    logDbOperation({
      operation: "REFUND",
      model: "RevenueTransaction",
      documentId: booking._id,
      userId: req.user?._id,
    });

    res.json({ message: "Booking cancelled & refunded" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const adminCancelRide = async (req, res) => {
  try {
    const { rideId } = req.params;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      const err = new Error("Ride not found");
      err.statusCode = 404;
      throw err;
    }

    if (new Date(ride.startTime) <= new Date()) {
      const err = new Error("Cannot cancel past ride");
      err.statusCode = 400;
      throw err;
    }

    const bookings = await Booking.find({
      rideId,
      status: "confirmed",
    });

    for (const booking of bookings) {
      try {
        await stripe.refunds.create({
          payment_intent: booking.paymentIntentId,
          reverse_transfer: true,
          refund_application_fee: true,
        });
      } catch (err) {
        err.statusCode = 502;
        throw err;
      }

      await RideSeat.updateMany(
        { bookingId: booking._id },
        { isBooked: false, bookingId: null, bookedBy: null, bookedAt: null },
      );

      booking.status = "cancelled";
      booking.paymentStatus = "refunded";
      booking.cancelledAt = new Date();
      await booking.save();

      logDbOperation({
        operation: "UPDATE",
        model: "Booking",
        documentId: booking._id,
        userId: req.user?._id,
      });

      await RevenueTransaction.findOneAndUpdate(
        { bookingId: booking._id },
        { status: "refunded", refundedAt: new Date() },
      );

      logDbOperation({
        operation: "REFUND",
        model: "RevenueTransaction",
        documentId: booking._id,
        userId: req.user?._id,
      });
    }

    ride.status = "cancelled";
    await ride.save();

    logDbOperation({
      operation: "UPDATE",
      model: "Ride",
      documentId: ride._id,
      userId: req.user?._id,
    });

    res.json({ message: "Ride cancelled and all bookings refunded" });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
