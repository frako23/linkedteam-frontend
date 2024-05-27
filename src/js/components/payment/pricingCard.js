import React from "react";
import "../../../styles/pricing-card.css";
import PostPayment from "./postPayment";

export const PricingCard = () => {
  return (
    <div className="pricing-body">
      <div className="wrapper-pricing-card">
        <div className="table-pricing-card basic">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>
              PLAN DE <br></br> ENTRADA
            </h2>
          </div>
          <div className="price-section">
            <div className="price-area">
              <div
                className="inner-area text"
                style={{ lineHeight: "normal", marginTop: "50%" }}
              >
                {/* <span className="text">$</span> */}
                <span style={{ fontSize: "3rem", fontWeight: "500" }}>
                  Gratis{" "}
                </span>{" "}
                <span> por 60 dias </span>
              </div>
            </div>
          </div>
          <div className="package-name"></div>
          <ul className="features ps-0">
            <li className="mb-1">
              <span className="list-name">Plataforma de formacion</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">CRM</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Registro de actividad</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Tareas pendientes</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Permanencia de la data</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>

            <li>
              <span className="list-name">Acceso a data de reportes</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
          </ul>
        </div>

        <div className="table-pricing-card premium">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>
              PLAN <br></br> EJECUTIVO
            </h2>
          </div>
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">$</span>
                <span className="price">5</span> <span> /mes </span>
              </div>
            </div>
          </div>
          <div className="package-name"></div>
          <ul className="features ps-0">
            <div className="btn-price-card">
              <PostPayment />
            </div>

            <li className="mb-1">
              <span className="list-name">Plataforma de formacion</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">CRM</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Registro de actividad</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Tareas pendientes</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Permanencia de la data</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li>
              <span className="list-name">Acceso a data de reportes</span>
              <span className="icon cross">
                <i className="fas fa-times"></i>
              </span>
            </li>
          </ul>
        </div>

        <div className="table-pricing-card ultimate">
          <div className="head_tab fw-bold text-center">
            <h2 style={{ fontWeight: "600" }}>
              PLAN <br></br> GERENCIAL
            </h2>
          </div>
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">$</span>
                <span className="price">10</span> <span> /mes </span>
              </div>
            </div>
          </div>
          <div className="package-name"></div>
          <ul className="features ps-0">
            <div className="btn-price-card">
              <PostPayment />
            </div>

            <li className="mb-1">
              <span className="list-name">Plataforma de formacion</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">CRM </span>
              <span className="icon check">
                <i className="fas fa-check "></i>
              </span>
            </li>

            <li>
              <span className="list-name">Registro de actividad </span>
              <span className="icon check">
                <i className="fas fa-check "></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Tareas pendientes</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li className="mb-1">
              <span className="list-name">Permanencia de la data</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>

            <li>
              <span className="list-name">Acceso a data de reportes</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>
          </ul>

          {/* <div><h2>Sell all features <i className="fa fa-angle-down"></i></h2></div> */}
        </div>
      </div>
    </div>
  );
};
