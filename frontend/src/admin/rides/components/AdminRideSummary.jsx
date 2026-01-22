import { Calendar, MapPin, User, Car, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function AdminRideSummary({ data }) {
  const isCancelled = data.ride.status === "cancelled";

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {data.ride.from.label} → {data.ride.to.label}
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Calendar size={16} />
            <span>
              {new Date(data.ride.startTime).toLocaleDateString()} •{" "}
              {new Date(data.ride.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        <Badge variant={isCancelled ? "destructive" : "default"}>
          {data.ride.status.toUpperCase()}
        </Badge>
      </div>

      <div className="flex items-start gap-3 text-sm">
        <MapPin className="text-gray-400 mt-1" size={18} />
        <div>
          <div className="font-medium">{data.ride.from.label}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        <User size={16} />
        <span className="font-medium">{data.ride.driverId.name}</span>
        <span className="text-gray-500">({data.ride.driverId.email})</span>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-700">
        <Car size={16} />
        <span>
          {data.ride.userVehicleId.modelId.brandId.name}{" "}
          {data.ride.userVehicleId.modelId.name}
        </span>
        <span className="text-gray-500">
          • {data.ride.userVehicleId.plateNumber}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{Math.floor(data.ride.durationMin)} min</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} />
          <span>
            {data.bookedSeatCount} / {data.totalSeats} booked
          </span>
        </div>

        <div>
          Distance: <strong>{data.ride.distanceKm} km</strong>
        </div>

        <div>
          Price / seat: <strong>₹{data.ride.pricePerSeat}</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminRideSummary;
