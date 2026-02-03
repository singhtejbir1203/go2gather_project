import api from "@/services/api";

export const getOrCreateConversation = async (payload) => {
  const { data } = await api.post("/chat/conversation", payload);
  return data;
};

export const getMyConversations = async () => {
  const { data } = await api.get("/chat/conversations");
  return data;
};

export const getMessages = async (conversationId) => {
  const { data } = await api.get(`/chat/messages/${conversationId}`);
  return data;
};

export const sendMessage = async (payload) => {
  const { data } = await api.post("/chat/message", payload);
  return data;
};

export const markConversationAsRead = async (conversationId) => {
  await api.patch(`/chat/conversations/${conversationId}/read`);
};
