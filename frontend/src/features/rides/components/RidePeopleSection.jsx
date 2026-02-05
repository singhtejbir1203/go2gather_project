import RidePersonCard from "./RidePersonCard";

function RidePeopleSection({ driver, passengers }) {
  if (!driver && passengers.length < 1) return null;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h2 className="text-lg font-semibold">People on this ride</h2>

      {/* Driver */}
      {driver && <RidePersonCard userData={driver} role="Driver" />}

      {/* Passengers */}
      {passengers.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-gray-600">Passengers</h3>

          <div className="space-y-2">
            {passengers.map((p) => (
              <RidePersonCard key={p._id} userData={p} role={"Passenger"} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default RidePeopleSection;
