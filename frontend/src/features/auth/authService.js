import api from "../../services/api";

export const loginUserApi = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const registerUserApi = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
