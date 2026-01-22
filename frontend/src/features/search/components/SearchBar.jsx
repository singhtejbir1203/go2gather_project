import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Circle } from "lucide-react";
import PassengerSelect from "./PassengerSelect";
import LocationInput from "./LocationInput";

function SearchBar({ initialValues }) {
  const navigate = useNavigate();

  const [from, setFrom] = useState(initialValues?.from || null);
  const [to, setTo] = useState(initialValues?.to || null);
  const [date, setDate] = useState(
    initialValues?.date || new Date().toISOString().split("T")[0]
  );
  const [passengers, setPassengers] = useState(initialValues?.passengers || 1);

  const handleSearch = () => {
    if (!from || !to || !date) return;
    navigate(
      `/search/${from.label}/${from.lat}/${from.lng}/${to.label}/${to.lat}/${to.lng}/${date}/${passengers}`
    );
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl border border-gray-100 items-stretch h-auto md:h-16 w-full max-w-6xl mx-auto">
      {/* Leaving From */}
      <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
        <Circle
          className="text-gray-400 group-hover:text-[#00AFF5] mr-3"
          size={20}
        />
        <div className="flex-1">
          <LocationInput
            placeholder="Leaving from"
            value={from}
            onSelect={setFrom}
          />
        </div>
      </div>

      {/* Going To */}
      <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
        <Circle
          className="text-gray-400 group-hover:text-[#00AFF5] mr-3"
          size={20}
        />
        <div className="flex-1">
          <LocationInput placeholder="Going to" value={to} onSelect={setTo} />
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group relative">
        <Calendar
          className="text-gray-400 group-hover:text-[#00AFF5] mr-3"
          size={20}
        />
        <div className="flex flex-col flex-1">
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none text-[#054752] font-medium placeholder-gray-400 cursor-pointer appearance-none"
          />
        </div>
      </div>

      {/* Passenger Selection */}
      <div className="flex-1 flex items-center px-4 py-3 md:py-0 hover:bg-gray-50 transition-colors cursor-pointer group">
        <User
          className="text-gray-400 group-hover:text-[#00AFF5] mr-3"
          size={20}
        />
        <div className="flex-1">
          <PassengerSelect value={passengers} onChange={setPassengers} />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-[#00AFF5] hover:bg-[#008ec7] text-white px-10 py-4 md:py-0 font-bold text-lg transition-all flex items-center justify-center gap-2 rounded-r-xl"
      >
        <span>Search</span>
      </button>
    </div>
  );
}

export default SearchBar;
