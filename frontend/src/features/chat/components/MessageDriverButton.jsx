import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrCreateConversation } from "../services/chatApi";

function MessageDriverButton({ rideId, driverId }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const convo = await getOrCreateConversation(rideId);

    navigate(`/chat/${convo._id}`);
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      <MessageSquare size={18} />
      Message Driver
    </Button>
  );
}

export default MessageDriverButton;
