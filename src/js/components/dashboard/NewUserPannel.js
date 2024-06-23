import React, { useContext } from "react";
import "../../../styles/newuserpannel.css";
import { TotalSales } from "./TotalSales";
import { Box } from "../../components/dashboard/box";
import { TodoBox } from "./TodoBox";
import { ConversionRate } from "./ConversionRate";
import { AverageSale } from "./AverageSale";
import { SalesCycle, SalesGoal } from "./SalesGoal";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { SalesToGet } from "./SalesToGet";
import { ConversionSalesRate } from "./ConversionSalesRate";

export const NewUserPannel = () => {
  const { store, actions } = useContext(Context);
  const addSalesGoal = () => {
    Swal.fire({
      title: "Para comenzar coloca tu meta de ventas 💰",
      input: "number",
      confirmButtonText: "Registra tu meta 🙌",
      showLoaderOnConfirm: true,
      preConfirm: (salesGoal) => {
        sdasdsdasdasd;
        actions.putUserSalesGoal(salesGoal);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <main className="ms-5 d-container">
        <h1 className="h4 pt-5">Resumen del embudo de ventas</h1>
        <Box />
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pb-2 border-bottom">
          <h1 className="h2">Métricas de ventas</h1>{" "}
          <button className="btn btn-primary fw-bold" onClick={addSalesGoal}>
            {store.usuario.sales_goal
              ? "Actualiza tu meta"
              : "Registra tu meta"}
          </button>
        </div>
        <div>
          <div className="justify-content-around graphic-cards">
            <SalesGoal />
            <TotalSales />
            <SalesToGet />
            <ConversionSalesRate />
          </div>
          <div className="justify-content-around graphic-cards">
            {/* <SalesGoal />
            <TotalSales /> */}
            <ConversionRate />
            <AverageSale />
          </div>
        </div>
        <h1 className="h4 pt-5">Resumen de tareas pendientes</h1>
        <TodoBox />
      </main>
    </>
  );
};
