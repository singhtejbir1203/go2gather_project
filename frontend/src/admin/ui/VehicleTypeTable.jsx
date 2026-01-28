import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import EditVehicleTypeDialog from "./EditVehicleTypeDialog";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function VehicleTypeTable({ vehicleTypes }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Key</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vehicleTypes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-600 py-6">
              No vehicle types found.
            </TableCell>
          </TableRow>
        ) : (
          vehicleTypes.map((type) => (
            <TableRow key={type._id}>
              <TableCell>
                {type.imageUrl && (
                  <img
                    src={type.imageUrl}
                    alt={type.displayName}
                    className="h-10 w-10 rounded object-cover"
                  />
                )}
              </TableCell>

              <TableCell className="font-mono">{type.key}</TableCell>

              <TableCell className="font-medium">{type.displayName}</TableCell>

              <TableCell>
                <Badge variant={type.isActive ? "default" : "secondary"}>
                  {type.isActive ? "Active" : "Disabled"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <EditVehicleTypeDialog vehicleType={type} />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            `/admin/vehicle-types/${type._id}/seats/${type.displayName}`,
                          )
                        }
                      >
                        Manage Seats
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(
                            `/admin/vehicle-types/${type._id}/brands/${type.displayName}`,
                          )
                        }
                      >
                        Manage Brands
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default VehicleTypeTable;
