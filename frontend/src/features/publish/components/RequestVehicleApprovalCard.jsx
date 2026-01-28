import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVehicleTypes } from "@/admin/services/adminVehicleTypeApi";

function RequestVehicleApprovalCard({ approvedTypes }) {
  const navigate = useNavigate();

  const { data: vehicleTypes } = useQuery({
    queryKey: ["vehicle-types"],
    queryFn: fetchVehicleTypes,
  });

  return (
    <div className="border rounded-lg p-5 bg-white">
      <h3 className="font-semibold mb-4">Add vehicle</h3>

      <div className="grid grid-cols-2 gap-4">
        {vehicleTypes?.map((type) => {
          const disabled = approvedTypes.includes(type._id);

          return (
            <div
              key={type._id}
              className={`border rounded-md p-4 text-center ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:border-primary"
              }`}
              onClick={() =>
                !disabled && navigate(`/vehicles/request/${type._id}`)
              }
            >
              {type.imageUrl && (
                <img
                  src={type.imageUrl}
                  alt={type.displayName}
                  className="h-16 mx-auto mb-2 object-contain"
                />
              )}

              <div className="text-sm font-medium">{type.displayName}</div>

              {disabled && (
                <div className="text-xs text-green-600 mt-1">
                  Already approved
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => navigate("/vehicles/request")}
      >
        <Plus size={16} />
        Request vehicle approval
      </Button> */}
    </div>
  );
}

export default RequestVehicleApprovalCard;
