import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { useQuery } from "@tanstack/react-query";
import { getConversationMessages } from "../services/chatApi";

function ChatPage() {
  const { conversationId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: getConversationMessages(conversationId),
  });
  if (isLoading) return <div>Loading Chat...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList />
      </div>

      <div className="border-t bg-white p-4">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatPage;
