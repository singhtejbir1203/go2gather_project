import LocationInput from "./LocationInput";
import { Button } from "@/components/ui/button";

function StopoverInput({ stops, setStops }) {
  const addStop = (place) => {
    setStops([...stops, place]);
  };

  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Add stopovers (optional)</h3>

      <LocationInput placeholder="Add a stopover" onSelect={addStop} />

      {stops.length > 0 && (
        <div className="mt-3 space-y-2">
          {stops.map((stop, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <span className="text-sm">{stop.label}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeStop(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StopoverInput;
