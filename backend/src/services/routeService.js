import axios from "axios";
//  OSRM (OpenStreetMap Routing Machine)
//  Free, no API key

export const calculateRoute = async (points) => {
  const coordinates = points.map((p) => `${p.lng},${p.lat}`).join(";");

  const url = `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

  const response = await axios.get(url);

  if (!response.data.routes || response.data.routes.length === 0) {
    throw new Error("Route calculation failed");
  }

  const route = response.data.routes[0];

  return {
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
    geometry: route.geometry,
  };
};
