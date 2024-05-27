import React, { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/single.css";

export const SingleManager = () => {
  const { store, actions } = useContext(Context);
  const [indicador, setIndicador] = useState("información");
  const params = useParams();

  // console.log(params);

  let asociadoId = store.userClients.find(
    (cliente) => cliente.id == params.theid
  ).user_id;

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getManagerClientActivity(asociadoId, params.theid);
    }
  }, [store.token]);

  return (
    <>
      <div className="card text-center single-view-card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  indicador == "información" ? "active" : ""
                } fw-bolder`}
                onClick={() => setIndicador("información")}
              >
                Información
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  indicador == "historico" ? "active" : ""
                } fw-bolder`}
                onClick={() => setIndicador("historico")}
              >
                Histórico
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body" style={{ paddingInline: "8rem" }}>
          <h5 className="card-title">
            {
              store.userClients.find((cliente) => cliente.id == params.theid)
                .name
            }
          </h5>

          {/* tabla de información */}

          {indicador == "información" ? (
            <table className="table table-dark table-bordered mb-0 ">
              <tbody>
                <tr>
                  <th scope="row">FECHA DE NACIMIENTO</th>
                  <td className="fw-bolder">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).birthdate
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">EDAD</th>
                  <td className="fw-bolder">
                    {actions.calcularEdad(
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).birthdate
                    ) + " años"}
                  </td>
                </tr>
                <tr>
                  <th scope="row">CORREO ELECTRÓNICO</th>
                  <td className="fw-bolder">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).email
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">CELULAR</th>
                  <td className="fw-bolder">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).cellphone
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">MONTO</th>
                  <td className="fw-bolder">{`$ ${
                    store.userClients.find(
                      (cliente) => cliente.id == params.theid
                    ).amout
                  }`}</td>
                </tr>
                <tr>
                  <th scope="row">NIVEL DE CONFIANZA</th>
                  <td className="fw-bolder">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).trust
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">ESTATUS</th>
                  <td className="fw-bolder">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).status
                    }
                  </td>
                </tr>
                <tr>
                  <th scope="row">NOTAS</th>
                  <td className="fw-bolder text-wrap">
                    {
                      store.userClients.find(
                        (cliente) => cliente.id == params.theid
                      ).notes
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            ""
          )}
          {/* tablar de historico de actividad */}
          {indicador == "historico" ? (
            <table className="table table-dark table-bordered mb-0 table-sm">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo de contacto</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {store.managerClientActivity.map((act, index) => (
                  <tr key={index}>
                    <td scope="row">{act.date}</td>
                    <td className="fw-bolder">{act.contact_type}</td>
                    <td className="fw-bolder text-wrap">{act.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
        <Link to="/dashboardAsociado">
          <span className="btn btn-primary btn-lg mb-3" role="button">
            Regresar
          </span>
        </Link>
      </div>
    </>
  );
};
