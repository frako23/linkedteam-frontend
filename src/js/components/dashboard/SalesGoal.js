import React, { useContext } from "react";
import { Context } from "../../store/appContext";

export const SalesGoal = ({ salesGoal }) => {
  const { store, actions } = useContext(Context);
  // let percentage = store.amountSumClosed / store.usuario.sales_goal;
  console.log(store.usuario.sales_goal);

  return (
    <div className="d-flex my-2" key={store.usuario.sales_goal}>
      <div className="card flex-fill border-0">
        <div className="card-body py-4">
          <div className="">
            <div className="d-flex justify-content-between w-100 ">
              {store.usuario.sales_goal ? (
                <>
                  <span className="mb-2">Meta de ventas</span>
                  <h4 className="mb-2">${salesGoal}</h4>
                </>
              ) : (
                "Establece tu meta de ventas"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
