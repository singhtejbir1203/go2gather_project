import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMyPublishedRideDetails } from "../services/rideDetailsApi";
import PublicationSeats from "../components/PublicationSeats";
import PublicationActions from "../components/PublicationActions";
import PublicationSummary from "../components/PublicationSummary";

function MyPublicationDetails() {
  const { rideId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-publication-details", rideId],
    queryFn: () => getMyPublishedRideDetails(rideId),
  });

  if (isLoading) return <div>Loading ride details…</div>;
  if (isError) return <div>Failed to load ride</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Published Ride</h1>

        <PublicationSummary ride={data.ride} vehicle={data.vehicle} />
        <PublicationSeats seats={data.seats} />
        <PublicationActions ride={data.ride} />
      </div>
    </div>
  );
}

export default MyPublicationDetails;
