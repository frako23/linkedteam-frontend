import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import SetRoleManager from "./setRoleManager";
import SetManager from "./setManager";
// import UserPaymentInformation from "../payment/userPaymentInformation";

export const MainChart = () => {
  const { store, actions } = useContext(Context);

  window.onload = () => {
    actions.getTotalUsuarios();
  };
  useEffect(() => {
    actions.getTotalUsuarios();
  }, []);
  console.log(store.totalUsuarios);
  return (
    <div
      style={{
        marginLeft: "5rem",
        marginRight: "1rem",
        overflowX: "auto",
      }}
    >
      <h3 className="fw-bold">Tabla de usuarios</h3>
      <table className="table table-dark table-bordered mb-0">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            {/* <th className="text-center">Pagos</th> */}
            <th className="text-center">Nombre</th>
            <th className="text-center">Correo</th>
            <th className="text-center">Gerente</th>
            <th className="text-center">Asignar rol</th>
            <th className="text-center">Rol</th>
            <th className="text-center">Resetear Gerente</th>
            <th className="text-center">Días</th>
            <th className="text-center">Estatus</th>
            <th className="text-center">Activación</th>
          </tr>
        </thead>
        <tbody>
          {store.totalUsuarios.map((usuario) => {
            return (
              <tr key={usuario.id}>
                <td scope="row text-center" style={{ textAlign: "center" }}>
                  {usuario.id}
                </td>
                {/* <td scope="fw-bolder single-btn">
                  <UserPaymentInformation id={usuario.id} />
                </td> */}
                <td className="fw-bolder text-center">
                  {usuario.name + " " + usuario.lastname}
                </td>
                <td className="fw-bolder text-center">{usuario.email}</td>
                <td className="fw-bolder text-center">
                  {usuario.manager ?? (
                    <SetManager userId={usuario.id} userName={usuario.name} />
                  )}
                </td>
                <td
                  className={
                    usuario.role == "associated"
                      ? "single-btn"
                      : "fw-bold text-center"
                  }
                >
                  {usuario.role == "associated" ? (
                    <SetRoleManager
                      userId={usuario.id}
                      userName={usuario.name}
                    />
                  ) : (
                    usuario.role
                  )}
                </td>
                <td className="fw-bolder text-center">{usuario.role}</td>
                <td className="fw-bolder single-btn">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      actions.putManager({
                        name: null,
                        id: null,
                        userId: usuario.id,
                      })
                    }
                  >
                    Resetear
                  </button>
                </td>
                <td scope="row text-center" style={{ textAlign: "center" }}>
                  {actions.calcularUso(usuario.created_at)}
                </td>
                <td className="fw-bolder text-center">{usuario.status}</td>
                <td className="fw-bolde not-single-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      actions.activateUser({
                        status: "inactive",
                        user_id: usuario.id,
                      })
                    }
                  >
                    Inactivar
                  </button>
                  <button
                    className="btn btn-success ms-4"
                    onClick={() =>
                      actions.activateUser({
                        status: "active",
                        user_id: usuario.id,
                      })
                    }
                  >
                    Activar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
