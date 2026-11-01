import { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowRight, ClipboardPen, CloudCheck, Plus } from "lucide-react";
import { Context } from "@/store/appContext";
import { ETAPAS } from "@/lib/etapas";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Nuevonegocio } from "../crm/nuevoNegocio";

const TIPOS = { llamada: "Llamada con", mensaje: "Mensaje a", cita: "Cita con" };

const hace = (iso) =>
  formatDistanceToNow(new Date(iso), { addSuffix: true, locale: es });

/** Lista de cambios pendientes: ver, corregir y descartar lo que no se pudo enviar. */
export function ListaPendientes() {
  const { store, actions } = useContext(Context);
  const [porDescartar, setPorDescartar] = useState(null);
  const [porCorregir, setPorCorregir] = useState(null);

  const nombreDe = (id) =>
    store.clientes.find((c) => c.id === id)?.name || "tu cliente";

  const titulo = (c) => {
    if (c.tipo === "interaccion") {
      return `${TIPOS[c.datos.contact_type] || "Contacto con"} ${nombreDe(c.clienteId)}`;
    }
    if (c.tipo === "negocio") return `Nuevo negocio: ${c.datos.name}`;
    return `${c.datos.nombre || nombreDe(c.clienteId)} → ${c.datos.status}`;
  };

  const icono = (c) => {
    const Icono =
      c.tipo === "interaccion" ? ClipboardPen : c.tipo === "negocio" ? Plus : ArrowRight;
    return <Icono className="text-muted-foreground mt-0.5 size-4 shrink-0" />;
  };

  const dependientes = (c) =>
    c.tipo === "negocio"
      ? store.pendientes.filter((p) => p.tipo !== "negocio" && p.clienteId === c.clienteId)
          .length
      : 0;

  const estado = (c) => {
    if (c.estado === "enviando") {
      return (
        <Badge variant="secondary">
          <Spinner className="size-3" /> Enviando…
        </Badge>
      );
    }
    if (c.estado === "rechazado") {
      return <Badge variant="outline">No se pudo enviar</Badge>;
    }
    if (c.estado === "bloqueado") return <Badge variant="outline">En espera</Badge>;
    return <Badge variant="secondary">Pendiente</Badge>;
  };

  const descripcion =
    store.conexion === false
      ? `Se enviarán cuando vuelvas a tener conexión.${
          store.ultimaActualizacion
            ? ` Datos actualizados ${hace(store.ultimaActualizacion)}.`
            : ""
        }`
      : "Se envían solos en unos segundos.";

  const extra = porDescartar ? dependientes(porDescartar) : 0;

  return (
    <>
      <Sheet
        open={store.listaPendientesAbierta}
        onOpenChange={(abierta) => actions.abrirPendientes(abierta)}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Cambios pendientes</SheetTitle>
            <SheetDescription>{descripcion}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 px-4 pb-4">
            {store.pendientes.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CloudCheck />
                  </EmptyMedia>
                  <EmptyTitle>Todo está enviado</EmptyTitle>
                  <EmptyDescription>Tus cambios ya están en LinkedTeam.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              store.pendientes.map((c) => (
                <div key={c.id} className="flex flex-col gap-2 rounded-lg border p-3">
                  <div className="flex items-start gap-2">
                    {icono(c)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{titulo(c)}</p>
                      <p className="text-muted-foreground text-xs">{hace(c.creadoEn)}</p>
                    </div>
                    {estado(c)}
                  </div>
                  {c.motivo ? (
                    <p
                      className={cn(
                        "text-sm",
                        c.estado === "rechazado" ? "text-destructive" : "text-muted-foreground"
                      )}
                    >
                      {c.motivo}
                    </p>
                  ) : null}
                  {c.estado === "rechazado" ? (
                    <div className="flex justify-end gap-2">
                      {c.tipo === "negocio" ? (
                        <Button variant="outline" size="sm" onClick={() => setPorCorregir(c)}>
                          Corregir
                        </Button>
                      ) : null}
                      <Button variant="ghost" size="sm" onClick={() => setPorDescartar(c)}>
                        Descartar
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={!!porDescartar}
        onOpenChange={(abierta) => !abierta && setPorDescartar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Descartar este cambio?</AlertDialogTitle>
            <AlertDialogDescription>
              Lo que escribiste se borrará de este teléfono. Esta acción no se puede deshacer.
              {extra > 0
                ? ` También se descartarán sus ${extra} interacciones pendientes.`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                actions.descartarPendiente(porDescartar.id);
                setPorDescartar(null);
              }}
            >
              Descartar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {porCorregir ? (
        <Nuevonegocio
          pendiente={porCorregir}
          open
          onOpenChange={(abierta) => !abierta && setPorCorregir(null)}
        />
      ) : null}
    </>
  );
}
