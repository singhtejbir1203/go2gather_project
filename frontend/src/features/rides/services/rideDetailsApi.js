import api from "@/services/api";

export const fetchRideDetails = async (rideId) => {
  const { data } = await api.get(`/rides/${rideId}/details`);
  return data;
};

export const getMyPublishedRides = async () => {
  const { data } = await api.get("/rides/my-publications");
  return data;
};

export const getMyPublishedRideDetails = async (rideId) => {
  const { data } = await api.get(`/rides/my-publication/${rideId}`);
  return data;
};

export const cancelPublishedRide = async (rideId) => {
  const { data } = await api.post(`/rides/my-publication/${rideId}/cancel`);
  return data;
};
