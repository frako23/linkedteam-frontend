import { useContext } from "react";
import { Context } from "@/store/appContext";
import { formatoMonto } from "@/lib/etapas";
import { MetricCard } from "./metric-card";

export const TotalSales = () => {
  const { store } = useContext(Context);
  const totalVentas = store.clientes
    .filter((cliente) => cliente.status == "Cerrado")
    .reduce((acum, cliente) => acum + parseInt(cliente.amount || 0), 0);
  return (
    <MetricCard titulo="Ventas logradas" valor={formatoMonto(totalVentas)} />
  );
};
