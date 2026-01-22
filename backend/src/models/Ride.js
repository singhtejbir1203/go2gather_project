import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userVehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserVehicle",
      required: true,
    },
    from: {
      label: String,
      lat: Number,
      lng: Number,
    },
    to: {
      label: String,
      lat: Number,
      lng: Number,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    pricePerSeat: {
      type: Number,
      required: true,
    },
    route: {
      type: {
        type: String,
        enum: ["LineString"],
        default: "LineString",
      },
      coordinates: {
        type: [[Number]], // [lng, lat]
      },
    },

    distanceKm: Number,
    durationMin: Number,

    stops: [
      {
        city: String,
        lat: Number,
        lng: Number,
      },
    ],

    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Index for time-clash checks
rideSchema.index({ driverId: 1, startTime: 1, endTime: 1 });
rideSchema.index({ route: "2dsphere" });

export default mongoose.model("Ride", rideSchema);
