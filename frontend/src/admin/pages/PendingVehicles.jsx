import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  approveVehicle,
  fetchPendingVehicles,
  rejectVehicle,
} from "../services/adminVehicleApprovalApi";
import PendingVehicleCard from "../ui/PendingVehicleCard";

function PendingVehicles() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["pending-vehicles"],
    queryFn: fetchPendingVehicles,
  });

  const approveMutation = useMutation({
    mutationFn: approveVehicle,
    onSuccess: () => queryClient.invalidateQueries(["pending-vehicles"]),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectVehicle,
    onSuccess: () => queryClient.invalidateQueries(["pending-vehicles"]),
  });

  if (isLoading) return <div>Loading approvals...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pending Vehicle Approvals</h1>

      <div className="grid gap-6">
        {data.length === 0 ? (
          <p className="text-gray-600">No pending requests.</p>
        ) : (
          data.map((vehicle) => (
            <PendingVehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onApprove={() => approveMutation.mutate(vehicle._id)}
              onReject={() => rejectMutation.mutate(vehicle._id)}
              approving={approveMutation.isLoading}
              rejecting={rejectMutation.isLoading}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PendingVehicles;
