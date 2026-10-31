import { useContext, useEffect } from "react";
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

  const onMover = (lista, cliente) => {
    actions.updateClientStatus(lista);
    actions.putCliente({ status: cliente.status, cliente_id: cliente.id });
    actions.closedArray();
    actions.amountSumClosed();
  };

  return (
    <KanbanBoard
      clientes={store.clientes}
      actividades={store.clientActivity}
      onMover={onMover}
      onEliminar={(cliente) => actions.deleteCliente(cliente.id)}
      acciones={(cliente) => (
        <>
          <ModifyClient prospecto={cliente} />
          <RegisterActivity id={cliente.id} />
        </>
      )}
    />
  );
};
