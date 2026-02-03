import { useEffect, useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOrCreateConversation,
  getMessages,
  sendMessage,
  markConversationAsRead,
} from "../services/chatApi";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";

function ChatWindowPage() {
  const { conversationId, user } = useParams();
  //   const [searchParams] = useSearchParams();
  //   const navigate = useNavigate();

  //   const targetUserId = searchParams.get("userId");
  const [message, setMessage] = useState("");

  //   const { mutate: initConversation, data: conversation } = useMutation({
  //     mutationFn: getOrCreateConversation,
  //     onSuccess: (data) => {
  //       console.log(data);
  //       navigate(`/chats/${data._id}`, { replace: true });
  //     },
  //   });

  //   useEffect(() => {
  //     if (!conversationId && targetUserId) {
  //       initConversation({ userId: targetUserId });
  //     }
  //   }, [conversationId, targetUserId]);

  useEffect(() => {
    if (conversationId) {
      markConversationAsRead(conversationId);
    }
  }, [conversationId]);

  const { data: messages, refetch } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });

  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      setMessage("");
      refetch();
    },
  });

  const handleSend = () => {
    if (!message.trim()) return;

    sendMutation.mutate({
      conversationId,
      text: message,
    });
  };

  if (!conversationId) return <div>Opening chat...</div>;

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col border rounded-lg mt-5">
      <ChatHeader userName={user} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-[#054752] text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindowPage;
