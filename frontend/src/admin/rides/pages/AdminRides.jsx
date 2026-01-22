import { useQuery } from "@tanstack/react-query";
import { fetchAllRidesAdmin } from "../services/adminRideApi";
import AdminRideTable from "../components/AdminRideTable";

function AdminRides() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-rides"],
    queryFn: fetchAllRidesAdmin,
  });

  if (isLoading) {
    return <div className="p-6">Loading rides…</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">Failed to load rides</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ride Management</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No rides found.</p>
      ) : (
        <AdminRideTable rides={data} />
      )}
    </div>
  );
}

export default AdminRides;
