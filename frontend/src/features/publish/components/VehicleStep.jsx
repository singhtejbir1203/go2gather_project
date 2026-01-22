import { useQuery } from "@tanstack/react-query";
import {
  fetchApprovedVehicles,
  fetchApprovedVehicleTypes,
} from "../services/userVehicleApi";
import ApprovedVehicleCard from "./ApprovedVehicleCard";
import RequestVehicleApprovalCard from "./RequestVehicleApprovalCard";

function VehicleStep({ onSelect }) {
  const { data: vehicles = [] } = useQuery({
    queryKey: ["approved-vehicles"],
    queryFn: fetchApprovedVehicles,
  });

  const { data: approvedTypes = [] } = useQuery({
    queryKey: ["approved-vehicle-types"],
    queryFn: fetchApprovedVehicleTypes,
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold">Select Approved Vehicle</h2>

          {vehicles.length === 0 ? (
            <div className="bg-white rounded-lg p-6 text-gray-600 text-sm border">
              No approved vehicles yet.
            </div>
          ) : (
            vehicles.map((vehicle) => (
              <ApprovedVehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onSelect={() => onSelect(vehicle)}
              />
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Request Approval</h2>

          <RequestVehicleApprovalCard approvedTypes={approvedTypes} />
        </div>
      </div>
    </div>
  );
}

export default VehicleStep;
