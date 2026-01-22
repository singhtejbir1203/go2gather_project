import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { previewRoute } from "../services/routeApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RouteMap from "./RouteMap";
import StopoverInput from "./StopoverInput";
import LocationInput from "@/features/search/components/LocationInput";

function RouteStep({ onNext }) {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [stops, setStops] = useState([]);

  const routeQuery = useQuery({
    queryKey: ["route-preview", from, to, stops],
    queryFn: () =>
      previewRoute({
        from: { lat: from.lat, lng: from.lng },
        to: { lat: to.lat, lng: to.lng },
        stops: stops.map((s) => ({
          lat: s.lat,
          lng: s.lng,
        })),
      }),
    enabled: Boolean(from && to && stops),
  });

  const handleNext = () => {
    onNext({
      ...routeQuery.data,
      from,
      to,
      stops,
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-[#054752] font-semibold mb-6">
        Where are you going?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-3 rounded">
          <LocationInput
            placeholder="Leaving from"
            onSelect={(place) => setFrom(place)}
          />
        </div>
        <div className="border p-3 rounded">
          <LocationInput
            placeholder="Going to"
            onSelect={(place) => setTo(place)}
          />
        </div>
      </div>
      {from && to && <StopoverInput stops={stops} setStops={setStops} />}

      <div className="mt-6 flex gap-4">
        {routeQuery.data && (
          <Button
            className="w-full bg-[#00AFF5] hover:bg-[#008ec7] h-12 text-lg rounded-xl transition-all"
            onClick={handleNext}
          >
            Continue
          </Button>
        )}
      </div>

      {routeQuery.isLoading && (
        <p className="mt-4 text-sm text-gray-500">Calculating route…</p>
      )}

      {routeQuery.data && (
        <div className="mt-6 bg-gray-50 p-4 rounded text-sm">
          <p>
            Distance:{" "}
            <strong>{routeQuery.data.distanceKm.toFixed(1)} km</strong>
          </p>
          <p>
            Duration:{" "}
            <strong>{Math.ceil(routeQuery.data.durationMin)} minutes</strong>
          </p>
        </div>
      )}

      {routeQuery.data && <RouteMap geometry={routeQuery.data.geometry} />}
    </div>
  );
}

export default RouteStep;
