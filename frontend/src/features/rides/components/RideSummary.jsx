function RideSummary({ ride }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {ride.from.label} → {ride.to.label}
          </h2>
          <p className="text-sm text-gray-600">
            {new Date(ride.startTime).toLocaleString()} •{" "}
            {Math.floor(ride.durationMin)} min
          </p>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold">
            ₹{ride.pricePerSeat} / seat
          </div>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between text-sm">
        <div>
          Driver: <strong>{ride.driver.name}</strong>
          <span className="ml-2 text-gray-600">
            ⭐ {ride.driver.ratingAvg || "New"}
          </span>
        </div>

        <div>
          Vehicle: {ride.vehicle.brand} {ride.vehicle.model}
        </div>
      </div>
    </div>
  );
}

export default RideSummary;
