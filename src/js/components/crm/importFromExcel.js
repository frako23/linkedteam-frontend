import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { FileDown, Upload } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLUMNAS = [
  ["name", "Nombre"],
  ["birthdate", "Nacimiento"],
  ["email", "Email"],
  ["cellphone", "Celular"],
  ["amount", "Monto"],
  ["status", "Etapa"],
  ["trust", "Confianza"],
  ["notes", "Notas"],
];

export const ImportFromExcel = () => {
  const { actions } = useContext(Context);
  const [data, setData] = useState([]);
  const [abierto, setAbierto] = useState(false);

  const cerrar = () => {
    setAbierto(false);
    setData([]);
  };

  const handleFileUpload = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    const reader = new FileReader();
    reader.readAsBinaryString(archivo);
    reader.onload = (evento) => {
      const workbook = XLSX.read(evento.target.result, {
        type: "binary",
        cellDates: true,
      });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      setData(XLSX.utils.sheet_to_json(hoja));
    };
  };

  const cargar = () => {
    data.forEach((fila) => actions.postClientes(fila));
    toast.success(`${data.length} clientes importados`);
    cerrar();
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setAbierto(true)}>
        <Upload /> Importar Excel
      </Button>
      <Dialog open={abierto} onOpenChange={(v) => !v && cerrar()}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Importar clientes desde Excel</DialogTitle>
            <DialogDescription>
              Usa la plantilla de LinkedTeam para que las columnas coincidan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="max-w-xs"
              aria-label="Archivo de Excel"
            />
            <Button asChild variant="outline" size="sm">
              <a href="/LinkedTeam-new-template.xlsx" download>
                <FileDown /> Descargar plantilla
              </a>
            </Button>
          </div>
          {data.length > 0 && (
            <div className="max-h-80 overflow-auto rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {COLUMNAS.map(([, titulo]) => (
                      <TableHead key={titulo}>{titulo}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((fila, index) => (
                    <TableRow key={index}>
                      {COLUMNAS.map(([clave]) => (
                        <TableCell key={clave}>
                          {String(fila[clave] ?? "")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={cerrar}>
              Cancelar
            </Button>
            <Button onClick={cargar} disabled={data.length === 0}>
              Cargar {data.length || ""} clientes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
