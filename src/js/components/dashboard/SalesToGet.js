import { useContext } from "react";
import { Context } from "@/store/appContext";
import { formatoMonto } from "@/lib/etapas";
import { MetricCard } from "./metric-card";

export const SalesToGet = ({ salesGoal }) => {
  const { store } = useContext(Context);
  const totalVentas = store.clientes
    .filter((cliente) => cliente.status == "Cerrado")
    .reduce((acum, cliente) => acum + parseInt(cliente.amount || 0), 0);
  return (
    <MetricCard
      titulo="Por lograr"
      valor={
        store.usuario.sales_goal
          ? formatoMonto(Math.max(Number(salesGoal) - totalVentas, 0))
          : "—"
      }
    />
  );
};
