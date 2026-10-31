import { useContext } from "react";
import { Context } from "@/store/appContext";
import { formatoMonto } from "@/lib/etapas";
import { MetricCard } from "./metric-card";

export const AverageSale = () => {
  const { store } = useContext(Context);
  const cerrados = store.clientes.filter((c) => c.status == "Cerrado");
  const total = cerrados.reduce((acum, c) => acum + parseInt(c.amount || 0), 0);
  return (
    <MetricCard
      titulo="Venta promedio"
      valor={cerrados.length ? formatoMonto(total / cerrados.length) : "—"}
    />
  );
};
