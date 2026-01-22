import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RevenueTable({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Passenger</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>GMV</TableHead>
            <TableHead>Platform Fee</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((tx) => (
            <TableRow key={tx._id}>
              <TableCell>{new Date(tx.paidAt).toLocaleDateString()}</TableCell>
              <TableCell>{tx.passengerId.name}</TableCell>
              <TableCell>{tx.driverId.name}</TableCell>
              <TableCell>₹{tx.grossAmount}</TableCell>
              <TableCell>₹{tx.platformFee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
