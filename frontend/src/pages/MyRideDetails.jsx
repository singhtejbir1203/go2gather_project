import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "@/features/bookings/services/bookingApi";
import BookingSummary from "@/features/bookings/components/BookingSummary";
import BookingSeats from "@/features/bookings/components/BookingSeats";
import BookingActions from "@/features/bookings/components/BookingActions";
import RidePeopleSection from "@/features/rides/components/RidePeopleSection";

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
    <>
      <div className="bg-gray-50 min-h-screen">
        <h2 className="text-4xl text-[#054752] text-center font-semibold">
          Ride Details
        </h2>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <BookingSummary data={data} />
              <BookingSeats seats={data.seats} />
              <BookingActions
                bookingId={data.booking.bookingId}
                canCancel={data.actions.canCancel}
                totalAmount={data.booking.totalAmount}
              />
            </div>
            <div className="md:col-span-1">
              <RidePeopleSection
                driver={data.driver}
                passengers={data.passengers}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRideDetails;
