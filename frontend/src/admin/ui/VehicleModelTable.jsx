import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditVehicleModelDialog from "./EditVehicleModelDialog";

function VehicleModelTable({ models }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {models.length === 0 ? (
          <p className="text-gray-600 flex mt-4">
            No model available for selected vehicle type and brand.
          </p>
        ) : (
          models.map((model) => (
            <TableRow key={model._id}>
              <TableCell>{model.name}</TableCell>

              <TableCell>
                <Badge variant={model.isActive ? "default" : "secondary"}>
                  {model.isActive ? "Active" : "Disabled"}
                </Badge>
              </TableCell>

              <TableCell>
                <EditVehicleModelDialog model={model} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default VehicleModelTable;
