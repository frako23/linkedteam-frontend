import React from "react";
import "../../styles/home.css";

export const Third = () => {
  return (
    <div className="container mb-5 mt-5 pt-5">
      <div className="text-center">
        <div className="font2 fw-bolder text-white me-5">
          <span>LinkedTeam</span> es una plataforma que busca cambiar la forma
          en la que los equipos de trabajo se forman y conectan.
        </div>
        <p className="fs-5 fw-bolder text-white">
          Nuestra app brinda una plataforma de formación asincrona, con la cual
          cada nuevo miembro de la organización puede adquirir conocimientos
          necesarios de forma inependiente, ademas de brindar herramientas de
          para el seguimiento de la actividad de ventas
        </p>
        {/* <img src={one} className="" /> */}
      </div>
    </div>
  );
};
