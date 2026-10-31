import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Nuevonegocio } from "../components/crm/nuevoNegocio";
import { Pricing } from "./pricing";
import { ExportToExcel } from "../components/crm/exportToExcel";
import SortCRM from "../components/crm/sortCRM";
import { ImportFromExcel } from "../components/crm/importFromExcel";
import { Kanban } from "../components/crm/kanban";

export const SalesFunnel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const role = localStorage.getItem("usuario.role");

  useEffect(() => {
    actions.setHeader("Embudo de ventas");
  }, []);

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Embudo de ventas
          </h1>
          <p className="text-muted-foreground text-sm">
            Arrastra cada negocio a su etapa para mantener el embudo al día.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Nuevonegocio />
          <ExportToExcel excelData={store.clientes} />
          <ImportFromExcel />
          {role === "manager" && (
            <Button asChild variant="outline" size="sm">
              <Link to="/associatesalesfunnel">
                <Users /> Embudo de asesores
              </Link>
            </Button>
          )}
        </div>
      </div>
      <SortCRM />
      <Kanban />
    </div>
  );
};
