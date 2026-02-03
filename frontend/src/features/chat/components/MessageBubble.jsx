import { useSelector } from "react-redux";
import { formatMessageTime } from "../utils/formatMessageTime";

function MessageBubble({ message }) {
  const { user } = useSelector((s) => s.auth);
  const isMe = message.senderId === user._id;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMe ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.text}
        <div
          className={`text-[10px] mt-1 text-right
          ${isMe ? "text-gray-200" : "text-gray-500"}`}
        >
          {formatMessageTime(message.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
