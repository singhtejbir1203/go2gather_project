import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

function BookingSuccess() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking-details", bookingId],
    queryFn: async () => {
      const res = await api.get(`/bookings/${bookingId}`);
      return res.data;
    },
    enabled: !!bookingId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booking details...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load booking details
      </div>
    );
  }

  const { booking, ride, driver, vehicle, seats } = data;

  return (
    <div className="min-h-screen bg-green-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full space-y-6 shadow-xl">
        <CheckCircle className="h-14 w-14 text-green-600 mx-auto" />

        <h1 className="text-2xl font-bold text-center">Booking Confirmed!</h1>

        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">
              {ride.from.label} → {ride.to.label}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Date</span>
            <span>{new Date(ride.date).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Time</span>
            <span>
              {new Date(ride.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Driver</span>
            <span>{driver.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Vehicle</span>
            <span>
              {vehicle.brand} {vehicle.model}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Seats</span>
            <span>{seats.map((s) => s.label).join(", ")}</span>
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total Paid</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/my-rides")}
          >
            My Rides
          </Button>

          <Button className="w-full" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;
