import User from "../models/User.js";
import Ride from "../models/Ride.js";

export const getPublicUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select(
      "name createdAt ratingAvg ratingCount",
    );

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    const publishedRideCount = await Ride.countDocuments({
      driverId: userId,
      status: { $in: ["completed", "active"] },
    });

    const completedRideCount = await Ride.countDocuments({
      driverId: userId,
      status: "completed",
    });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        ratingAvg: user.ratingAvg,
        ratingCount: user.ratingCount,
        experienceLevel:
          completedRideCount > 50
            ? "Expert"
            : completedRideCount > 10
              ? "Intermediate"
              : "Newcomer",
        memberSince: user.createdAt,
      },

      preferences: {
        chatty: user.preferences?.chatty || false,
        smoking: user.preferences?.smoking || false,
        pets: user.preferences?.pets || false,
      },

      stats: {
        publishedRides: publishedRideCount,
        completedRides: completedRideCount,
      },
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
