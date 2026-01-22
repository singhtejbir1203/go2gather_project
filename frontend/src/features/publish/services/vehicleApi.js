import api from "../../../services/api";

export const getApprovedVehicles = async () => {
  const res = await api.get("/vehicles/approved");
  return res.data;
};

export const requestVehicleApproval = async (formData) => {
  const res = await api.post("/vehicles/request-approval", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getApprovedVehicleTypes = async () => {
  const res = await api.get("/vehicles/approved/types");
  return res.data;
};
