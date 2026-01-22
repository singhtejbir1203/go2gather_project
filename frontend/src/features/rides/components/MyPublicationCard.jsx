import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

function MyPublicationCard({ ride }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/my-publications/${ride.rideId}`)}
      className="cursor-pointer bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="font-semibold">
            {ride.from} → {ride.to}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            {new Date(ride.startTime).toLocaleString()}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            {ride.bookedSeats}/{ride.totalSeats} seats booked
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

export default MyPublicationCard;
