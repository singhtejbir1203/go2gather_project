import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMessages,
  sendMessage,
  markConversationAsRead,
} from "../services/chatApi";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import { getSocket } from "@/socket/socket";

function ChatWindowPage() {
  const socket = getSocket();

  const bottomRef = useRef(null);

  const { conversationId, user } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (conversationId && socket) {
      socket.emit("mark_read", { conversationId });
    }
  }, [conversationId]);

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join_conversation", conversationId);

    const handleMessage = (newMessage) => {
      if (newMessage.conversationId === conversationId) {
        setMessages((prev) => [...prev, newMessage]);

        socket.emit("mark_read", {
          conversationId,
        });
      }
    };

    socket.on("new_message", handleMessage);

    return () => {
      socket.off("new_message", handleMessage);
    };
  }, [conversationId, socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { data } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data, conversationId]);

  // const sendMutation = useMutation({
  //   mutationFn: sendMessage,
  //   onSuccess: () => setMessage(""),
  // });

  const handleSend = () => {
    if (!message.trim() || !socket) return;

    socket.emit("send_message", {
      conversationId,
      text: message,
    });

    setMessage("");
  };

  if (!conversationId) return <div>Opening chat...</div>;

  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex flex-col border rounded-lg mt-5">
      <ChatHeader userName={user} />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t p-3 flex gap-2">
        <textarea
          className="flex-1 border rounded px-3 py-2 resize-none"
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
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
