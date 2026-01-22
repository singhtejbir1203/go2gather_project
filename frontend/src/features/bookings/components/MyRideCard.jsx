import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, User } from "lucide-react";

function MyRideCard({ booking }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/my-rides/${booking.bookingId}`)}
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            {new Date(booking.startTime).toLocaleDateString()} •{" "}
            {new Date(booking.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          <div className="mt-2 flex items-start gap-2">
            <MapPin size={16} className="mt-1 text-gray-400" />
            <div>
              <div className="font-medium">
                {booking.from} → {booking.to}
              </div>
              <div className="font-medium"></div>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <User size={16} />
            {booking.driverName}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-medium">{booking.vehicleLabel}</div>

          <div
            className={`mt-1 text-xs font-semibold ${
              booking.status === "cancelled" ? "text-red-500" : "text-green-600"
            }`}
          >
            {booking.status.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyRideCard;
