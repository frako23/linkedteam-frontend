import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/perfil.css";

export const Box = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientes();
    }
  }, [store.token]);
  return (
    <div className="main__card">
      <div className="card__profile">
        <div className="card__inner ">
          <p className="text-black">PROSPECTOS</p>
        </div>
        <p className="text-black font-weight-bold numero">
          {store.clientes.filter((index) => index.status == "Prospecto").length}
        </p>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-black">CONTACTADOS</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.clientes.filter((index) => index.status == "Contactado")
              .length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-black">PRIMERA CITA</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.clientes.filter((index) => index.status == "Primera Cita")
              .length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-black">NEGOCIACIÓN</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.clientes.filter((index) => index.status == "Negociación")
              .length
          }
        </span>
      </div>

      <div className="card__profile">
        <div className="card__inner">
          <p className="text-black">CIERRES</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {store.clientes.filter((index) => index.status == "Cerrado").length}
        </span>
      </div>
    </div>
  );
};
