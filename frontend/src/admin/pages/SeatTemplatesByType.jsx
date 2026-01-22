import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SeatTemplateTable from "../ui/SeatTemplateTable";
import CreateSeatTemplateDialog from "../ui/CreateSeatTemplateDialog";
import { fetchSeatTemplates } from "../services/adminSeatTemplateApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function SeatTemplatesByType() {
  const { vehicleTypeId, vehicleTypeName } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["seat-templates", vehicleTypeId],
    queryFn: () => fetchSeatTemplates(vehicleTypeId),
  });

  if (isLoading) return <div>Loading seats...</div>;

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

        <h1 className="text-2xl font-bold">{vehicleTypeName} Seat Templates</h1>
      </div>

      <CreateSeatTemplateDialog vehicleTypeId={vehicleTypeId} />

      <SeatTemplateTable seats={data} />
    </div>
  );
}

export default SeatTemplatesByType;
