import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const ESTADOS = [
  { status: "por realizar", label: "Por hacer" },
  { status: "en ejecución", label: "En proceso" },
  { status: "realizado", label: "Realizadas" },
];

export const TodoBox = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getTareas();
    }
  }, [store.token]);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ESTADOS.map((estado) => (
        <Card key={estado.status} className="gap-2 py-5">
          <CardContent className="flex flex-col gap-1 px-5">
            <CardDescription>{estado.label}</CardDescription>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">
              {store.tareas.filter((t) => t.status == estado.status).length}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
