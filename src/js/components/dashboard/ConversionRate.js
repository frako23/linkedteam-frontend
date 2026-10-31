import { useContext } from "react";
import { Context } from "@/store/appContext";
import { MetricCard } from "./metric-card";

export const ConversionRate = () => {
  const { store } = useContext(Context);
  const cerrados = store.clientes.filter((c) => c.status == "Cerrado").length;
  const total = store.clientes.length;
  return (
    <MetricCard
      titulo="Conversión"
      valor={total ? `${Math.floor((cerrados / total) * 100)} %` : "—"}
      detalle={`${cerrados} de ${total} negocios cerrados`}
    />
  );
};
