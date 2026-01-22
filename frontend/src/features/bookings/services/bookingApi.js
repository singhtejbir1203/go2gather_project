import api from "@/services/api";

export const prepareBooking = async ({ rideId, seatIds }) => {
  const res = await api.post("/bookings/prepare", {
    rideId,
    seatIds,
  });
  return res.data;
};

export const confirmBooking = async ({ paymentIntentId, rideId, seatIds }) => {
  const res = await api.post("/bookings/confirm", {
    paymentIntentId,
    rideId,
    seatIds,
  });
  return res.data;
};

export const getMyBookings = async () => {
  const { data } = await api.get("/bookings/my");
  return data;
};

export const getBookingDetails = async (bookingId) => {
  const { data } = await api.get(`/bookings/${bookingId}`);
  return data;
};

export const cancelBooking = async (bookingId) => {
  const { data } = await api.post(`/bookings/${bookingId}/cancel`);
  return data;
};
