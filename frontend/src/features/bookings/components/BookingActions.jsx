import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking } from "../services/bookingApi";
import { Button } from "@/components/ui/button";
import CancelBookingDialog from "./CancelBookingDialog";

function BookingActions({ bookingId, canCancel, totalAmount }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-bookings"]);
      queryClient.invalidateQueries(["booking-details", bookingId]);
      setOpen(false);
    },
  });

  if (!canCancel) return null;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-end">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Cancel booking
        </Button>
      </div>

      <CancelBookingDialog
        open={open}
        onClose={setOpen}
        onConfirm={() => mutate()}
        loading={isLoading}
        refundAmount={totalAmount}
      />
    </>
  );
}

export default BookingActions;
