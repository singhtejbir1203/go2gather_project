import api from "@/services/api";

export const fetchRideDetails = async (rideId) => {
  const { data } = await api.get(`/rides/${rideId}`);
  return data;
};
