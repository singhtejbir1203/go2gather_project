import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditSeatTemplateDialog from "./EditSeatTemplateDialog";

function SeatTemplateTable({ seats }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Seat Code</TableHead>
          <TableHead>Label</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {seats.length === 0 ? (
          <p className="text-gray-600 flex mt-4">
            No seat template available for selected vehicle type.
          </p>
        ) : (
          seats.map((seat) => (
            <TableRow key={seat._id}>
              <TableCell className="font-mono">{seat.seatCode}</TableCell>

              <TableCell>{seat.label}</TableCell>

              <TableCell>
                {seat.isDriverSeat ? (
                  <Badge variant="secondary">Driver</Badge>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                <Badge variant={seat.isActive ? "default" : "secondary"}>
                  {seat.isActive ? "Active" : "Disabled"}
                </Badge>
              </TableCell>

              <TableCell>
                <EditSeatTemplateDialog seat={seat} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default SeatTemplateTable;
