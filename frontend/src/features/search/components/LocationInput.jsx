import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "@/features/publish/services/locationApi";

function LocationInput({ placeholder, value, onSelect }) {
  const [query, setQuery] = useState(value?.label || "");
  const [open, setOpen] = useState(false);

  const { data = [] } = useQuery({
    queryKey: ["location-search", query],
    queryFn: () => searchLocations(query),
    enabled: query.length > 2,
  });

  const handleSelect = (place) => {
    setQuery(place.label);
    setOpen(false);
    onSelect(place);
  };

  return (
    <div className="relative w-full">
      <input
        placeholder={placeholder}
        value={query}
        className="w-full bg-transparent outline-none text-[#054752] font-medium placeholder-gray-400 h-full"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && data.length > 0 && (
        <div className="absolute z-50 mt-4 left-[-40px] w-[300px] bg-white border border-gray-100 rounded-xl shadow-2xl max-h-80 overflow-auto py-2">
          {data.map((place, idx) => (
            <div
              key={idx}
              className="px-5 py-3 cursor-pointer hover:bg-blue-50 text-[#054752] font-medium transition-colors"
              onClick={() => handleSelect(place)}
            >
              {place.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationInput;
