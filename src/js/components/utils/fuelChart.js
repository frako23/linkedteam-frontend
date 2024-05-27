import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../styles/perfil.css";
import GaugeChart from "react-gauge-chart";
import "../../styles/perfil.css";

export const FuelChart = () => {
  const { store, actions } = useContext(Context);
  let percentage = store.amountSumClosed / store.usuario.sales_goal;

  return (
    <div className="fuel-div">
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={600}
        arcsLength={[0.3, 0.4, 0.3]}
        colors={["#EA4228", "#F5CD19", "#5BE12C"]}
        percent={percentage}
        arcPadding={0.0}
      />
      <h4 className="fuel-tag">
        {" "}
        <span style={{ fontWeight: "bold" }}> Meta de ventas = $</span>{" "}
        {store.usuario.sales_goal}
      </h4>
      <h4 className="fuel-tag">
        {" "}
        <span style={{ fontWeight: "bold" }}> Ventas logradas = $</span>{" "}
        {store.amountSumClosed}
      </h4>
      <h4 className="fuel-tag">
        {" "}
        <span style={{ fontWeight: "bold" }}> Ventas por lograr = $</span>{" "}
        {store.usuario.sales_goal - store.amountSumClosed}
      </h4>
    </div>
  );
};
