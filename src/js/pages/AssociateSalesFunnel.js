import { useContext, useEffect, useState } from "react";
import { Context } from "@/store/appContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KanbanAsociado } from "../components/crm/kanbanAsociado";
import { ExportToExcel } from "../components/crm/exportToExcel";
import { Pricing } from "./pricing";
import SortCRM from "../components/crm/sortCRM";

export const AssociateSalesFunnel = () => {
  const { store, actions } = useContext(Context);
  const [asociadoId, setAsociadoId] = useState("");
  const id = localStorage.getItem("usuario.id");

  useEffect(() => {
    actions.setHeader("CRM Asociados");
    actions.getUsersByManager(id);
  }, []);

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Embudo de asesores
          </h1>
          <p className="text-muted-foreground text-sm">
            Elige a un asesor para ver sus negocios y su actividad.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ExportToExcel excelData={store.clientes} />
          <Select
            value={asociadoId ? String(asociadoId) : ""}
            onValueChange={(valor) => setAsociadoId(Number(valor))}
          >
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Selecciona un asesor" />
            </SelectTrigger>
            <SelectContent>
              {store.usersByManager.map((asociado) => (
                <SelectItem key={asociado.id} value={String(asociado.id)}>
                  {asociado.name} {asociado.lastname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <SortCRM id={asociadoId} />
      <KanbanAsociado asociadoId={asociadoId} />
    </div>
  );
};
