import { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { CalendarDays, Clock, MessageSquare, Phone, Trash2 } from "lucide-react";
import { Context } from "@/store/appContext";
import { ETAPAS, formatoMonto } from "@/lib/etapas";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { ActivityDialog } from "./activity-dialog";

const TIPOS_ACTIVIDAD = [
  { tipo: "llamada", icono: Phone, titulo: "Llamadas" },
  { tipo: "mensaje", icono: MessageSquare, titulo: "Mensajes" },
  { tipo: "cita", icono: CalendarDays, titulo: "Citas" },
];

/**
 * Tablero Kanban compartido por el embudo propio y el de un asesor.
 * - clientes: lista de negocios a mostrar
 * - actividades: interacciones de esos negocios
 * - acciones(cliente): botones propios de cada vista (editar, registrar, detalle)
 * - onEliminar(cliente): si se pasa, se muestra el botón de borrar
 * - onMover(lista): recibe la lista completa con el estado ya cambiado
 */
export function KanbanBoard({
  clientes,
  actividades,
  acciones,
  onEliminar,
  onMover,
  soloLectura = false,
}) {
  const { actions } = useContext(Context);
  const [actividadAbierta, setActividadAbierta] = useState(false);
  const [clienteActividad, setClienteActividad] = useState();
  const [porEliminar, setPorEliminar] = useState(null);

  const onDragEnd = ({ source, destination, draggableId }) => {
    if (soloLectura || !destination) return;
    if (source.droppableId === destination.droppableId) return;
    const lista = [...clientes];
    const indice = lista.findIndex((c) => c.id === Number(draggableId));
    if (indice === -1) return;
    lista[indice].status = destination.droppableId;
    onMover(lista, lista[indice]);
  };

  const contar = (cliente, tipo) =>
    actividades.filter(
      (a) => a.client_id === cliente.id && a.contact_type === tipo
    ).length;

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {ETAPAS.map((etapa) => {
            const negocios = clientes.filter((c) => c.status === etapa.status);
            const monto = negocios.reduce(
              (acum, c) => acum + parseInt(c.amount || 0),
              0
            );
            return (
              <Droppable droppableId={etapa.status} key={etapa.status}>
                {(provided, snapshotCol) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "bg-muted/50 flex w-72 shrink-0 flex-col rounded-xl p-2 transition-colors",
                      snapshotCol.isDraggingOver &&
                        "bg-accent ring-primary/30 ring-1"
                    )}
                  >
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <span className={cn("size-2 rounded-full", etapa.dot)} />
                      <span className="text-sm font-medium">{etapa.label}</span>
                      <Badge variant="secondary" className="tabular-nums">
                        {negocios.length}
                      </Badge>
                      <span className="text-muted-foreground ml-auto text-sm tabular-nums">
                        {formatoMonto(monto)}
                      </span>
                    </div>
                    <ScrollArea className="h-[60vh]">
                      <div className="flex flex-col gap-2 p-0.5">
                        {negocios.map((cliente, index) => (
                          <Draggable
                            key={cliente.id}
                            draggableId={String(cliente.id)}
                            index={index}
                            isDragDisabled={soloLectura}
                          >
                            {(dp, snapshot) => (
                              <div
                                ref={dp.innerRef}
                                {...dp.draggableProps}
                                {...dp.dragHandleProps}
                                style={dp.draggableProps.style}
                              >
                                <div
                                  className={cn(
                                    "bg-card hover:border-primary/40 flex flex-col gap-2 rounded-lg border p-3 text-sm shadow-xs",
                                    !soloLectura && "cursor-grab",
                                    snapshot.isDragging &&
                                      "ring-primary/30 shadow-lg ring-2"
                                  )}
                                >
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="flex min-w-0 flex-col items-start gap-1">
                                      <span className="font-medium">
                                        {cliente.name}
                                      </span>
                                      {cliente.pendiente ? (
                                        <Badge
                                          variant="secondary"
                                          onClick={() =>
                                            cliente.estado === "rechazado" &&
                                            actions.abrirPendientes(true)
                                          }
                                        >
                                          <Clock className="size-3" />
                                          {cliente.estado === "rechazado"
                                            ? "No se pudo enviar"
                                            : "Pendiente"}
                                        </Badge>
                                      ) : null}
                                    </span>
                                    <div className="flex shrink-0 items-center gap-1">
                                      {acciones?.(cliente)}
                                      {onEliminar && cliente.id > 0 && (
                                        <Button
                                          variant="ghost"
                                          size="icon-sm"
                                          aria-label={`Eliminar a ${cliente.name}`}
                                          title="Eliminar"
                                          className="hover:text-destructive"
                                          onClick={() => setPorEliminar(cliente)}
                                        >
                                          <Trash2 />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  <p className="text-base font-semibold tabular-nums">
                                    {formatoMonto(cliente.amount)}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {actions.calcularEdad(cliente.birthdate)}{" "}
                                    años · Confianza {cliente.trust}
                                  </p>
                                  <button
                                    type="button"
                                    className="text-muted-foreground hover:text-foreground flex items-center gap-4 text-xs"
                                    onClick={() => {
                                      setClienteActividad(cliente.id);
                                      setActividadAbierta(true);
                                    }}
                                  >
                                    {TIPOS_ACTIVIDAD.map(
                                      ({ tipo, icono: Icono, titulo }) => {
                                        const total = contar(cliente, tipo);
                                        return (
                                          <span
                                            key={tipo}
                                            title={titulo}
                                            className={cn(
                                              "flex items-center gap-1 tabular-nums",
                                              total === 0 && "opacity-50"
                                            )}
                                          >
                                            <Icono className="size-3.5" />
                                            {total}
                                          </span>
                                        );
                                      }
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      <ActivityDialog
        open={actividadAbierta}
        onClose={() => setActividadAbierta(false)}
        actividad={actividades.filter((a) => a.client_id === clienteActividad)}
      />

      <AlertDialog
        open={!!porEliminar}
        onOpenChange={(v) => !v && setPorEliminar(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar a {porEliminar?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                onEliminar(porEliminar);
                setPorEliminar(null);
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
