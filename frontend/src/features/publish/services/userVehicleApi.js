import api from "@/services/api";

export const fetchApprovedVehicles = async () => {
  const { data } = await api.get("/vehicles/approved");
  return data;
};

export const fetchApprovedVehicleTypes = async () => {
  const { data } = await api.get("/vehicles/approved/types");
  return data;
};

export const requestVehicleApproval = async (formData) => {
  const { data } = await api.post("/vehicles/request-approval", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
