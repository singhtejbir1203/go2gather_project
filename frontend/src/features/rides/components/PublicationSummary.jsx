import { Calendar, MapPin, Users, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PublicationSummary({ ride, vehicle }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/my-publications/${ride.rideId}`)}
      className="cursor-pointer bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>
              {new Date(ride.startTime).toLocaleDateString()} •{" "}
              {new Date(ride.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-gray-400 mt-1" />
            <div className="font-medium">
              {ride.from.label} → {ride.to.label}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Car size={16} />
            {vehicle.brand} {vehicle.model}
          </div>

          <div className="text-sm font-medium">
            Price per seat: ₹{ride.pricePerSeat}
          </div>
        </div>

        {ride.status === "cancelled" && (
          <span className="text-xs font-semibold text-red-500">
            {ride.status.toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}

export default PublicationSummary;
