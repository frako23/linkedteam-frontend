import React from "react";
import PropTypes from "prop-types";
import "../../../styles/dashboard.css";
import { ManagerDetailedClient } from "./ManagerDetailedClient";

export const TarjetaClienteManager = ({ children, cliente }) => {
  console.log(cliente);

  return (
    <div className="tarea">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <ManagerDetailedClient prospecto={cliente} />
      </div>
      {children}
    </div>
  );
};

TarjetaClienteManager.propTypes = {
  children: PropTypes.node,
  cliente: PropTypes.object,
};
