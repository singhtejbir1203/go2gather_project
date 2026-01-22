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
import { updateSeatTemplate } from "../services/adminSeatTemplateApi";

function EditSeatTemplateDialog({ seat }) {
  const [isActive, setIsActive] = useState(seat.isActive);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateSeatTemplate,
    onSuccess: () =>
      queryClient.invalidateQueries(["seat-templates", seat.vehicleTypeId]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      id: seat._id,
      payload: {
        label: e.target.label.value,
        isDriverSeat: e.target.isDriverSeat.checked,
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
          <DialogTitle>Edit Seat</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="label" defaultValue={seat.label} />

          <div className="flex items-center gap-3">
            <Switch name="isDriverSeat" defaultChecked={seat.isDriverSeat} />
            <span>Driver seat</span>
          </div>

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

export default EditSeatTemplateDialog;
