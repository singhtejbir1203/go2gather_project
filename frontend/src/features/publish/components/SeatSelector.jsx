import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

function SeatSelector({ vehicle, selectedSeats, onChange }) {
  const { data: seats } = useQuery({
    queryKey: ["seat-templates", vehicle.modelId.brandId.vehicleTypeId._id],
    queryFn: async () => {
      const { data } = await api.get(
        `/admin/seat-templates/${vehicle.modelId.brandId.vehicleTypeId._id}`
      );
      return data.filter((s) => s.isActive && !s.isDriverSeat);
    },
  });

  const toggleSeat = (seatId) => {
    onChange(
      selectedSeats.includes(seatId)
        ? selectedSeats.filter((s) => s !== seatId)
        : [...selectedSeats, seatId]
    );
  };

  return (
    <div>
      <h3 className="font-semibold mb-3">Select available seats</h3>

      <div className="grid grid-cols-4 gap-3">
        {seats?.map((seat) => (
          <button
            key={seat._id}
            onClick={() => toggleSeat(seat._id)}
            className={`border rounded p-3 text-sm ${
              selectedSeats.includes(seat._id)
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            {seat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SeatSelector;
