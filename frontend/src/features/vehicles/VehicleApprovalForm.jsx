import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchVehicleBrands } from "@/admin/services/adminVehicleBrandApi";
import { fetchVehicleModels } from "@/admin/services/adminVehicleModelApi";
import { requestVehicleApproval } from "../publish/services/userVehicleApi";

function VehicleApprovalForm({ vehicleTypeId }) {
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);

  const { data: brands } = useQuery({
    queryKey: ["vehicle-brands", vehicleTypeId],
    queryFn: () => fetchVehicleBrands(vehicleTypeId),
  });

  const { data: models } = useQuery({
    queryKey: ["vehicle-models", brandId],
    queryFn: () => fetchVehicleModels(brandId),
    enabled: !!brandId,
  });

  const mutation = useMutation({
    mutationFn: requestVehicleApproval,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("modelId", modelId);

    mutation.mutate(formData);
  };

  if (mutation.isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl text-center">
        <h2 className="text-2xl text-green-600 font-bold">
          Request submitted successfully
        </h2>
        <p className="mt-2 text-gray-600">
          Your vehicle will be available for publishing rides once approved by
          admin.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-xl font-bold">Request Vehicle Approval</h1>

      <Select onValueChange={setBrandId}>
        <SelectTrigger>
          <SelectValue placeholder="Select brand" />
        </SelectTrigger>
        <SelectContent>
          {brands?.map((b) => (
            <SelectItem key={b._id} value={b._id}>
              {b.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {brandId && (
        <Select onValueChange={setModelId}>
          <SelectTrigger>
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {models?.map((m) => (
              <SelectItem key={m._id} value={m._id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Input name="plateNumber" placeholder="Plate Number" required />
      <p className="font-semibold">Upload License</p>
      <Input name="license" type="file" accept="image/*,.pdf" required />

      <Button type="submit" disabled={mutation.isLoading}>
        Submit for Approval
      </Button>

      {/* {mutation.isSuccess && (
        <div className="text-green-600 text-sm">
          Vehicle approval request submitted successfully
        </div>
      )} */}
    </form>
  );
}

export default VehicleApprovalForm;
