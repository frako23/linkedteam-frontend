import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { useForm, ValidationError } from "@formspree/react";

export const Bugs = () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Reportar errores");
  }, []);

  const [state, handleSubmit] = useForm("xjvnqkdv");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
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

      <div style={{ paddingLeft: "7rem", paddingRight: "3rem" }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea id="message" name="message" />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button type="submit" disabled={state.submitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
