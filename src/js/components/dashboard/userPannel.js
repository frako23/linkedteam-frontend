import React, { useContext, useEffect, useState } from "react";
import "../../styles/perfil.css";
import { Context } from "../../store/appContext";
import { Box } from "../component/box";
import { FuelChart } from "../component/fuelChart";
import SetCompany from "../component/setCompany";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export const UserPannel = () => {
  const { store, actions } = useContext(Context);
  const [salesGoal, setSalesGoal] = useState(0);
  const creacionUsuario = sessionStorage.getItem("usuario.created_at");
  const idDeUsuario = sessionStorage.getItem("usuario.id");
  let diasDeUso = actions.calcularDiasDeUso(creacionUsuario);

  // useEffect(() => {
  //   actions.getUsuario();
  // }, [salesGoal]);

  const id = idDeUsuario;
  if (salesGoal !== 0) {
    // console.log(salesGoal, id);
    actions.putUserSalesGoal(salesGoal, id);
    toast.success(`Tu meta de ventas es: $ ${salesGoal} vamos por ella!`);
  }

  const addSalesGoal = () => {
    Swal.fire({
      title: "Para comenzar coloca tu meta de ventas 💰",
      input: "number",
      confirmButtonText: "Registra tu meta 🙌",
      showLoaderOnConfirm: true,
      preConfirm: (salesGoal) => {
        setSalesGoal(salesGoal);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <main
      className="d-grid"
      style={
        {
          // paddingLeft: "9rem",
          // paddingRight: "6rem",
        }
      }
    >
      {diasDeUso > 0 ? (
        <span className="badge bg-info text-dark">
          {diasDeUso} dias de uso gratuito
        </span>
      ) : (
        <span className="badge bg-light text-dark">Versión premium</span>
      )}

      <div className="main__title">
        <p className="font-weight-bold text-white mt-4 perfil-titulo">
          Bienvenid@ a LinkedTeam
          <span
            style={{
              color: "rgb(167, 100, 255)",
              fontSize: "3rem",
            }}
          >
            {" "}
            {store.usuario.name}
          </span>
        </p>
      </div>
      <div className="button-single-div">
        {store.usuario.agency === null ? <SetCompany /> : ""}
      </div>
      <div className="perfil-dashboard">
        <section className="about">
          {/* <div className="image">
            <img src={mujer} className="" />
          </div> */}
          <div className="content">
            <h3>¿Qué puedes hacer aqui?</h3>
            <h5>Fórmate</h5>
            <p>
              En CURSOS Y VIDEOS encontrarás contenido de alto valor para seguir
              mejorando de forma profesional y persona
            </p>

            <h5>Anota tus pendientes</h5>
            <p>
              En TAREAS PENDIENTES podrás anotar esas actividades claves, y
              hacerles seguimiento con las 3 columnas
            </p>
            <h5>Tu propio CRM</h5>
            <p>
              Con esta APP podrás guardar cada uno de tus prospectos, y usar el
              embudo de ventas para hacer un seguimiento efectivo
            </p>

            <h5>Registra tus actividades</h5>
            <p>
              Al registrar un cliente verás el boton DETALLE con el que podrás
              agregar todas las activiades que haz realizado
            </p>
          </div>
          <div>
            <h5
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Asi esta tu embudo de ventas
            </h5>
            <Box />
          </div>
          <div>
            <h5
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "white",
              }}
            >
              Asi esta tu META DE VENTAS
            </h5>
            <FuelChart />
            <div className="single-btn">
              <button className="btn btn-light" onClick={addSalesGoal}>
                {store.usuario.sales_goal === null
                  ? "Registra tu meta"
                  : "Actualiza tu meta"}
              </button>
            </div>
          </div>
        </section>

        {/*<div className="main-wrapper-intro">
          <div className="wrapper-intro">
            <div className="intro-square one-intro">
              <h5>Fórmate</h5>
              <p>
                En CURSOS Y VIDEOS encontrarás contenido de alto valor para
                seguir mejorando de forma profesional y persona
              </p>
            </div>
            <div className="intro-square two-intro">
              <h5>Tu propio CRM</h5>
              <p>
                Con esta APP podrás guardar cada uno de tus prospectos, y usar
                el embudo de ventas para hacer un seguimiento efectivo
              </p>
            </div>
            <div className="intro-square three-intro">
              <h5>Registra tus actividades</h5>
              <p>
                Al registrar un cliente verás el boton DETALLE con el que podrás
                agregar todas las activiades que haz realizado
              </p>
            </div>
            <div className="intro-square four-intro">
              <h5>Anota tus pendientes</h5>
              <p>
                En TAREAS PENDIENTES podrás anotar esas actividades claves, y
                hacerles seguimiento con las 3 columnas
              </p>
            </div>
          </div>
        </div> */}
      </div>
      {/* <ToDoChart /> */}
    </main>
  );
};
