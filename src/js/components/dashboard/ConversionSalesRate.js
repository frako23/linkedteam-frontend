import { useContext } from "react";
import { Context } from "@/store/appContext";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "./metric-card";

export const ConversionSalesRate = ({ salesGoal }) => {
  const { store } = useContext(Context);
  const totalVentas = store.clientes
    .filter((cliente) => cliente.status == "Cerrado")
    .reduce((acum, cliente) => acum + parseInt(cliente.amount || 0), 0);
  const tieneMeta = store.usuario.sales_goal && Number(salesGoal) > 0;
  const porcentaje = tieneMeta ? (totalVentas / Number(salesGoal)) * 100 : 0;
  return (
    <MetricCard
      titulo="Meta lograda"
      valor={tieneMeta ? `${porcentaje.toFixed(1)} %` : "—"}
    >
      {tieneMeta ? (
        <Progress value={Math.min(porcentaje, 100)} className="mt-2 h-2" />
      ) : null}
    </MetricCard>
  );
};
