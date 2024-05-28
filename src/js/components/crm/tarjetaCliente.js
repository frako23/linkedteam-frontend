import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import "../../../styles/dashboard.css";
import { ModifyClient } from "./modifyClient";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { RegisterActivity } from "./RegisterActivity";

export const TarjetaCliente = ({ children, cliente }) => {
  const { actions } = useContext(Context);

  console.log(cliente);

  return (
    <div className="tarea">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <ModifyClient prospecto={cliente} />
        <RegisterActivity id={cliente?.id} />
        {/* <Link to={`/single/${cliente?.id}`}>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Detalle"
          >
            <i className="bx bxs-detail fs-5"></i>
          </button>
        </Link> */}
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Borrar"
          onClick={() => {
            Swal.fire({
              title: `Quieres eliminar a ${cliente.name}`,
              text: "¡No podrás revertir este cambio!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, quiero eliminarlo",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                actions.deleteCliente(cliente?.id);
                toast.success(`${cliente.name} ha sido eliminado`);
              }
            });
          }}
        >
          <i className="bx bx-trash fs-5"></i>
        </button>
      </div>
      {children}
    </div>
  );
};

TarjetaCliente.propTypes = {
  children: PropTypes.node,
  cliente: PropTypes.object,
};
