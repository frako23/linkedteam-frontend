import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Box } from "./box";
import { TodoBox } from "./TodoBox";
import { TotalSales } from "./TotalSales";
import { SalesGoal } from "./SalesGoal";
import { SalesToGet } from "./SalesToGet";
import { ConversionSalesRate } from "./ConversionSalesRate";
import { ConversionRate } from "./ConversionRate";
import { AverageSale } from "./AverageSale";

export const NewUserPannel = () => {
  const { store, actions } = useContext(Context);
  const [salesGoal, setSalesGoal] = useState();
  const [abierto, setAbierto] = useState(false);
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (store.usuario.sales_goal) {
      setSalesGoal(store.usuario.sales_goal);
    }
  }, [store.usuario.sales_goal]);

  const guardarMeta = (e) => {
    e.preventDefault();
    if (!valor || Number(valor) <= 0) return;
    actions.putUserSalesGoal(valor);
    setSalesGoal(valor);
    setAbierto(false);
    toast.success("Meta actualizada");
  };

  return (
    <main className="flex flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Resumen del embudo de ventas
        </h2>
        <Box />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            Métricas de ventas
          </h2>
          <Button
            onClick={() => {
              setValor(salesGoal ? String(salesGoal) : "");
              setAbierto(true);
            }}
          >
            {store.usuario.sales_goal ? "Actualiza tu meta" : "Registra tu meta"}
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SalesGoal salesGoal={salesGoal} />
          <TotalSales />
          <SalesToGet salesGoal={salesGoal} />
          <ConversionSalesRate salesGoal={salesGoal} />
          <ConversionRate />
          <AverageSale />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          Resumen de tareas pendientes
        </h2>
        <TodoBox />
      </section>

      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={guardarMeta} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Tu meta de ventas</DialogTitle>
              <DialogDescription>
                Define cuánto quieres vender para medir tu avance.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="meta">Monto en dólares</Label>
              <Input
                id="meta"
                type="number"
                min="1"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAbierto(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar meta</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};
