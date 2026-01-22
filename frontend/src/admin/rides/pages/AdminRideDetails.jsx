import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRideDetailsAdmin } from "../services/adminRideApi";
import AdminRideBookingsTable from "../components/AdminRideBookingsTable";
import AdminRideSummary from "../components/AdminRideSummary";
import AdminCancelRide from "../components/AdminCancelRide";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function AdminRideDetails() {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-ride", rideId],
    queryFn: () => fetchRideDetailsAdmin(rideId),
  });

  if (isLoading) return <div>Loading ride…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => navigate("/admin/rides")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-2xl font-bold">Ride Details</h1>
      </div>
      <AdminRideSummary data={data} />

      <AdminRideBookingsTable
        bookings={data.bookings}
        isFutureRide={data.isFutureRide}
      />

      {data.isFutureRide && <AdminCancelRide rideId={rideId} />}
    </div>
  );
}

export default AdminRideDetails;
