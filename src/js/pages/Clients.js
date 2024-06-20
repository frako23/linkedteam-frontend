import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/newuserpannel.css";
import { useNavigate } from "react-router-dom";
import { CreateClient } from "../components/clients/CreateClient";
import CreateProduct from "../components/clients/CreateProduct";
import CreateProductClient from "../components/clients/CreateProductClient";
import { EditClient } from "../components/clients/EditClient";
export const Clients = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    actions.setHeader("Clientes");
  }, []);
  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  return (
    <>
      <div className="create-course-heading">
        <div>
          <CreateClient />
          <CreateProduct />
        </div>
        <h3>Haz click aqui para añadir un cliente</h3>
      </div>

      <section className="clients" style={{ overflowX: "auto" }}>
        <table className="table table-hover clients-table">
          <thead>
            <tr>
              <th className="col" scope="col">
                #
              </th>
              <th className="col-3" scope="col">
                Nombre
              </th>
              <th className="col-2" scope="col">
                Celular
              </th>
              <th className="col-3" scope="col">
                Email
              </th>
              <th className="col-2" scope="col">
                Fecha de Nacimiento
              </th>
              <th className="col-2 text-center" scope="col">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {store.clientes?.length > 0 ? (
              store.clientes
                .filter((cliente) => cliente.status == "Cliente")
                .map((cliente, index) => (
                  <tr key={cliente.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{cliente.name}</td>
                    <td>{cliente.cellphone}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.birthdate}</td>
                    <td className="d-flex justify-content-center gap-3 ">
                      <CreateProductClient clientId={cliente.id} />
                      <EditClient
                        name={cliente.name}
                        email={cliente.email}
                        cellphone={cliente.cellphone}
                        birthdate={cliente.birthdate}
                        id={cliente.id}
                      />
                      {/* <button
                        data-toggle="tooltip"
                        title="Eliminar Cliente"
                        className="btn btn-light rounded-pill border w-25-dark fw-bold text-white"
                        style={{ background: "#695cfe" }}
                        // onClick={handleShow}
                      >
                        <i className="fa-solid fa-user-slash"></i>
                      </button> */}
                    </td>
                  </tr>
                ))
            ) : (
              <div className="d-flex justify-content-center ">
                <h4>Aún no tienes clientes cargados</h4>
              </div>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
