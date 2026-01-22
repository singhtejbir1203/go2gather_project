import api from "../../../services/api";

export const previewRoute = async (data) => {
  const response = await api.post("/routes/preview", data);
  return response.data;
};
