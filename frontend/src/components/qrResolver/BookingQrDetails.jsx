import { Calendar, MapPin, Clock, User, Car, CheckCircle } from "lucide-react";

function BookingQrDetails({ booking, seats }) {
  const ride = booking.rideId;
  const passenger = booking.userId;

  const start = new Date(ride.startTime);

  return (
    <div className="bg-gray-50 flex justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center gap-2">
            <CheckCircle />
            <h1 className="text-xl font-semibold">Booking Confirmed</h1>
          </div>
          <p className="text-sm opacity-90">
            Valid till {start.toLocaleDateString()}
          </p>
        </div>

        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <User className="text-gray-500" />
            <div>
              <div className="text-sm text-gray-500">Passenger</div>
              <div className="font-semibold">{passenger.name}</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 border-b">
          <div className="flex items-start gap-3">
            <MapPin className="text-green-600 mt-1" size={20} />
            <div>
              <div className="font-medium">{ride.from.label}</div>
              <div className="text-gray-400 text-sm">to</div>
              <div className="font-medium">{ride.to.label}</div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {start.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-b">
          <div className="text-sm font-medium mb-2">Seats Booked</div>
          <div className="flex flex-wrap gap-2">
            {seats.map((seat) => (
              <span
                key={seat._id}
                className="px-3 py-1 rounded-full bg-gray-100 text-sm"
              >
                {seat.seatTemplateId.label}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 border-b space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Car size={18} />
            <span className="font-medium">Driver</span>
          </div>
          <div className="text-sm text-gray-600">{ride.driverId.name}</div>
        </div>

        <div className="p-6">
          <div className="flex justify-between font-semibold">
            <span>Total Paid</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>

        <div className="p-4 text-center text-xs text-gray-500">
          Show this QR when requested during the ride.
        </div>
      </div>
    </div>
  );
}

export default BookingQrDetails;
