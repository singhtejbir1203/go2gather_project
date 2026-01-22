import { useQuery } from "@tanstack/react-query";
import { getMyPublishedRides } from "../services/rideDetailsApi";
import MyPublicationCard from "../components/MyPublicationCard";

function MyPublications() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-publications"],
    queryFn: getMyPublishedRides,
  });

  if (isLoading) {
    return <div className="text-gray-500">Loading your publications…</div>;
  }

  if (isError) {
    return <div className="text-red-500">Failed to load publications</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-xl font-semibold mb-2">
          You haven’t published any rides yet
        </h2>
        <p>Publish a ride to see it here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((ride) => (
        <MyPublicationCard key={ride.rideId} ride={ride} />
      ))}
    </div>
  );
}

export default MyPublications;
