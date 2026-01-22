import api from "@/services/api";

export const fetchSeatTemplates = async (vehicleTypeId) => {
  const { data } = await api.get(`/admin/seat-templates/${vehicleTypeId}`);
  return data;
};

export const createSeatTemplate = async (payload) => {
  const { data } = await api.post("/admin/seat-templates", payload);
  return data;
};

export const updateSeatTemplate = async ({ id, payload }) => {
  const { data } = await api.put(`/admin/seat-templates/${id}`, payload);
  return data;
};

export const deleteSeatTemplate = async (id) => {
  const { data } = await api.delete(`/admin/seat-templates/${id}`);
  return data;
};
