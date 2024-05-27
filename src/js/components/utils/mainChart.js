import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import SetRoleManager from "../admin/setRoleManager";
import UserPaymentInformation from "../payment/userPaymentInformation";

export const MainChart = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTotalUsuarios();
  }, []);

  return (
    <div
      style={{
        marginLeft: "5rem",
        marginRight: "1rem",
      }}
    >
      <h3 className="text-white fw-bold">Tabla de usuarios</h3>
      <table className="table table-dark table-bordered mb-0">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Pagos</th>
            <th className="text-center">Días</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Agencia</th>
            <th className="text-center">Resetear Agencia</th>
            <th className="text-center">Rol</th>
            <th className="text-center">Asignar rol</th>
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
                <td scope="fw-bolder single-btn">
                  <UserPaymentInformation id={usuario.id} />
                </td>
                <td scope="row text-center" style={{ textAlign: "center" }}>
                  {actions.calcularUso(usuario.created_at)}
                </td>
                <td className="fw-bolder text-center">
                  {usuario.name + " " + usuario.lastname}
                </td>
                <td className="fw-bolder text-center">{usuario.agency}</td>
                <td className="fw-bolder single-btn">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      actions.resetAgency({
                        agency: null,
                        agency_id: null,
                        user_id: usuario.id,
                      })
                    }
                  >
                    Resetear
                  </button>
                </td>
                <td className="fw-bolder text-center">{usuario.role}</td>
                <td className="fw-bolde single-btn">
                  <SetRoleManager userId={usuario.id} />
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
