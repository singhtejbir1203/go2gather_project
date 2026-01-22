import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

function ApprovedVehicleCard({ vehicle, onSelect }) {
  const vehicleType = vehicle.modelId.brandId.vehicleTypeId;

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm flex justify-between items-center">
      <div className="space-y-2">
        <div className="font-bold text-lg">{vehicleType.displayName}</div>

        <div className="font-semibold">
          {vehicle.modelId.brandId.name} {vehicle.modelId.name}
        </div>

        <div className="text-sm text-gray-600">
          Registration No.: {vehicle.plateNumber}
        </div>

        <Button className="w-full" onClick={onSelect}>
          Use
        </Button>
      </div>

      {vehicleType.imageUrl && (
        <div className="ml-6">
          <div className="flex items-center gap-2 text-green-600 text-sm mb-5">
            <CheckCircle size={16} />
            Approved
          </div>
          <img
            src={`http://localhost:5000${vehicleType.imageUrl}`}
            alt={vehicleType.displayName}
            className="h-20 w-28 object-contain opacity-90"
          />
        </div>
      )}
    </div>
  );
}

export default ApprovedVehicleCard;
