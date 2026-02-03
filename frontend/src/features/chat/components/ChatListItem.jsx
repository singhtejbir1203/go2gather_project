import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatMessageTime } from "../utils/formatMessageTime";

function ChatListItem({ conversation }) {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  const otherUser = conversation.participants.find((p) => p._id !== user._id);

  if (!conversation.lastMessage) return null;

  return (
    <div
      onClick={() => navigate(`/chats/${conversation._id}/${otherUser.name}`)}
      className="cursor-pointer border rounded-lg p-4 hover:bg-gray-50 flex justify-between items-center"
    >
      <div>
        <div className="font-medium">{otherUser.name}</div>
        <div className="text-sm text-gray-500 truncate">
          {conversation.lastMessage || "Start conversation"}
        </div>
        {conversation.lastMessageAt && (
          <div className="text-xs text-gray-400 mt-1">
            {formatMessageTime(conversation.lastMessageAt)}
          </div>
        )}
      </div>

      {conversation.unreadCount > 0 && (
        <div className="bg-[#054752] text-white text-xs px-2 py-1 rounded-full">
          {conversation.unreadCount}
        </div>
      )}
    </div>
  );
}

export default ChatListItem;
