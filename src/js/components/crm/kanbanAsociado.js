import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "@/store/appContext";
import { ManagerDetailedClient } from "./ManagerDetailedClient";
import { KanbanBoard } from "./kanban-board";

export const KanbanAsociado = ({ asociadoId }) => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (asociadoId) {
      actions.getUserClients(asociadoId);
      actions.getManagerClientActivity(asociadoId);
    }
  }, [asociadoId]);

  const onMover = (lista, cliente) => {
    actions.updateClientStatus(lista);
    actions.putCliente({ status: cliente.status, cliente_id: cliente.id });
    actions.closedArray();
    actions.amountSumClosed();
  };

  return (
    <KanbanBoard
      clientes={store.userClients}
      actividades={store.managerClientActivity}
      onMover={onMover}
      acciones={(cliente) => <ManagerDetailedClient prospecto={cliente} />}
    />
  );
};

KanbanAsociado.propTypes = {
  asociadoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
