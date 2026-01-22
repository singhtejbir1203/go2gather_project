import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "@/features/bookings/services/bookingApi";
import BookingSummary from "@/features/bookings/components/BookingSummary";
import BookingSeats from "@/features/bookings/components/BookingSeats";
import BookingActions from "@/features/bookings/components/BookingActions";

function MyRideDetails() {
  const { bookingId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["booking-details", bookingId],
    queryFn: () => getBookingDetails(bookingId),
  });

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading ride details…</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load ride details</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Ride details</h1>

        <BookingSummary data={data} />
        <BookingSeats seats={data.seats} />
        <BookingActions
          bookingId={data.booking.bookingId}
          canCancel={data.actions.canCancel}
          totalAmount={data.booking.totalAmount}
        />
      </div>
    </div>
  );
}

export default MyRideDetails;
