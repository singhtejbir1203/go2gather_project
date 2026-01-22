import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cancelBookingAdmin } from "../services/adminRideApi";
import AdminConfirmDialog from "./AdminConfirmDialog";

function AdminRideBookingsTable({ bookings, isFutureRide }) {
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelBookingAdmin(selectedBooking),
    onSuccess: () => {
      toast.success("Booking cancelled and refunded");
      queryClient.invalidateQueries();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to cancel booking");
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="font-semibold mb-4">Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <div className="font-medium">{b.userId.name}</div>
              <div className="text-sm text-gray-500">
                ₹{b.totalAmount} • {b.status}
              </div>
            </div>

            {isFutureRide && b.status === "confirmed" && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedBooking(b._id);
                  setOpen(true);
                }}
              >
                Cancel booking
              </Button>
            )}
          </div>
        ))
      )}

      <AdminConfirmDialog
        open={open}
        onClose={setOpen}
        loading={isLoading}
        title="Cancel this booking?"
        description="Passenger will receive a full refund and seats will be freed."
        confirmLabel="Cancel booking"
        onConfirm={() => mutate()}
      />
    </div>
  );
}

export default AdminRideBookingsTable;
