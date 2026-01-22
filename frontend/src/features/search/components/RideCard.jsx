import { Car, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RideCard({ ride }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/rides/${ride.rideId}`)}
      className="cursor-pointer"
    >
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition">
        <div className="flex-1">
          {/* Time */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <span>
              {new Date(ride.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <div className="flex-1 h-px bg-gray-300" />
            <span>
              {new Date(ride.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Route */}
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{ride.from.label}</span>
            <span>{ride.to.label}</span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-700">
            <User size={16} />
            <span className="font-medium">{ride.driver.name}</span>
            <span>
              ★ {ride.driver.ratingAvg} ({ride.driver.ratingCount})
            </span>
            <Car size={16} />
            <span>
              {ride.vehicle.brand} {ride.vehicle.model}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className="text-xl font-semibold">₹{ride.pricePerSeat}</div>
          <div className="text-sm text-gray-500">
            {ride.availableSeatCount} seats left
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideCard;
