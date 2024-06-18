import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const TotalSales = () => {
  const { store } = useContext(Context);
  const clientesCerrados = store.clientes.filter(
    (index) => index.status == "Cerrado"
  );
  const totalVentas = clientesCerrados.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );
  console.log(totalVentas);
  return (
    <div className="d-flex my-2">
      <div className="card flex-fill border-0">
        <div className="card-body py-4">
          <div className="d-flex align-items-start">
            <div className="flex-grow-1">
              <h4 className="mb-2">$ {totalVentas}</h4>
              <span className="mb-2"> Ventas Totales</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
