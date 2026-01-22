import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SeatSelector from "./SeatSelector";

function ScheduleAndSeatsStep({ vehicle, onNext }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const formattedDate = date && date.toISOString().split("T")[0];

  // Fetch time slots ONLY after date selection
  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["time-slots", formattedDate],
    queryFn: async () => {
      const res = await api.get(`/time/slots?date=${date}`);
      return res.data;
    },
    enabled: Boolean(formattedDate),
  });

  const handleContinue = () => {
    onNext({
      schedule: {
        date: formattedDate,
        startTime: new Date(time),
      },
      seats: selectedSeats,
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-6">When are you leaving?</h2>

      {/* Calendar */}
      <div className="flex justify-center mb-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            setTime("");
            setSelectedSeats([]);
          }}
          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>

      {/* Time selection */}
      {formattedDate && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select departure time
          </label>

          {isLoading ? (
            <p className="text-sm text-gray-500">Loading available times…</p>
          ) : (
            <select
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                setSelectedSeats([]);
              }}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select time</option>
              {slots.map((slot, idx) => (
                <option key={idx} value={slot}>
                  {new Date(slot).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {formattedDate && time && (
        <SeatSelector
          vehicle={vehicle}
          selectedSeats={selectedSeats}
          onChange={setSelectedSeats}
        />
      )}

      <Button
        className="w-full bg-[#00AFF5] mt-4 hover:bg-[#008ec7] h-12 text-lg rounded-xl transition-all"
        disabled={!formattedDate || !time || selectedSeats.length === 0}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}

export default ScheduleAndSeatsStep;
