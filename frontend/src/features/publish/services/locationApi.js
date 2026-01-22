import axios from "axios";

export const searchLocations = async (query) => {
  if (!query) return [];

  const res = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: query,
      format: "json",
      addressdetails: 1,
      limit: 5,
    },
  });

  return res.data.map((item) => ({
    label: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
  }));
};
