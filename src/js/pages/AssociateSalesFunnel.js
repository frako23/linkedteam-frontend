import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { KanbanAsociado } from "../components/crm/kanbanAsociado";
import Dropdown from "react-bootstrap/Dropdown";
import { ExportToExcel } from "../components/crm/exportToExcel";
import { Pricing } from "./pricing";
import SortCRM from "../components/crm/sortCRM";

export const AssociateSalesFunnel = () => {
  const { store, actions } = useContext(Context);
  const [selected, setSelected] = useState("");
  const [asociadoId, setAsociadoId] = useState("");
  const id = localStorage.getItem("usuario.id");
  useEffect(() => {
    actions.setHeader("CRM Asociados");
  }, []);
  let notClosedArray = store.userClients.filter(
    (index) => index.status != "Cerrado"
  );

  // console.log(notClosedArray);

  let amountSum = notClosedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  // console.log(amountSum);

  let closedArray = store.userClients.filter(
    (index) => index.status == "Cerrado"
  );

  // console.log(closedArray);

  let amountSumClosedSales = closedArray.reduce(
    (acum, index) => acum + parseInt(index.amount),
    0
  );

  // console.log(amountSumClosedSales);

  useEffect(() => {
    actions.getUsersByManager(id);
  }, []);

  // console.log(store.usuario.own_agency);
  console.log(id);
  console.log(store.usersByManager);

  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div className=" ps-5 clients">
          <div className="ms-2 d-flex justify-content-between pt-2">
            <div className="btn-group me-2 ms-5">
              <ExportToExcel excelData={store.clientes} />
              <Dropdown>
                <Dropdown.Toggle
                  className="btn btn-sm btn-outline-secondary"
                  id="dropdown-basic"
                  variant="outline-secondary"
                >
                  Asociados
                </Dropdown.Toggle>

                {store.usersByManager.map((asociado) => (
                  <Dropdown.Menu key={asociado.id}>
                    <Dropdown.Item
                      href="#/action-1"
                      onClick={() => setAsociadoId(asociado.id)}
                    >
                      {asociado.name + " " + asociado.lastname}{" "}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ))}
              </Dropdown>
            </div>
          </div>
          <div className="form-outline mb-4 mx-5">
            <SortCRM />
          </div>
          <KanbanAsociado asociadoId={asociadoId} />
        </div>
      )}
    </>
  );
};
