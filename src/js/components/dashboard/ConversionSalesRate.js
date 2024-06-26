import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ConversionSalesRate = ({ salesGoal }) => {
  const { store } = useContext(Context);
  const clientesCerrados = store.clientes.filter(
    (index) => index.status == "Cerrado"
  );
  const totalVentas = clientesCerrados.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );
  return (
    <div className="d-flex my-2">
      <div className="card flex-fill border-0">
        <div className="card-body py-4">
          <div className="d-flex align-items-start">
            <div className="d-flex justify-content-between w-100">
              <span className="mb-2">% logrado</span>
              <h4 className="mb-2">
                {store.usuario.sales_goal
                  ? ((totalVentas / salesGoal) * 100).toFixed(2)
                  : ""}
                %
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
