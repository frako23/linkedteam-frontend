import React from "react";
import "../../styles/home.css";
import two from "../../img/2.jpg";

export const Second = () => {
  return (
    <div className="position-absolute">
      <div className="text-center">
        <img src={two} className="landing__img" loading="lazy" />
        <div className="me-5 text-start px-5">
          <span className="font2 fw-bolder me-5 mb-3 span">
            Forma a tu equipo de trabajo
          </span>
          <p className="fs-5 pt-3 fw-bolder text-white text-start">
            Usa LinkedTeam para crear tus propios módulos de formación online
            para tu equipo de trabajo. Deja la formación en manos de LinkedTeam
            y concentrate en las actividades que aportan mayor valor a tu
            negocio, vender y reclutar
          </p>
        </div>
      </div>
    </div>
  );
};
