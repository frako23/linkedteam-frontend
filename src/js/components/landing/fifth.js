import React from "react";
import "../../styles/home.css";

export const Fifth = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="d-flex justify-content-between">
        <div className="fs-1 fw-bolder text-white me-5">LinkedTeam</div>
        <div className="w-50">
          <span className="fs-1 fw-bolder span">Contáctanos</span>
          <br></br>
          <a
            href="mailto:linkedteam2023@gmail.com"
            className="fs-4 fw-bolder text-white"
          >
            linkedteam2023@gmail.com
          </a>
          <p className="fs-4 fw-bolder text-white">Caracas, Venezuela</p>
        </div>
      </div>
    </div>
  );
};
