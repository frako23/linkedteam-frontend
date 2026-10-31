import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { ETAPAS, formatoMonto } from "@/lib/etapas";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export const Box = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);

  const resumen = ETAPAS.map((etapa) => {
    const negocios = store.clientes.filter((c) => c.status === etapa.status);
    return {
      ...etapa,
      cantidad: negocios.length,
      monto: negocios.reduce((acum, c) => acum + parseInt(c.amount || 0), 0),
    };
  });
  const total = store.clientes.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {resumen.map((etapa) => (
          <Card key={etapa.status} className="gap-2 py-5">
            <CardContent className="flex flex-col gap-1 px-5">
              <CardDescription className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${etapa.dot}`} />
                {etapa.label}
              </CardDescription>
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {etapa.cantidad}
              </p>
              <p className="text-muted-foreground text-sm tabular-nums">
                {formatoMonto(etapa.monto)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {total > 0 && (
        <div className="bg-muted flex h-2 overflow-hidden rounded-full">
          {resumen.map((etapa) => (
            <div
              key={etapa.status}
              className={etapa.dot}
              style={{ width: `${(etapa.cantidad / total) * 100}%` }}
              title={`${etapa.label}: ${etapa.cantidad}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
