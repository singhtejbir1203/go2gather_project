import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

export default function ExportButton({ data }) {
  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(
      data.map((t) => ({
        Date: new Date(t.paidAt).toLocaleDateString(),
        Passenger: t.passengerId.name,
        Driver: t.driverId.name,
        GMV: t.grossAmount,
        PlatformFee: t.platformFee,
      })),
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Revenue");

    XLSX.writeFile(workbook, "revenue.xlsx");
  };

  return (
    <Button variant="outline" onClick={exportExcel}>
      Export
    </Button>
  );
}
