import { useQuery } from "@tanstack/react-query";
import { CheckCircle, MapPin, Clock, IndianRupee } from "lucide-react";
import { fetchRideDetails } from "../services/rideApi";
import Footer from "@/components/layout/Footer";
import { QRCodeCanvas } from "qrcode.react";

function PublishSuccess({ rideId, token }) {
  const qrUrl = `${window.location.origin}/qr/${token}`;
  const { data: ride, isLoading } = useQuery({
    queryKey: ["ride-details", rideId],
    queryFn: () => fetchRideDetails(rideId),
    enabled: !!rideId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading ride details…</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-green-600 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 text-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between gap-6">
            <div className="text-left space-y-2">
              <CheckCircle size={48} className="text-green-600" />
              <h1 className="text-2xl font-bold">
                Ride Published Successfully
              </h1>
              <p className="text-gray-600">
                Your ride is now visible to passengers
              </p>
            </div>

            <div className="flex-shrink-0">
              <QRCodeCanvas value={qrUrl} size={120} />
            </div>
          </div>

          {/* Ride Summary */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-1" />
              <div>
                <div className="font-semibold">{ride?.from.label}</div>
                <div className="text-sm text-gray-500">to {ride?.to.label}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="text-primary" />
              <div className="text-sm">
                {new Date(ride?.startTime).toLocaleString()} –{" "}
                {new Date(ride?.endTime).toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IndianRupee className="text-primary" />
              <div className="text-sm">{ride?.pricePerSeat} per seat</div>
            </div>

            <div className="text-sm text-gray-600">
              Distance: {Math.trunc(ride?.distanceKm)} km
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              You will be notified when passengers book your ride.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PublishSuccess;
