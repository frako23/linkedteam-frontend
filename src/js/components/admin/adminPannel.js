import React from "react";
import "../../../styles/dashboard.css";
import { Navbar } from "../navbar/navbar";
import { MainChart } from "../utils/mainChart";

export const AdminPannel = () => {
  return (
    <>
      <Navbar />
      <div className="admin-pannel-header">
        <h1
          className="text-black text-center mt-4 kanban-head-title"
          style={{ paddingBottom: "3rem" }}
        >
          Panel de Administrador
        </h1>
      </div>

      <MainChart />
    </>
  );
};
