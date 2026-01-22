import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

function PassengerSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#054752] font-medium cursor-pointer"
      >
        {value} passenger{value > 1 ? "s" : ""}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-4 right-0 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-[#054752] font-bold text-lg">Passenger</span>
            <div className="flex items-center gap-4">
              <button
                disabled={value <= 1}
                onClick={() => onChange(value - 1)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  value <= 1
                    ? "border-gray-200 text-gray-300"
                    : "border-[#00AFF5] text-[#00AFF5] hover:bg-blue-50"
                }`}
              >
                <Minus size={18} />
              </button>

              <span className="text-xl font-bold w-4 text-center">{value}</span>

              <button
                disabled={value >= 8}
                onClick={() => onChange(value + 1)}
                className="w-8 h-8 rounded-full border border-[#00AFF5] text-[#00AFF5] flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PassengerSelect;
