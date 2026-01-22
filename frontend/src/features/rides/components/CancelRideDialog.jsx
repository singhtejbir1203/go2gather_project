import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

function CancelRideDialog({ open, onClose, onConfirm, loading }) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel this ride?</AlertDialogTitle>

          <AlertDialogDescription className="space-y-2">
            <p>Cancelling this ride will:</p>

            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Cancel the ride permanently</li>
              <li>Refund all booked passengers in full</li>
              <li>Reverse payouts from your Stripe account</li>
              <li>Free this time slot for new rides</li>
            </ul>

            <p className="text-red-600 font-medium pt-2">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Keep ride</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cancel ride
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelRideDialog;
