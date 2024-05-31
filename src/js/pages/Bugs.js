import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { useForm, ValidationError } from "@formspree/react";
import logo from "../../../public/logoNavBar.png";

export const Bugs = () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Reportar errores");
  }, []);

  const [state, handleSubmit] = useForm("xjvnqkdv");
  if (state.succeeded) {
    return (
      <div
        style={{
          paddingLeft: "26rem",
          paddingRight: "21rem",
        }}
      >
        <img src={logo} style={{ height: "14rem" }} alt="Logo de LinkedTeam" />
        <h3>¡Gracias por tu ayuda!</h3>
        <p>
          Valoramos tu tiempo y tu colaboración al reportar un error en la app.
          Tu ayuda nos permite encontrar y solucionar problemas que podrían
          pasar desapercibidos.{" "}
        </p>
        <b>Gracias a tus comentarios, podemos mejorar la app para todos.</b>
      </div>
    );
  }
  return (
    <div className="n-container">
      <h1 className="text-black  text-center pt-6 kanban-head-title">
        ¿Viste algún error dentro de{" "}
        <span style={{ color: "#695cfe" }}>LinkedTeam</span>?
      </h1>
      <h3 style={{ paddingBottom: "2rem" }} className="text-center">
        Aquí puedes reportarlo
      </h3>

      <form
        onSubmit={handleSubmit}
        style={{ paddingLeft: "7rem", paddingRight: "3rem" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <b>Titulo del error</b>
          </label>
          <input type="text" className="form-control" id="title" name="title" />
          <ValidationError prefix="Text" field="title" errors={state.errors} />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            <b>Detalle del error</b>
          </label>
          <textarea
            style={{ height: "12rem" }}
            className="form-control"
            id="message"
            name="message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="btn btn-primary"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
