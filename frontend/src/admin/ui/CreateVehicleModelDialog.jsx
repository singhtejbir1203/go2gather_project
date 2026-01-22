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
import { createVehicleModel } from "../services/adminVehicleModelApi";

function CreateVehicleModelDialog({ brandId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVehicleModel,
    onSuccess: () => queryClient.invalidateQueries(["vehicle-models", brandId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      brandId,
      name: e.target.name.value,
    });

    e.target.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Model</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle Model</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Model name" required />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateVehicleModelDialog;
