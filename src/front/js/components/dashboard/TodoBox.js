import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/perfil.css";

export const TodoBox = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);
  return (
    <div className="main__card">
      <div className="new__card__profile">
        <div className="card__inner ">
          <p className="text-black">POR HACER</p>
        </div>
        <p className="text-black font-weight-bold numero">
          {store.clientes.filter((index) => index.status == "Prospecto").length}
        </p>
      </div>

      <div className="new__card__profile">
        <div className="card__inner">
          <p className="text-black">EN PROCESO</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.clientes.filter((index) => index.status == "Contactado")
              .length
          }
        </span>
      </div>

      <div className="new__card__profile">
        <div className="card__inner">
          <p className="text-black">REALIZADO</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.clientes.filter((index) => index.status == "Primera Cita")
              .length
          }
        </span>
      </div>
    </div>
  );
};
