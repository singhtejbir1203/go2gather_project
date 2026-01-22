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
import { createSeatTemplate } from "../services/adminSeatTemplateApi";

function CreateSeatTemplateDialog({ vehicleTypeId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSeatTemplate,
    onSuccess: () =>
      queryClient.invalidateQueries(["seat-templates", vehicleTypeId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    mutation.mutate({
      vehicleTypeId,
      seatCode: form.seatCode.value,
      label: form.label.value,
      isDriverSeat: form.isDriverSeat.checked,
    });

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Seat</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Seat Template</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="seatCode" placeholder="Seat Code (e.g. FL)" required />
          <Input name="label" placeholder="Label" required />

          <div className="flex items-center gap-3">
            <Switch name="isDriverSeat" />
            <span>Driver seat</span>
          </div>

          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSeatTemplateDialog;
