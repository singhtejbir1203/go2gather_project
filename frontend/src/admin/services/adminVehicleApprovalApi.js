import api from "@/services/api";

export const fetchPendingVehicles = async () => {
  const { data } = await api.get("/admin/vehicles/pending");
  return data;
};

export const approveVehicle = async (vehicleId) => {
  const { data } = await api.put(`/admin/vehicles/${vehicleId}/approve`);
  return data;
};

export const rejectVehicle = async (vehicleId) => {
  const { data } = await api.put(`/admin/vehicles/${vehicleId}/reject`);
  return data;
};
