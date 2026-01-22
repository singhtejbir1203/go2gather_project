export const pointNearRouteQuery = (point, maxDistanceMeters = 10000) => {
  return {
    route: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [point.lng, point.lat],
        },
        $maxDistance: maxDistanceMeters,
      },
    },
  };
};
