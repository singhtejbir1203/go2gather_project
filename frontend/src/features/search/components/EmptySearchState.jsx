import { MapPin } from "lucide-react";

function EmptySearchState() {
  return (
    <div className="max-w-3xl mx-auto mt-16 text-center bg-white p-10 rounded-xl shadow-sm">
      <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />

      <h2 className="text-2xl font-semibold">Where are you going?</h2>

      <p className="mt-2 text-gray-600">
        Enter your departure and destination to see available rides.
      </p>
    </div>
  );
}

export default EmptySearchState;
