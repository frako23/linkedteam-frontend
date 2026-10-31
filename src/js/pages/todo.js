import { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pricing } from "./pricing";

const CARRILES = [
  { status: "por realizar", titulo: "Por hacer" },
  { status: "en ejecución", titulo: "En proceso" },
  { status: "realizado", titulo: "Realizadas" },
];

export function Todo() {
  const [task, setTask] = useState("");
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setHeader("Tareas pendientes");
  }, []);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getTareas();
    }
  }, [store.token]);

  const onDragEnd = ({ source, destination, draggableId }) => {
    if (!destination || source.droppableId === destination.droppableId) return;
    const lista = [...store.tareas];
    const indice = lista.findIndex((t) => t.id === Number(draggableId));
    lista[indice].status = destination.droppableId;
    actions.updateTaskStatus(lista);
    actions.putTarea({ status: lista[indice].status, id: lista[indice].id });
  };

  const agregar = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      toast.error("No puedes crear tareas vacías");
      return;
    }
    actions.postTareas({ task, status: "por realizar" });
    setTask("");
  };

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tareas pendientes
        </h1>
        <p className="text-muted-foreground text-sm">
          Mueve cada tarea entre columnas según su avance.
        </p>
      </div>

      <form onSubmit={agregar} className="flex max-w-xl gap-2">
        <Input
          placeholder="Nueva tarea..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          aria-label="Nueva tarea"
        />
        <Button type="submit">
          <Plus /> Agregar
        </Button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 md:grid-cols-3">
          {CARRILES.map((carril) => {
            const tareas = store.tareas.filter((t) => t.status === carril.status);
            return (
              <Droppable droppableId={carril.status} key={carril.status}>
                {(provided, snapshotCol) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "bg-muted/50 flex min-h-48 flex-col gap-2 rounded-xl p-2 transition-colors",
                      snapshotCol.isDraggingOver &&
                        "bg-accent ring-primary/30 ring-1"
                    )}
                  >
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <span className="text-sm font-medium">{carril.titulo}</span>
                      <Badge variant="secondary" className="tabular-nums">
                        {tareas.length}
                      </Badge>
                    </div>
                    {tareas.map((tarea, index) => (
                      <Draggable
                        key={tarea.id}
                        draggableId={String(tarea.id)}
                        index={index}
                      >
                        {(dp, snapshot) => (
                          <div
                            ref={dp.innerRef}
                            {...dp.draggableProps}
                            {...dp.dragHandleProps}
                          >
                            <div
                              className={cn(
                                "bg-card flex cursor-grab items-start justify-between gap-2 rounded-lg border p-3 text-sm shadow-xs",
                                snapshot.isDragging &&
                                  "ring-primary/30 shadow-lg ring-2",
                                carril.status === "realizado" &&
                                  "text-muted-foreground line-through"
                              )}
                            >
                              <span className="break-words">{tarea.task}</span>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Eliminar tarea"
                                className="hover:text-destructive shrink-0"
                                onClick={() => actions.deleteTarea(tarea.id)}
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
