import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import RideStatusBadge from "./RideStatusBadge";
import { useNavigate } from "react-router-dom";

function AdminRideTable({ rides }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rides.map((ride) => (
          <TableRow key={ride._id}>
            <TableCell>
              {new Date(ride.startTime).toLocaleDateString()}
            </TableCell>

            <TableCell>
              {ride.from.label} → {ride.to.label}
            </TableCell>

            <TableCell>{ride.driverId?.name || "—"}</TableCell>

            <TableCell>₹{ride.pricePerSeat}</TableCell>

            <TableCell>
              <RideStatusBadge status={ride.status} />
            </TableCell>

            <TableCell className="text-right">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/admin/rides/${ride._id}`)}
              >
                Manage
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AdminRideTable;
