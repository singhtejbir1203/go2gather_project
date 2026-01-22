import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyPublishedRides } from "@/features/rides/services/rideDetailsApi";
import MyPublications from "@/features/rides/pages/MyPublications";
import MyBookings from "@/features/bookings/pages/MyBookings";

function MyRides() {
  const [tab, setTab] = useState("bookings");

  const { data: publications } = useQuery({
    queryKey: ["my-publications"],
    queryFn: getMyPublishedRides,
  });

  const hasPublications = publications && publications.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4 text-2xl font-bold">
          <button
            onClick={() => setTab("bookings")}
            className={`transition ${
              tab === "bookings"
                ? "text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            My Bookings
          </button>

          {hasPublications && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setTab("publications")}
                className={`transition ${
                  tab === "publications"
                    ? "text-black"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                My Publications
              </button>
            </>
          )}
        </div>

        {tab === "bookings" && <MyBookings />}
        {tab === "publications" && <MyPublications />}
      </div>
    </div>
  );
}

export default MyRides;
