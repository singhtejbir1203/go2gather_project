import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrCreateConversation } from "@/features/chat/services/chatApi";

function RidePersonCard({ userData, role }) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  const handleChat = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const convo = await getOrCreateConversation({ userId: userData._id });

    navigate(`/chats/${convo._id}/${userData.name}`);

    // navigate(`/chats/new?userId=${user._id}`);
  };
  // if (user?._id == userData._id) return null;

  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <div className="font-medium">{userData.name}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
      {user?._id != userData._id && (
        <Button size="sm" variant="outline" onClick={handleChat}>
          <MessageCircle className="h-4 w-4 mr-1" />
          Chat
        </Button>
      )}
    </div>
  );
}

export default RidePersonCard;
