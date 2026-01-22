import api from "@/services/api";

export const fetchRevenueSummary = async () => {
  const { data } = await api.get("/admin/revenue/summary");
  return data;
};

export const fetchRevenueTimeline = async (range = 30) => {
  const { data } = await api.get(`/admin/revenue/timeline?range=${range}`);
  return data;
};

export const fetchRevenueTransactions = async (page = 1) => {
  const { data } = await api.get(
    `/admin/revenue/transactions?page=${page}&limit=20`
  );
  return data;
};
