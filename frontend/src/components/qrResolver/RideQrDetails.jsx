import { Calendar, MapPin, Clock, Car, Star, User } from "lucide-react";

function RideQrDetails({ ride }) {
  const start = new Date(ride.startTime);
  const end = new Date(ride.endTime);

  return (
    <div className="bg-gray-50 flex justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <h1 className="text-xl font-semibold">Ride Details</h1>
          <p className="text-sm opacity-90">
            Valid till {start.toLocaleDateString()}
          </p>
        </div>

        {/* Route */}
        <div className="p-6 space-y-4 border-b">
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-600 mt-1" size={20} />
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

          <div className="text-sm text-gray-600">
            Distance: <strong>{Math.trunc(ride.distanceKm)} km</strong> •
            Duration: <strong>{Math.trunc(ride.durationMin)} min</strong>
          </div>
        </div>

        {/* Driver */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={22} className="text-gray-500" />
            </div>

            <div>
              <div className="font-semibold">{ride.driverId.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Star size={14} className="text-yellow-500" />
                {ride.driverId.ratingAvg.toFixed(1)} (
                {ride.driverId.ratingCount})
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <div className="p-6 space-y-2 border-b">
          <div className="flex items-center gap-2 text-gray-700">
            {/* <Car size={18} /> */}
            <span className="font-medium">
              {ride.userVehicleId.modelId.brandId.vehicleTypeId.displayName}
            </span>
          </div>

          <div className="text-sm text-gray-600">
            {ride.userVehicleId.modelId.brandId.name}{" "}
            {ride.userVehicleId.modelId.name}
          </div>
          <div className="text-xs text-gray-400">
            Plate: {ride.userVehicleId.plateNumber}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-gray-500">
          This QR code is valid only until the ride date.
        </div>
      </div>
    </div>
  );
}

export default RideQrDetails;
