import { useQuery } from "@tanstack/react-query";
import ChatListItem from "../components/ChatListItem";
import { getMyConversations } from "../services/chatApi";

function ChatsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-conversations"],
    queryFn: getMyConversations,
  });

  if (isLoading) return <div>Loading chats...</div>;

  if (!data?.length) {
    return <div className="text-center mt-10">No conversations yet</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-2">
      <h2 className="text-4xl text-[#054752] font-semibold mb-4">
        Conversations
      </h2>
      {data.map((conv) => (
        <ChatListItem key={conv._id} conversation={conv} />
      ))}
    </div>
  );
}

export default ChatsPage;
