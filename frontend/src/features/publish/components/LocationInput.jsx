import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../services/locationApi";
import { Input } from "@/components/ui/input";

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
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && data.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow-sm max-h-60 overflow-auto">
          {data.map((place, idx) => (
            <div
              key={idx}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
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
