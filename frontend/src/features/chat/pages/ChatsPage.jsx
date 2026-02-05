import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatListItem from "../components/ChatListItem";
import { getMyConversations } from "../services/chatApi";
import { getSocket } from "@/socket/socket";

function ChatsPage() {
  const socket = getSocket();
  const [conversations, setConversations] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["my-conversations"],
    queryFn: getMyConversations,
  });

  useEffect(() => {
    if (data) {
      setConversations(data);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    const handleUnreadUpdate = ({ conversationId, message }) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversationId
            ? {
                ...conv,
                unreadCount: (conv.unreadCount || 0) + 1,
              }
            : conv,
        ),
      );
    };

    socket.on("inbox_unread_update", handleUnreadUpdate);

    return () => {
      socket.off("inbox_unread_update", handleUnreadUpdate);
    };
  }, [socket]);

  // clear unread when opening a chat
  // const clearUnread = (conversationId) => {
  //   setConversations((prev) =>
  //     prev.map((conv) =>
  //       conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv,
  //     ),
  //   );
  // };

  if (isLoading) return <div>Loading chats...</div>;

  if (!conversations.length) {
    return <div className="text-center mt-10">No conversations yet</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-2">
      <h2 className="text-4xl text-[#054752] font-semibold mb-4">
        Conversations
      </h2>

      {conversations.map((conv) => (
        <ChatListItem key={conv._id} conversation={conv} />
      ))}
    </div>
  );
}

export default ChatsPage;
