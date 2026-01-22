import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export default function RevenueChart({ data }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Revenue Over Time</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="gmv" stroke="#2563eb" name="GMV" />
            <Line
              type="monotone"
              dataKey="platformFee"
              stroke="#16a34a"
              name="Platform Fee"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
