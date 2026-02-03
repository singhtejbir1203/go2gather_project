import stripe from "../config/stripe.js";
import Ride from "../models/Ride.js";
import RideSeat from "../models/RideSeat.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import RevenueTransaction from "../models/RevenueTransaction.js";
import { getPlatformFeePercent } from "../utils/platformFee.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const prepareBooking = async (req, res) => {
  try {
    const { rideId, seatIds } = req.body;

    if (!Array.isArray(seatIds) || seatIds.length === 0) {
      const err = new Error("Seats required");
      err.statusCode = 400;
      throw err;
    }

    const ride = await Ride.findById(rideId);
    if (!ride) {
      const err = new Error("Ride not found");
      err.statusCode = 404;
      throw err;
    }

    if (ride.driverId.toString() === req.user._id.toString()) {
      const err = new Error("You cannot book your own ride");
      err.statusCode = 403;
      throw err;
    }

    const driver = await User.findById(ride.driverId);

    if (
      !driver.stripeAccountId ||
      !driver.stripeChargesEnabled ||
      !driver.stripePayoutsEnabled
    ) {
      const err = new Error("Driver is not ready to receive payments");
      err.statusCode = 400;
      throw err;
    }

    const overlappingBooking = await Booking.findOne({
      userId: req.user._id,
    }).populate("rideId");

    if (
      overlappingBooking &&
      overlappingBooking.rideId.startTime < ride.endTime &&
      overlappingBooking.rideId.endTime > ride.startTime
    ) {
      const err = new Error("You already have a ride during this time");
      err.statusCode = 400;
      throw err;
    }

    const seats = await RideSeat.find({
      _id: { $in: seatIds },
      rideId,
      isBooked: false,
    });

    if (seats.length !== seatIds.length) {
      const err = new Error("One or more seats already booked");
      err.statusCode = 409;
      throw err;
    }

    const platformFeePercent = await getPlatformFeePercent();

    const baseAmount = seatIds.length * ride.pricePerSeat;
    const platformFee = Math.round((baseAmount * platformFeePercent) / 100);
    const totalAmount = baseAmount + platformFee;

    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100,
        currency: "inr",
        automatic_payment_methods: { enabled: true },
        application_fee_amount: platformFee * 100,
        transfer_data: {
          destination: driver.stripeAccountId,
        },
        metadata: {
          rideId: ride._id.toString(),
          driverId: driver._id.toString(),
          passengerId: req.user._id.toString(),
        },
      });
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      pricing: {
        totalAmount,
        seatCount: seatIds.length,
        pricePerSeat: Math.round(totalAmount / seatIds.length),
      },
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { paymentIntentId, rideId, seatIds } = req.body;

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (intent.status !== "succeeded") {
      const err = new Error("Payment not completed");
      err.statusCode = 400;
      throw err;
    }

    const seats = await RideSeat.find({
      _id: { $in: seatIds },
      rideId,
      isBooked: false,
    });

    if (seats.length !== seatIds.length) {
      const err = new Error("Seats no longer available");
      err.statusCode = 409;
      throw err;
    }

    const booking = await Booking.create({
      rideId,
      userId: req.user._id,
      totalAmount: intent.amount / 100,
      paymentIntentId: intent.id,
      chargeId: intent.latest_charge,
    });

    logDbOperation({
      operation: "CREATE",
      model: "Booking",
      documentId: booking._id,
      userId: req.user._id,
    });

    await RideSeat.updateMany(
      { _id: { $in: seatIds } },
      {
        $set: {
          isBooked: true,
          bookingId: booking._id,
          bookedBy: req.user._id,
          bookedAt: new Date(),
        },
      },
    );

    const ride = await Ride.findById(rideId);

    const platformFeePercent = await getPlatformFeePercent();
    const platformFee = Math.round(
      (booking.totalAmount * platformFeePercent) / (100 + platformFeePercent),
    );

    const driverPayout = booking.totalAmount - platformFee;

    const revenue = await RevenueTransaction.create({
      bookingId: booking._id,
      rideId,
      passengerId: req.user._id,
      driverId: ride.driverId,
      stripePaymentIntentId: intent.id,
      stripeChargeId: intent.latest_charge,
      grossAmount: booking.totalAmount,
      platformFee,
      driverPayout,
      paidAt: new Date(),
    });

    logDbOperation({
      operation: "CREATE",
      model: "RevenueTransaction",
      documentId: revenue._id,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Booking confirmed",
      bookingId: booking._id,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const getMyBookingsSummary = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select("rideId status paymentStatus createdAt cancelledAt")
      .populate({
        path: "rideId",
        select: "from to startTime endTime driverId userVehicleId",
        populate: [
          { path: "driverId", select: "name" },
          {
            path: "userVehicleId",
            select: "modelId",
            populate: {
              path: "modelId",
              select: "name brandId",
              populate: { path: "brandId", select: "name" },
            },
          },
        ],
      });

    const result = bookings.map((booking) => {
      const ride = booking.rideId;
      const vehicleModel = ride.userVehicleId?.modelId;

      return {
        bookingId: booking._id,
        rideId: ride._id,
        date: ride.startTime,
        startTime: ride.startTime,
        endTime: ride.endTime,
        from: ride.from.label,
        to: ride.to.label,
        driverName: ride.driverId.name,
        vehicleLabel: vehicleModel
          ? `${vehicleModel.brandId.name} ${vehicleModel.name}`
          : "Vehicle",
        status: booking.status,
        paymentStatus: booking.paymentStatus,
      };
    });

    res.json(result);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      userId: req.user._id,
    }).populate({
      path: "rideId",
      populate: [
        { path: "driverId", select: "_id name ratingAvg ratingCount" },
        {
          path: "userVehicleId",
          populate: {
            path: "modelId",
            populate: { path: "brandId" },
          },
        },
      ],
    });

    if (!booking) {
      const err = new Error("Booking not found");
      err.statusCode = 404;
      throw err;
    }

    const ride = booking.rideId;

    const seats = await RideSeat.find({
      bookingId: booking._id,
    })
      .populate("seatTemplateId")
      .populate("bookedBy");

    const vehicleModel = ride.userVehicleId.modelId;
    const vehicleBrand = vehicleModel.brandId;

    const isFutureRide = new Date(ride.startTime) > new Date();

    res.json({
      booking: {
        bookingId: booking._id,
        status: booking.status,
        paymentStatus: booking.paymentStatus,
        totalAmount: booking.totalAmount,
        cancelledAt: booking.cancelledAt || null,
        createdAt: booking.createdAt,
      },
      ride: {
        date: ride.startTime,
        startTime: ride.startTime,
        endTime: ride.endTime,
        from: ride.from,
        to: ride.to,
        distanceKm: ride.distanceKm,
        durationMin: ride.durationMin,
      },
      driver: {
        _id: ride.driverId._id,
        name: ride.driverId.name,
        ratingAvg: ride.driverId.ratingAvg,
        ratingCount: ride.driverId.ratingCount,
      },
      vehicle: {
        brand: vehicleBrand.name,
        model: vehicleModel.name,
      },
      seats: seats.map((s) => ({
        seatCode: s.seatTemplateId.code,
        label: s.seatTemplateId.label,
      })),
      passengers: seats.map((s) => ({
        _id: s.bookedBy?._id,
        name: s.bookedBy.name,
      })),
      actions: {
        canCancel: isFutureRide && booking.status === "confirmed",
        canRate: !isFutureRide && booking.status === "confirmed",
      },
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({
      _id: bookingId,
      userId: req.user._id,
    });

    if (!booking) {
      const err = new Error("Booking not found");
      err.statusCode = 404;
      throw err;
    }

    if (booking.status !== "confirmed") {
      const err = new Error("Booking is not cancellable");
      err.statusCode = 400;
      throw err;
    }

    if (booking.paymentStatus !== "completed") {
      const err = new Error("Payment not completed");
      err.statusCode = 400;
      throw err;
    }

    const ride = await Ride.findById(booking.rideId);
    if (new Date(ride.startTime) <= new Date()) {
      const err = new Error("You can only cancel future rides");
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
      { bookingId: booking._id },
      {
        $set: {
          isBooked: false,
          bookingId: null,
          bookedBy: null,
          bookedAt: null,
        },
      },
    );

    booking.status = "cancelled";
    booking.paymentStatus = "refunded";
    booking.cancelledAt = new Date();
    await booking.save();

    logDbOperation({
      operation: "UPDATE",
      model: "Booking",
      documentId: booking._id,
      userId: req.user._id,
    });

    await RevenueTransaction.findOneAndUpdate(
      { bookingId: booking._id },
      { status: "refunded", refundId: refund.id, refundedAt: new Date() },
    );

    logDbOperation({
      operation: "REFUND",
      model: "RevenueTransaction",
      documentId: booking._id,
      userId: req.user._id,
    });

    res.json({
      message: "Booking cancelled and refunded successfully",
      refundId: refund.id,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
