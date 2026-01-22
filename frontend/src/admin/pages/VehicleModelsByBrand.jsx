import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import VehicleModelTable from "../ui/VehicleModelTable";
import CreateVehicleModelDialog from "../ui/CreateVehicleModelDialog";
import { fetchVehicleModels } from "../services/adminVehicleModelApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function VehicleModelsByBrand() {
  const { brandId, brandName } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["vehicle-models", brandId],
    queryFn: () => fetchVehicleModels(brandId),
  });

  if (isLoading) return <div>Loading models...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <h1 className="text-2xl font-bold">{brandName} Models</h1>
      </div>

      <CreateVehicleModelDialog brandId={brandId} />

      <VehicleModelTable models={data} />
    </div>
  );
}

export default VehicleModelsByBrand;
