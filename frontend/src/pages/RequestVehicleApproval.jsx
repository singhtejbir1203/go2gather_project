import VehicleApprovalForm from "@/features/vehicles/VehicleApprovalForm";
import { useParams } from "react-router-dom";

function RequestVehicleApproval() {
  const { vehicleTypeId } = useParams();

  return (
    <div className="max-w-xl mx-auto py-10">
      <VehicleApprovalForm vehicleTypeId={vehicleTypeId} />
    </div>
  );
}

export default RequestVehicleApproval;
