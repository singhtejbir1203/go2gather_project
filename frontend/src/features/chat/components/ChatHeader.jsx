import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatHeader({ userName }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 p-4 bg-white border-b">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft />
      </button>

      <div>
        <h2 className="text-2xl font-bold">{userName}</h2>
        {/* <p className="text-sm text-gray-500">
          Ask about pickup, luggage, timing
        </p> */}
      </div>
    </div>
  );
}

export default ChatHeader;
