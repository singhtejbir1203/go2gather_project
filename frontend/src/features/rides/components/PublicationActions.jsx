import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { cancelPublishedRide } from "../services/rideDetailsApi";
import CancelRideDialog from "./CancelRideDialog";
import { toast } from "sonner";

function PublicationActions({ ride }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelPublishedRide(ride.rideId),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-publications"]);
      queryClient.invalidateQueries(["my-publication-details", ride.rideId]);
      setOpen(false);
      toast.success("Ride cancelled Successfully");
    },
    onError: () => {
      toast.error("Something went wrong please try again.");
    },
  });

  if (!ride.canCancel) return null;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-end">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Cancel this ride
        </Button>
      </div>

      <CancelRideDialog
        open={open}
        onClose={setOpen}
        onConfirm={() => mutate()}
        loading={isLoading}
      />
    </>
  );
}

export default PublicationActions;
