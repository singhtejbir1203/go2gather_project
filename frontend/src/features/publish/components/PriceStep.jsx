import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

function PriceStep({ onPublish, isSubmitting }) {
  const [price, setPrice] = useState(100);

  const increase = () => setPrice((p) => p + 10);
  const decrease = () => setPrice((p) => (p > 10 ? p - 10 : p));

  return (
    <div className="bg-white rounded-xl p-8 max-w-50 mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-2">Set price per seat</h2>
      <p className="text-gray-500 mb-8">
        Choose a fair price for your passengers
      </p>

      {/* Price selector */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <button
          onClick={decrease}
          className="h-12 w-12 rounded-full border flex items-center justify-center hover:border-primary transition"
        >
          <Minus />
        </button>

        <div className="text-4xl font-bold">₹{price}</div>

        <button
          onClick={increase}
          className="h-12 w-12 rounded-full border flex items-center justify-center hover:border-primary transition"
        >
          <Plus />
        </button>
      </div>

      <Button
        className="w-full bg-[#00AFF5] hover:bg-[#008ec7] h-12 text-lg rounded-xl transition-all"
        disabled={isSubmitting}
        onClick={() => onPublish(price)}
      >
        {isSubmitting ? "Publishing..." : "Publish Ride"}
      </Button>
    </div>
  );
}

export default PriceStep;
