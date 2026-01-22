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
import { createVehicleBrand } from "../services/adminVehicleBrandApi";

function CreateVehicleBrandDialog({ vehicleTypeId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVehicleBrand,
    onSuccess: () =>
      queryClient.invalidateQueries(["vehicle-brands", vehicleTypeId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      vehicleTypeId,
      name: e.target.name.value,
    });

    e.target.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Brand</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle Brand</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Brand name" required />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateVehicleBrandDialog;
