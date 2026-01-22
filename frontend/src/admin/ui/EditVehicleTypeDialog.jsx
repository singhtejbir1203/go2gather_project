import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { updateVehicleType } from "../services/adminVehicleTypeApi";

function EditVehicleTypeDialog({ vehicleType }) {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(vehicleType.isActive);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicle-types"]);
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("isActive", isActive);

    mutation.mutate({
      id: vehicleType._id,
      formData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vehicle Type</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="displayName" defaultValue={vehicleType.displayName} />
          <Input name="description" defaultValue={vehicleType.description} />
          <Input name="image" type="file" accept="image/*" />

          <div className="flex items-center gap-3">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            <span>{isActive ? "Active" : "Disabled"}</span>
          </div>

          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditVehicleTypeDialog;
