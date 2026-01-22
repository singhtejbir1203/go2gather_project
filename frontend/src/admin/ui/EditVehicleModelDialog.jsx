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
import { updateVehicleModel } from "../services/adminVehicleModelApi";

function EditVehicleModelDialog({ model }) {
  const [isActive, setIsActive] = useState(model.isActive);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateVehicleModel,
    onSuccess: () =>
      queryClient.invalidateQueries(["vehicle-models", model.brandId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: model._id,
      payload: {
        name: e.target.name.value,
        isActive,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Model</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" defaultValue={model.name} />

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

export default EditVehicleModelDialog;
