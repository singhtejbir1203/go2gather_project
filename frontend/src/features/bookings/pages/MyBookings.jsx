import { useQuery } from "@tanstack/react-query";
import MyRideCard from "../components/MyRideCard";
import { getMyBookings } from "../services/bookingApi";

function MyBookings() {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: getMyBookings,
  });

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading your bookings…</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load bookings</div>;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-10 text-center text-gray-600">
        <h2 className="text-lg font-semibold mb-2">No bookings yet</h2>
        <p>Once you book a ride, it will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <MyRideCard key={booking.bookingId} booking={booking} />
      ))}
    </div>
  );
}

export default MyBookings;
