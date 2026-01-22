import { useQuery } from "@tanstack/react-query";
import {
  fetchRevenueSummary,
  fetchRevenueTimeline,
  fetchRevenueTransactions,
} from "../services/revenueApi";
import RevenueKpiCards from "../components/RevenueKpiCards";
import RevenueChart from "../components/RevenueChart";
import ExportButton from "../components/ExportButton";
import RevenueTable from "../components/RevenueTable";

export default function RevenueDashboard() {
  const { data: summary } = useQuery({
    queryKey: ["revenue-summary"],
    queryFn: fetchRevenueSummary,
    staleTime: 60 * 1000,
  });

  const { data: timeline } = useQuery({
    queryKey: ["revenue-timeline"],
    queryFn: () => fetchRevenueTimeline(30),
    staleTime: 60 * 1000,
  });

  const { data: transactions } = useQuery({
    queryKey: ["revenue-transactions"],
    queryFn: () => fetchRevenueTransactions(1),
    staleTime: 60 * 1000,
  });

  if (!summary || !timeline || !transactions) return null;

  return (
    <div className="space-y-6">
      <RevenueKpiCards data={summary} totalTransactions={transactions.total} />

      <RevenueChart data={timeline} />

      <div className="flex justify-end">
        <ExportButton data={transactions.data} />
      </div>

      <RevenueTable data={transactions.data} />
    </div>
  );
}
