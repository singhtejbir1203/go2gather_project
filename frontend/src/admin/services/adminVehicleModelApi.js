import api from "@/services/api";

export const fetchVehicleModels = async (brandId) => {
  const { data } = await api.get(`/admin/vehicle-models/${brandId}`);
  return data;
};

export const createVehicleModel = async (payload) => {
  const { data } = await api.post("/admin/vehicle-models", payload);
  return data;
};

export const updateVehicleModel = async ({ id, payload }) => {
  const { data } = await api.put(`/admin/vehicle-models/${id}`, payload);
  return data;
};
