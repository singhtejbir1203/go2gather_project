import api from "@/services/api";

export const fetchVehicleBrands = async (vehicleTypeId) => {
  const { data } = await api.get(`/admin/vehicle-brands/${vehicleTypeId}`);
  return data;
};

export const createVehicleBrand = async (payload) => {
  const { data } = await api.post("/admin/vehicle-brands", payload);
  return data;
};

export const updateVehicleBrand = async ({ id, payload }) => {
  const { data } = await api.put(`/admin/vehicle-brands/${id}`, payload);
  return data;
};
