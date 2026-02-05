import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function BookingSeats({ seats }) {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  if (seats.length === 0) return null;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold mb-4">Ride Seats</h2>

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
                {user._id == seat.bookedBy._id ? (
                  <div className="font-bold text-sm">You</div>
                ) : (
                  <button
                    className="flex items-center text-sm font-bold text-gray-600 hover:text-blue-600"
                    onClick={() => {
                      navigate(`/users/${seat.bookedBy._id}`);
                    }}
                  >
                    <User size={18} />
                    {seat.bookedBy.name}
                  </button>
                )}
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

export default BookingSeats;
