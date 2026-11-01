import { useContext, useEffect } from "react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { ModifyClient } from "./modifyClient";
import { RegisterActivity } from "./RegisterActivity";
import { KanbanBoard } from "./kanban-board";

export const Kanban = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity();
    }
  }, [store.token]);

  const onMover = async (lista, cliente) => {
    actions.updateClientStatus(lista);
    const r = await actions.encolarCambio("etapa", cliente.id, {
      status: cliente.status,
      nombre: cliente.name,
    });
    if (r.estado === "enviado") {
      toast.success(`${cliente.name} pasó a ${cliente.status}`);
    } else if (r.estado === "guardado") {
      toast.success(`${cliente.name} pasó a ${cliente.status}`, {
        description: "Se enviará cuando vuelvas a tener conexión.",
      });
    } else if (r.estado === "rechazado") {
      toast.error("No se pudo mover el negocio", { description: r.motivo });
    }
    actions.closedArray();
    actions.amountSumClosed();
  };

  const onEliminar = (cliente) => {
    if (store.conexion === false) {
      toast.info("Necesitas conexión para eliminar un negocio");
      return;
    }
    actions.deleteCliente(cliente.id);
    toast.success(`${cliente.name} fue eliminado`);
  };

  return (
    <KanbanBoard
      clientes={store.clientes}
      actividades={store.clientActivity}
      onMover={onMover}
      onEliminar={onEliminar}
      acciones={(cliente) => (
        <>
          <ModifyClient prospecto={cliente} soloLectura={cliente.id < 0} />
          <RegisterActivity id={cliente.id} />
        </>
      )}
    />
  );
};
