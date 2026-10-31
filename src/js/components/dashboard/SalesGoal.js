import { useContext } from "react";
import { Context } from "@/store/appContext";
import { formatoMonto } from "@/lib/etapas";
import { MetricCard } from "./metric-card";

export const SalesGoal = ({ salesGoal }) => {
  const { store } = useContext(Context);
  return (
    <MetricCard
      titulo="Meta de ventas"
      valor={store.usuario.sales_goal ? formatoMonto(salesGoal) : "—"}
      detalle={store.usuario.sales_goal ? undefined : "Aún no tienes una meta"}
    />
  );
};
