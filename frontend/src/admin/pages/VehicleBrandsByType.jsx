import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VehicleBrandTable from "../ui/VehicleBrandTable";
import CreateVehicleBrandDialog from "../ui/CreateVehicleBrandDialog";
import { fetchVehicleBrands } from "../services/adminVehicleBrandApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function VehicleBrandsByType() {
  const { vehicleTypeId, vehicleTypeName } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle-brands", vehicleTypeId],
    queryFn: () => fetchVehicleBrands(vehicleTypeId),
  });

  if (isLoading) return <div>Loading brands...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => navigate("/admin/vehicle-types")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-2xl font-bold">{vehicleTypeName} Brands</h1>
      </div>

      <CreateVehicleBrandDialog vehicleTypeId={vehicleTypeId} />

      <VehicleBrandTable brands={data} />
    </div>
  );
}

export default VehicleBrandsByType;
