import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";

import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Donaciones");
  }, []);
  return (
    <div className="n-container">
      <h1
        className="text-black  text-center pt-6 kanban-head-title"
        style={{ paddingBottom: "2rem" }}
      >
        Si <span style={{ color: "#695cfe" }}>LinkedTeam</span> te ha parecido
        de utilidad
      </h1>
      <h3 style={{ paddingBottom: "2rem" }} className="text-center">
        Aquí puedes{" "}
        <span style={{ color: "#0d571d", fontWeight: "bolder" }}>apoyar</span>{" "}
        este proyecto
      </h3>
      <PricingCard />
    </div>
  );
};
