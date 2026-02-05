import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  confirmBooking,
  prepareBooking,
} from "@/features/bookings/services/bookingApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "@/features/bookings/components/StripeCheckout";

function SeatAvailability({ ride }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [pricing, setPricing] = useState(null);
  const navigate = useNavigate();

  const availableSeats = ride.seats.filter((s) => !s.isBooked);

  const toggleSeat = (id) => {
    setError(null);
    setSelectedSeats((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handlePay = async () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    setLoading(true);
    setError(null);

    try {
      const res = await prepareBooking({
        rideId: ride.rideId,
        seatIds: selectedSeats,
      });

      setClientSecret(res.clientSecret);
      setPaymentIntentId(res.paymentIntentId);
      setPricing(res.pricing);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong while booking seats",
      );
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <>
        {pricing && (
          <div className="bg-white rounded-lg p-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Price per seat</span>
              <span>₹{pricing.pricePerSeat}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total ({pricing.seatCount} seats)</span>
              <span>₹{pricing.totalAmount}</span>
            </div>
          </div>
        )}

        <StripeCheckout
          clientSecret={clientSecret}
          onSuccess={async () => {
            const res2 = await confirmBooking({
              paymentIntentId,
              rideId: ride.rideId,
              seatIds: selectedSeats,
            });
            navigate(`/booking-success/${res2.bookingId}/${res2.qrToken}`);
          }}
        />
      </>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
      <h3 className="font-semibold text-lg">Select available seats</h3>

      <div className="grid grid-cols-4 gap-3">
        {ride.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);

          return (
            <button
              key={seat.id}
              disabled={seat.isBooked || loading}
              onClick={() => toggleSeat(seat.id)}
              className={`border rounded p-3 text-sm transition
                ${
                  seat.isBooked
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : isSelected
                      ? "bg-primary text-white"
                      : "hover:border-primary"
                }
              `}
            >
              {/* {seat.label} */}
              <div className="font-medium">{seat.label}</div>
              {seat.isBooked && (
                <div className="text-xs text-gray-600 mt-1">
                  Booked by <a>{seat.bookedBy.name}</a>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-600">
        {availableSeats.length} seats available
      </p>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        className="w-full"
        disabled={selectedSeats.length === 0 || loading}
        onClick={handlePay}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking seats…
          </>
        ) : (
          `Book ${selectedSeats.length} seat(s)`
        )}
      </Button>
    </div>
  );
}

export default SeatAvailability;
