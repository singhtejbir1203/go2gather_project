import { User } from "lucide-react";
import { Link } from "react-router-dom";

function PublicationSeats({ seats }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold mb-4">Seat status</h2>

      <div className="grid grid-cols-4 gap-3">
        {seats.map((seat) => (
          <div
            key={seat.seatId}
            className={`border rounded p-3 text-sm ${
              seat.isBooked
                ? "bg-red-50 border-red-300"
                : "bg-green-50 border-green-300"
            }`}
          >
            <div className="font-medium">{seat.label}</div>

            {seat.isBooked ? (
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                Booked by{" "}
                <Link
                  to={`/users/${seat.bookedBy._id}`}
                  className="flex items-center font-bold text-sm"
                >
                  <User size={18} />
                  {seat.bookedBy.name}
                </Link>
              </div>
            ) : (
              <div className="text-xs text-gray-600 mt-1">Vacant</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicationSeats;
