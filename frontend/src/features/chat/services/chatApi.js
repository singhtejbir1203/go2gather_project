import api from "@/services/api";

export const getOrCreateConversation = async (rideId) => {
  const { data } = await api.post("/chat/conversation", { rideId });
  return data;
};

export const getConversationMessages = async (conversationId) => {
  const { data = [] } = await api.get(`/chat/messages/${conversationId}`);
  return data;
};
