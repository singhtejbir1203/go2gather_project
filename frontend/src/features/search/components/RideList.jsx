import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchRides } from "../services/rideSearchApi";
import RideCard from "./RideCard";
import { useSearchFilters } from "../context/SearchFilterContext";

function RideList() {
  const params = useParams();
  const { sortBy, timeFilters, verifiedOnly } = useSearchFilters();

  const queryParams = {
    fromLat: params.fromLat,
    fromLng: params.fromLng,
    toLat: params.toLat,
    toLng: params.toLng,
    date: params.date,
    passengers: params.passengers,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search-rides", queryParams],
    queryFn: () => searchRides(queryParams),
    enabled: Boolean(queryParams.fromLat && queryParams.toLat),
  });

  if (isLoading) return <p className="text-gray-500">Searching rides…</p>;
  if (isError) return <p className="text-red-500">Failed to load rides</p>;
  if (!data || data.length === 0)
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-600">No rides found for this route.</p>
      </div>
    );

  let rides = [...data];

  rides = rides.filter((ride) => {
    const hour = new Date(ride.startTime).getHours();

    if (timeFilters.noonToEvening && (hour < 12 || hour >= 18)) return false;
    if (timeFilters.afterEvening && hour < 18) return false;

    return true;
  });

  if (verifiedOnly) {
    rides = rides.filter((r) => r.driver.ratingCount > 0);
  }

  rides.sort((a, b) => {
    if (sortBy === "earliest")
      return new Date(a.startTime) - new Date(b.startTime);

    if (sortBy === "lowestPrice") return a.pricePerSeat - b.pricePerSeat;

    if (sortBy === "shortest") return a.durationMin - b.durationMin;

    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        {rides.length} rides available
      </div>

      {rides.map((ride) => (
        <RideCard key={ride.rideId} ride={ride} />
      ))}
    </div>
  );
}

export default RideList;
