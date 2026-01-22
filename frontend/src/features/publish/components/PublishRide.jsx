import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteStep from "./RouteStep";
import VehicleStep from "@/features/publish/components/VehicleStep";
import ScheduleAndSeatsStep from "@/features/publish/components/ScheduleAndSeatsStep";
import PublishSuccess from "@/features/publish/components/PublishSuccess";
import PriceStep from "@/features/publish/components/PriceStep";
import api from "@/services/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function PublishRide() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [scheduleAndSeats, setScheduleAndSeats] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedRideId, setPublishedRideId] = useState(null);

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleBack = () => {
    if (step === 0) {
      navigate("/");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  if (isPublished) {
    return <PublishSuccess rideId={publishedRideId} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="max-w-5xl mx-auto px-4">
          {step === 0 && (
            <VehicleStep
              onSelect={(v) => {
                setVehicle(v);
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <RouteStep
              onNext={(data) => {
                setRouteData(data);
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <ScheduleAndSeatsStep
              vehicle={vehicle}
              onNext={(data) => {
                setScheduleAndSeats(data);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <PriceStep
              isSubmitting={isSubmitting}
              onPublish={async (pricePerSeat) => {
                try {
                  setError(null);
                  setIsSubmitting(true);

                  const payload = {
                    userVehicleId: vehicle._id,
                    from: routeData.from,
                    to: routeData.to,
                    stops: routeData.stops,
                    startTime: scheduleAndSeats.schedule.startTime,
                    pricePerSeat,
                    availableSeats: scheduleAndSeats.seats,
                  };
                  const res = await api.post("/rides", payload);
                  setPublishedRideId(res.data.rideId);
                  setIsPublished(true);
                } catch (err) {
                  const message =
                    err?.response?.data?.message ||
                    "Something went wrong. Please try again.";

                  setError(message);
                } finally {
                  setIsSubmitting(false);
                }
              }}
            />
          )}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unable to publish ride</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublishRide;
