import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const ConversionRate = () => {
  const { store } = useContext(Context);
  const clientesCerrados = store.clientes.filter(
    (index) => index.status == "Cerrado"
  );
  return (
    <div className="d-flex my-2">
      <div className="card flex-fill border-0">
        <div className="card-body py-4">
          <div className="d-flex align-items-start">
            <div className="d-flex justify-content-between w-100">
              <span className="mb-2">% de Conversión</span>
              <h4 className="mb-2">
                {Math.floor(
                  (clientesCerrados?.length / store.clientes?.length) * 100
                )}
                %
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
