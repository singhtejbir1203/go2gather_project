import { Calendar, MapPin, User, Car } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function BookingSummary({ data }) {
  const { ride, driver, vehicle, booking } = data;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between space-y-4">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} />
            <span>
              {new Date(ride.startTime).toLocaleDateString()} •{" "}
              {new Date(ride.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-gray-400 mt-1" size={18} />
            <div>
              <div className="font-medium">
                {ride.from.label} → {ride.to.label}
              </div>
            </div>
          </div>
          <button
            className="flex items-center gap-3 text-sm font-bold text-gray-600 hover:text-blue-600"
            onClick={() => {
              navigate(`/users/${driver._id}`);
            }}
          >
            <User size={18} />
            {driver.name} ({driver.ratingAvg.toFixed(1)}★)
          </button>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Car size={16} />
            {vehicle.brand} {vehicle.model}
          </div>

          <div className="text-sm font-medium">
            Total paid: ₹{booking.totalAmount}
          </div>
        </div>
        <div
          className={`mt-1 text-xs font-semibold ${
            booking.status === "cancelled" ? "text-red-500" : "text-green-600"
          }`}
        >
          {booking.status.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;
