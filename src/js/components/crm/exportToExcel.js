import { Download } from "lucide-react";
import { downloadExcel } from "react-export-table-to-excel";
import { Button } from "@/components/ui/button";

const header = [
  "amount",
  "birthdate",
  "cellphone",
  "created_at",
  "email",
  "id",
  "name",
  "notes",
  "status",
  "trust",
  "updated_at",
  "user_id",
];

export function ExportToExcel({ excelData }) {
  function handleDownloadExcel() {
    downloadExcel({
      fileName: `LinkedTeam Data ${new Date().toLocaleDateString()}`,
      sheet: "Respaldo de LinkedTeam",
      tablePayload: { header, body: excelData },
    });
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDownloadExcel}>
      <Download /> Descargar Excel
    </Button>
  );
}
