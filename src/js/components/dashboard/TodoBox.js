import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/perfil.css";

export const TodoBox = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getTareas();
    }
  }, [store.token]);
  console.log(store.tareas);
  return (
    <div className="todo__main__card">
      <div
        className="new__card__profile"
        style={{ backgroundColor: "#FFFF00" }}
      >
        <div className="card__inner ">
          <p className="text-black">POR HACER</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {
            store.tareas.filter((index) => index.status == "por realizar")
              .length
          }
        </span>
      </div>

      <div
        className="new__card__profile"
        style={{ backgroundColor: "#0000FF" }}
      >
        <div className="card__inner">
          <p className="text-white">EN PROCESO</p>
        </div>
        <span className="text-white font-weight-bold numero">
          {
            store.tareas.filter((index) => index.status == "en ejecución")
              .length
          }
        </span>
      </div>

      <div
        className="new__card__profile"
        style={{ backgroundColor: "#00FF00" }}
      >
        <div className="card__inner">
          <p className="text-black">REALIZADO</p>
        </div>
        <span className="text-black font-weight-bold numero">
          {store.tareas.filter((index) => index.status == "realizado").length}
        </span>
      </div>
    </div>
  );
};
