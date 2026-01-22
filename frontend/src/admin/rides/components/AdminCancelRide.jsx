import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelRideAdmin } from "../services/adminRideApi";
import AdminConfirmDialog from "./AdminConfirmDialog";

function AdminCancelRide({ rideId }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelRideAdmin(rideId),
    onSuccess: () => {
      toast.success("Ride cancelled and all refunds processed");
      queryClient.invalidateQueries();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel ride");
    },
  });

  return (
    <>
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="font-semibold text-red-600 mb-2">Cancel Entire Ride</h3>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Cancel ride & refund all
        </Button>
      </div>

      <AdminConfirmDialog
        open={open}
        onClose={setOpen}
        loading={isLoading}
        title="Cancel entire ride?"
        description="All passengers will receive a full refund. This action cannot be undone."
        confirmLabel="Cancel ride"
        onConfirm={() => mutate()}
      />
    </>
  );
}

export default AdminCancelRide;
