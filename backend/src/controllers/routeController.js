import { calculateRoute } from "../services/routeService.js";

export const previewRoute = async (req, res) => {
  try {
    const { from, to, stops = [] } = req.body;

    if (!from || !to) {
      const err = new Error("From and To locations are required");
      err.statusCode = 400;
      throw err;
    }

    let routeData;
    try {
      routeData = await calculateRoute([
        { lat: from.lat, lng: from.lng },
        ...stops,
        { lat: to.lat, lng: to.lng },
      ]);
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    res.json({
      distanceKm: routeData.distanceKm,
      durationMin: routeData.durationMin,
      geometry: routeData.geometry,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
