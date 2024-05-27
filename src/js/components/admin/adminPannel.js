import React from "react";
import "../../../styles/dashboard.css";
import { Navbar } from "../navbar/navbar";
import { MainChart } from "../utils/mainChart";
import CreateCompany from "../agency-company/createCompany";
import CreateAgency from "../agency-company/createAgency";

export const AdminPannel = () => {
  return (
    <>
      <Navbar />
      <div className="admin-pannel-header">
        <h1
          className="text-white text-center mt-4 kanban-head-title"
          style={{ paddingBottom: "3rem" }}
        >
          Panel de Administrador
        </h1>
        <div>
          <CreateCompany />
          <CreateAgency />
        </div>
      </div>

      <MainChart />
    </>
  );
};
