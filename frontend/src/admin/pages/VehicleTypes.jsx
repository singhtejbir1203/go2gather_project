import { useQuery } from "@tanstack/react-query";
import VehicleTypeTable from "../ui/VehicleTypeTable";
import CreateVehicleTypeDialog from "../ui/CreateVehicleTypeDialog";
import { fetchVehicleTypes } from "../services/adminVehicleTypeApi";

function VehicleTypes() {
  const { data, isLoading } = useQuery({
    queryKey: ["vehicle-types"],
    queryFn: fetchVehicleTypes,
  });

  if (isLoading) {
    return <div>Loading vehicle types...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vehicle Types</h1>
        <CreateVehicleTypeDialog />
      </div>

      <VehicleTypeTable vehicleTypes={data} />
    </div>
  );
}

export default VehicleTypes;
