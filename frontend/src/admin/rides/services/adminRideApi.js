import api from "@/services/api";

export const fetchAllRidesAdmin = async () => {
  const res = await api.get("/admin/rides");
  return res.data;
};

export const fetchRideDetailsAdmin = async (rideId) => {
  const res = await api.get(`/admin/rides/${rideId}`);
  return res.data;
};

export const cancelRideAdmin = async (rideId) => {
  const res = await api.post(`/admin/rides/${rideId}/cancel`);
  return res.data;
};

export const cancelBookingAdmin = async (bookingId) => {
  const res = await api.post(`/admin/bookings/${bookingId}/cancel`);
  return res.data;
};
