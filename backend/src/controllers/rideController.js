import Ride from "../models/Ride.js";
import RideSeat from "../models/RideSeat.js";
import { calculateRoute } from "../services/routeService.js";
import { addMinutesToDate, isFutureTime } from "../utils/timeUtils.js";
import UserVehicle from "../models/UserVehicle.js";
import VehicleModel from "../models/VehicleModel.js";
import VehicleBrand from "../models/VehicleBrand.js";
import SeatTemplate from "../models/SeatTemplate.js";
import User from "../models/User.js";
import { getPlatformFeePercent } from "../utils/platformFee.js";
import Booking from "../models/Booking.js";
import RevenueTransaction from "../models/RevenueTransaction.js";
import stripe from "../config/stripe.js";
import { logDbOperation } from "../utils/dbLogger.js";

// @route POST /api/rides

export const publishRide = async (req, res) => {
  try {
    const {
      userVehicleId,
      from,
      to,
      stops = [],
      startTime,
      pricePerSeat,
      availableSeats,
    } = req.body;

    if (!userVehicleId || !from || !to || !startTime || !pricePerSeat) {
      const err = new Error("All required fields must be provided");
      err.statusCode = 400;
      throw err;
    }

    const user = await User.findById(req.user._id);
    if (!user.stripeChargesEnabled || !user.stripePayoutsEnabled) {
      const err = new Error("Complete payout setup before publishing rides");
      err.statusCode = 403;
      throw err;
    }

    const userVehicle = await UserVehicle.findOne({
      _id: userVehicleId,
      userId: req.user._id,
      approvalStatus: "approved",
      isActive: true,
    }).populate("modelId");

    if (!userVehicle) {
      const err = new Error("Invalid or unapproved vehicle");
      err.statusCode = 403;
      throw err;
    }

    const brand = await VehicleBrand.findById(userVehicle.modelId.brandId);
    const vehicleTypeId = brand.vehicleTypeId;

    const routePoints = [
      { lat: from.lat, lng: from.lng },
      ...stops,
      { lat: to.lat, lng: to.lng },
    ];

    let routeData;
    try {
      routeData = await calculateRoute(routePoints);
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    const start = new Date(startTime);
    if (!isFutureTime(start)) {
      const err = new Error("Start time must be in the future");
      err.statusCode = 400;
      throw err;
    }

    const calculatedEndTime = addMinutesToDate(
      start,
      Math.ceil(routeData.durationMin),
    );

    const overlappingRide = await Ride.findOne({
      driverId: req.user._id,
      status: "active",
      startTime: { $lt: calculatedEndTime },
      endTime: { $gt: start },
    });

    if (overlappingRide) {
      const err = new Error("You already have a ride during this time window");
      err.statusCode = 400;
      throw err;
    }

    const seatTemplates = await SeatTemplate.find({
      vehicleTypeId,
      isActive: true,
      isDriverSeat: false,
    });

    if (!seatTemplates.length) {
      const err = new Error(
        "Seat template not configured for this vehicle type",
      );
      err.statusCode = 500;
      throw err;
    }

    if (!Array.isArray(availableSeats) || availableSeats.length === 0) {
      const err = new Error("At least one seat must be selected");
      err.statusCode = 400;
      throw err;
    }

    const selectedSeatTemplates = seatTemplates.filter((s) =>
      availableSeats.includes(s._id.toString()),
    );

    if (selectedSeatTemplates.length !== availableSeats.length) {
      const err = new Error("Invalid seat selection");
      err.statusCode = 400;
      throw err;
    }

    const ride = await Ride.create({
      driverId: req.user._id,
      userVehicleId,
      from,
      to,
      stops,
      startTime: start,
      endTime: calculatedEndTime,
      pricePerSeat,
      route: {
        type: "LineString",
        coordinates: routeData.geometry.coordinates,
      },
      distanceKm: routeData.distanceKm,
      durationMin: routeData.durationMin,
      status: "active",
    });

    logDbOperation({
      operation: "CREATE",
      model: "Ride",
      documentId: ride._id,
      userId: req.user._id,
    });

    const rideSeats = selectedSeatTemplates.map((seatTemplate) => ({
      rideId: ride._id,
      seatTemplateId: seatTemplate._id,
      isBooked: false,
    }));

    await RideSeat.insertMany(rideSeats);

    logDbOperation({
      operation: "CREATE",
      model: "RideSeat",
      documentId: ride._id,
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Ride published successfully",
      rideId: ride._id,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const searchRides = async (req, res) => {
  try {
    const { fromLat, fromLng, toLat, toLng, date, passengers = 1 } = req.query;

    if (!fromLat || !fromLng || !toLat || !toLng || !date) {
      return res.status(400).json({
        message: "Pickup, drop and date are required",
      });
    }

    const pickupPoint = {
      type: "Point",
      coordinates: [Number(fromLng), Number(fromLat)],
    };

    const dropPoint = {
      type: "Point",
      coordinates: [Number(toLng), Number(toLat)],
    };

    const searchDate = new Date(date);
    const today = new Date();

    let startTimeFilter;
    let endTimeFilter;

    if (searchDate.toDateString() === today.toDateString()) {
      startTimeFilter = new Date();
      endTimeFilter = new Date(`${date}T23:59:59.999Z`);
    } else {
      startTimeFilter = new Date(`${date}T00:00:00.000Z`);
      endTimeFilter = new Date(`${date}T23:59:59.999Z`);
    }

    const SEARCH_RADIUS_METERS = 5000;

    // 1️ Pickup proximity search
    const pickupMatchedRides = await Ride.find({
      route: {
        $near: {
          $geometry: pickupPoint,
          $maxDistance: SEARCH_RADIUS_METERS,
        },
      },
      startTime: { $gte: startTimeFilter, $lte: endTimeFilter },
      status: "active",
    });

    if (!pickupMatchedRides.length) {
      return res.json([]);
    }

    // 2️ Drop proximity filter
    const rideIds = pickupMatchedRides.map((r) => r._id);

    const dropMatchedRides = await Ride.find({
      _id: { $in: rideIds },
      route: {
        $near: {
          $geometry: dropPoint,
          $maxDistance: SEARCH_RADIUS_METERS,
        },
      },
    }).populate("driverId", "name ratingAvg ratingCount");

    if (!dropMatchedRides.length) {
      return res.json([]);
    }

    // 3️ Fetch UserVehicles in bulk
    const userVehicleIds = dropMatchedRides.map((r) => r.userVehicleId);

    const userVehicles = await UserVehicle.find({
      _id: { $in: userVehicleIds },
    }).populate({
      path: "modelId",
      populate: {
        path: "brandId",
        populate: {
          path: "vehicleTypeId",
        },
      },
    });

    const userVehicleMap = {};
    for (const uv of userVehicles) {
      userVehicleMap[uv._id.toString()] = uv;
    }

    // 4️ Fetch seats in bulk
    const allSeats = await RideSeat.find({
      rideId: { $in: dropMatchedRides.map((r) => r._id) },
    }).populate("seatTemplateId");

    const seatsByRide = {};
    for (const seat of allSeats) {
      if (!seatsByRide[seat.rideId]) {
        seatsByRide[seat.rideId] = [];
      }
      seatsByRide[seat.rideId].push(seat);
    }

    const platformFeePercent = await getPlatformFeePercent();
    const multiplier = 1 + platformFeePercent / 100;

    // Final shaping
    const results = [];

    for (const ride of dropMatchedRides) {
      const seats = seatsByRide[ride._id] || [];
      const availableSeats = seats.filter((s) => !s.isBooked);

      if (availableSeats.length < passengers) continue;

      const userVehicle = userVehicleMap[ride.userVehicleId.toString()];
      if (!userVehicle) continue;

      const model = userVehicle.modelId;
      const brand = model.brandId;
      const type = brand.vehicleTypeId;

      results.push({
        rideId: ride._id,

        driver: {
          name: ride.driverId.name,
          ratingAvg: ride.driverId.ratingAvg,
          ratingCount: ride.driverId.ratingCount,
        },

        vehicle: {
          type: type.displayName,
          brand: brand.name,
          model: model.name,
        },

        from: ride.from,
        to: ride.to,

        startTime: ride.startTime,
        endTime: ride.endTime,
        pricePerSeat: Math.round(ride.pricePerSeat * multiplier),

        availableSeatCount: availableSeats.length,
        totalSeats: seats.length,
        distanceKm: ride.distanceKm,
        durationMin: ride.durationMin,
      });
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/rides/:id
export const getRideDetails = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("driverId", "name ratingAvg ratingCount")
      .populate({
        path: "userVehicleId",
        populate: {
          path: "modelId",
          populate: {
            path: "brandId",
            populate: { path: "vehicleTypeId" },
          },
        },
      });

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    const seats = await RideSeat.find({ rideId: ride._id }).populate(
      "seatTemplateId",
    );

    const platformFeePercent = await getPlatformFeePercent();
    const multiplier = 1 + platformFeePercent / 100;

    res.json({
      rideId: ride._id,

      driver: {
        name: ride.driverId.name,
        ratingAvg: ride.driverId.ratingAvg,
        ratingCount: ride.driverId.ratingCount,
      },

      vehicle: {
        type: ride.userVehicleId.modelId.brandId.vehicleTypeId.displayName,
        brand: ride.userVehicleId.modelId.brandId.name,
        model: ride.userVehicleId.modelId.name,
        plateNumber: ride.userVehicleId.plateNumber,
      },

      from: ride.from,
      to: ride.to,
      stops: ride.stops,

      startTime: ride.startTime,
      endTime: ride.endTime,
      distanceKm: ride.distanceKm,
      durationMin: ride.durationMin,
      pricePerSeat: Math.round(ride.pricePerSeat * multiplier),

      seats: seats.map((s) => ({
        id: s._id,
        seatTemplateId: s.seatTemplateId._id,
        seatCode: s.seatTemplateId.seatCode,
        label: s.seatTemplateId.label,
        isBooked: s.isBooked,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyPublishedRides = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.user._id })
      .sort({ startTime: -1 })
      .select("from to startTime endTime status")
      .lean();

    if (!rides.length) return res.json([]);

    const rideIds = rides.map((r) => r._id);

    const seats = await RideSeat.find({ rideId: { $in: rideIds } });

    const seatStats = {};
    for (const seat of seats) {
      if (!seatStats[seat.rideId]) {
        seatStats[seat.rideId] = { total: 0, booked: 0 };
      }
      seatStats[seat.rideId].total++;
      if (seat.isBooked) seatStats[seat.rideId].booked++;
    }

    res.json(
      rides.map((r) => ({
        rideId: r._id,
        from: r.from.label,
        to: r.to.label,
        startTime: r.startTime,
        endTime: r.endTime,
        status: r.status,
        totalSeats: seatStats[r._id]?.total || 0,
        bookedSeats: seatStats[r._id]?.booked || 0,
      })),
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getMyPublishedRideDetails = async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.rideId,
      driverId: req.user._id,
    })
      .populate("driverId", "name email")
      .populate({
        path: "userVehicleId",
        populate: {
          path: "modelId",
          populate: { path: "brandId" },
        },
      });

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    const seats = await RideSeat.find({ rideId: ride._id })
      .populate("seatTemplateId")
      .populate("bookedBy", "name email");

    const isFutureRide = new Date(ride.startTime) > new Date();

    res.json({
      ride: {
        rideId: ride._id,
        status: ride.status,
        from: ride.from,
        to: ride.to,
        startTime: ride.startTime,
        endTime: ride.endTime,
        distanceKm: ride.distanceKm,
        durationMin: ride.durationMin,
        pricePerSeat: ride.pricePerSeat,
        canCancel: isFutureRide && ride.status === "active",
      },

      vehicle: {
        brand: ride.userVehicleId.modelId.brandId.name,
        model: ride.userVehicleId.modelId.name,
        plateNumber: ride.userVehicleId.plateNumber,
      },

      seats: seats.map((s) => ({
        seatId: s._id,
        label: s.seatTemplateId.label,
        isBooked: s.isBooked,
        bookedBy: s.bookedBy
          ? {
              name: s.bookedBy.name,
              email: s.bookedBy.email,
            }
          : null,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch ride details" });
  }
};

export const cancelPublishedRide = async (req, res) => {
  try {
    const ride = await Ride.findOne({
      _id: req.params.rideId,
      driverId: req.user._id,
      status: "active",
    });

    if (!ride) {
      const err = new Error("Ride not found or already cancelled");
      err.statusCode = 404;
      throw err;
    }

    if (new Date(ride.startTime) <= new Date()) {
      const err = new Error("Cannot cancel a ride that has already started");
      err.statusCode = 400;
      throw err;
    }

    const bookings = await Booking.find({
      rideId: ride._id,
      paymentStatus: "completed",
    });

    for (const booking of bookings) {
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
    }

    ride.status = "cancelled";
    await ride.save();

    logDbOperation({
      operation: "UPDATE",
      model: "Ride",
      documentId: ride._id,
      userId: req.user._id,
    });

    res.json({
      message: "Ride cancelled and all passengers refunded successfully",
      refundedBookings: bookings.length,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
