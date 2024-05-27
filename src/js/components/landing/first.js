import React from "react";
import "../../styles/home.css";
import one from "../../img/1.jpg";

export const First = () => {
  return (
    <div className="">
      <div className="">
        <div className="fw-bolder text-white me-5 font1 text-start">
          Mantente conectado con tu equipo de trabajo
        </div>
        <img className="landing__img" src={one} />
      </div>
    </div>
  );
};
