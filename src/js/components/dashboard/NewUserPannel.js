import React from "react";
import "../../../styles/newuserpannel.css";
// import DashboardSalesGraphic from "./DashboardSalesGraphic";
import { TotalSales } from "./TotalSales";
import { Box } from "../../components/dashboard/box";
import { TodoBox } from "./TodoBox";
import { ConversionRate } from "./ConversionRate";
import { AverageSale } from "./AverageSale";
import { SalesCycle } from "./SalesCycle";

export const NewUserPannel = () => {
  return (
    <>
      <main className="ms-5 d-container">
        <h1 className="h4 pt-5">Resumen del embudo de ventas</h1>
        <Box />
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-5 pb-2 border-bottom">
          <h1 className="h2">Métricas de ventas</h1>
          {/* <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
            >
              This week
            </button>
          </div> */}
        </div>
        <div>
          {/* <div className="graphic">
            <DashboardSalesGraphic />
          </div> */}
          <div className="justify-content-around graphic-cards">
            <TotalSales />
            <ConversionRate />
            <AverageSale />
            <SalesCycle />
          </div>
        </div>
        <h1 className="h4 pt-5">Resumen de tareas pendientes</h1>
        <TodoBox />
      </main>
    </>
  );
};
