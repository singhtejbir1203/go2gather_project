import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRideDetails } from "@/features/rides/services/rideDetailsApi";
import RideSummary from "@/features/rides/components/RideSummary";
import SeatAvailability from "@/features/rides/components/SeatAvailability";
import MessageDriverButton from "@/features/chat/components/MessageDriverButton";
import RidePeopleSection from "@/features/rides/components/RidePeopleSection";

function RideDetails() {
  const { rideId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ride-details", rideId],
    queryFn: () => fetchRideDetails(rideId),
  });

  if (isLoading) return <div>Loading ride...</div>;
  if (isError) return <div>Failed to load ride</div>;

  return (
    <>
      {/* <div className="bg-gray-50 min-h-screen">
        <h2 className="text-4xl text-[#054752] text-center font-semibold">
          Ride Details
        </h2>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <RideSummary ride={data} />
          <SeatAvailability ride={data} />
          <RidePeopleSection
            driver={data.driver}
            passengers={data.passengers}
          />
          <MessageDriverButton rideId={rideId} driverId={data.driverId} /> 
        </div>
      </div> */}
      <div className="bg-gray-50 min-h-screen">
        <h2 className="text-4xl text-[#054752] text-center font-semibold">
          Ride Details
        </h2>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <RideSummary ride={data} />
              <SeatAvailability ride={data} />
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

export default RideDetails;
