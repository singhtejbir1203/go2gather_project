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
import { createVehicleType } from "../services/adminVehicleTypeApi";

function CreateVehicleTypeDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries(["vehicle-types"]);
      setOpen(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Vehicle Type</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Vehicle Type</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="key" placeholder="Key (e.g. car)" required />
          <Input name="displayName" placeholder="Display Name" required />
          <Input name="description" placeholder="Description" />
          <Input name="image" type="file" accept="image/*" />

          <Button type="submit" disabled={mutation.isLoading}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateVehicleTypeDialog;
