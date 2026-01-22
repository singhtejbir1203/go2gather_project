import api from "@/services/api";

export const fetchVehicleTypes = async () => {
  const { data } = await api.get("/admin/vehicle-types");
  return data;
};

export const createVehicleType = async (formData) => {
  const { data } = await api.post("/admin/vehicle-types", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateVehicleType = async ({ id, formData }) => {
  const { data } = await api.put(`/admin/vehicle-types/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
