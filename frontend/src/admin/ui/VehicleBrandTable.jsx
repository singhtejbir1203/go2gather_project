import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditVehicleBrandDialog from "./EditVehicleBrandDialog";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function VehicleBrandTable({ brands }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {brands.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-gray-600 py-6">
              No brands available for this vehicle type.
            </TableCell>
          </TableRow>
        ) : (
          brands.map((brand) => (
            <TableRow key={brand._id}>
              <TableCell className="font-medium">{brand.name}</TableCell>

              <TableCell>
                <Badge variant={brand.isActive ? "default" : "secondary"}>
                  {brand.isActive ? "Active" : "Disabled"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <EditVehicleBrandDialog brand={brand} />

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
                            `/admin/vehicle-brands/${brand._id}/models/${brand.name}`,
                          )
                        }
                      >
                        Manage Models
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

export default VehicleBrandTable;
