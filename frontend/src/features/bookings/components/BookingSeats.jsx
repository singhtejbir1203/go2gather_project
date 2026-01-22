function BookingSeats({ seats }) {
  if (seats.length === 0) return null;
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-semibold mb-3">Your seats</h2>

      <div className="flex flex-wrap gap-2">
        {seats.map((seat) => (
          <span
            key={seat.code}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {seat.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BookingSeats;
