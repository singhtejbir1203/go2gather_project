import api from "../../../services/api";

export const searchRides = async (params) => {
  const res = await api.get("/rides/search", { params });
  return res.data;
};
