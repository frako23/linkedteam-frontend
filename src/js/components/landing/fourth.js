import React from "react";
import "../../styles/home.css";
import three from "../../img/3.jpg";

export const Fourth = () => {
  return (
    <div className="container mb-5 mt-5 pt-5">
      <div className="text-center">
        <img src={three} className="landing__img" loading="lazy" />
        <div className="me-5 text-start px-5">
          <span className="fs-1 fw-bolder me-5 span">
            Mantente conectad@ con las actividades de tu equipo de trabajo
          </span>
          <p className="fs-5 pt-3 fw-bolder text-white text-start">
            LinkedTeam te ofrece la posibilidad de organizar tu prospección como
            la de tus asociados, mediante reportes de ventas Lleva el
            seguimiento de la gestión de ventas de tu agencia a través de
            LinkedTeam{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
