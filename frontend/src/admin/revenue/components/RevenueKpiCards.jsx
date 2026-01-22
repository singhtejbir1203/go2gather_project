import { Card, CardContent } from "@/components/ui/card";

export default function RevenueKpiCards({ data, totalTransactions }) {
  const items = [
    { label: "Total GMV", value: `₹${data.totalGMV}` },
    { label: "Platform Earnings", value: `₹${data.totalPlatformFee}` },
    { label: "Driver Payouts", value: `₹${data.totalDriverPayout}` },
    { label: "Transactions", value: totalTransactions },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
