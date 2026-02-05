import { verifyQrToken } from "../utils/qrToken.js";
import Ride from "../models/Ride.js";
import Booking from "../models/Booking.js";
import RideSeat from "../models/RideSeat.js";

export const resolveQr = async (req, res) => {
  try {
    const decoded = verifyQrToken(req.params.token);

    if (decoded.type === "RIDE") {
      const ride = await Ride.findById(decoded.rideId)
        .select("-route")
        .populate("driverId", "name ratingAvg ratingCount")
        .populate({
          path: "userVehicleId",
          populate: {
            path: "modelId",
            populate: {
              path: "brandId",
              populate: "vehicleTypeId",
            },
          },
        });

      return res.json({ type: "RIDE", ride });
    }

    if (decoded.type === "BOOKING") {
      const seats = await RideSeat.find({
        isBooked: true,
        bookingId: decoded.bookingId,
        bookedBy: decoded.userId,
      })
        .select("_id")
        .populate("seatTemplateId", "label");

      const booking = await Booking.findById(decoded.bookingId)
        .populate("userId", "name")
        .populate({
          path: "rideId",
          select: "-route",
          populate: { path: "driverId", select: "name" },
        });

      return res.json({
        type: "BOOKING",
        booking,
        seats,
      });
    }
  } catch (err) {
    err.statusCode = 410;
    throw err;
  }
};
