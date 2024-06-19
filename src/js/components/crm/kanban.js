import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import "../../../styles/dashboard.css";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { TarjetaCliente } from "./tarjetaCliente";
import { Activity } from "./Activity";

export const Kanban = () => {
  const { store, actions } = useContext(Context);
  let { theid } = useParams();
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity();
    }
  }, [store.token]);
  console.log(store.clientActivity.filter((item) => item.client_id === 1));

  const onDragEnd = (result) => {
    // console.log(result);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = store.clientes.findIndex(
        (e) => e.id === Number(draggableId)
      );
      // console.log(sourceColIndex);
      const newList = [...store.clientes];
      // console.log(newList);
      newList[sourceColIndex].status = destination.droppableId;
      theid = newList[sourceColIndex].id;
      // console.log(newList[sourceColIndex].status, newList[sourceColIndex].id);
      actions.updateClientStatus(newList);
      // console.log(store.clientes);
      actions.putCliente({
        status: newList[sourceColIndex].status,
        cliente_id: theid,
      });
      actions.closedArray();
      actions.amountSumClosed();
    }
  };

  // const Element = Scroll.Element;
  const [show, setShow] = useState(false);
  const [indexToSet, setIndexToSet] = useState();
  console.log(indexToSet);
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-table">
          {/* columnas */}
          <Droppable droppableId="Prospecto">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  PROSPECTOS{" "}
                  <span style={{ background: "#246dec" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Prospecto"
                      ).length
                    }
                  </span>
                </strong>
                <span className="text-white">
                  {" "}
                  $
                  {store.clientes
                    .filter((cliente) => cliente.status === "Prospecto")
                    .reduce((acum, index) => acum + parseInt(index.amount), 0)}
                </span>
                <scroll-container>
                  {store.clientes
                    .filter((cliente) => cliente.status === "Prospecto")
                    .map((cliente, index) => (
                      <Draggable
                        key={cliente.id}
                        draggableId={String(cliente.id)}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <TarjetaCliente cliente={cliente}>
                              <ul className="list-group list-group-flush">
                                <span className="fs-5">{cliente.name}</span>
                                <li className="list-group-item">
                                  <strong>Edad: </strong>
                                  {actions.calcularEdad(cliente.birthdate) +
                                    " años"}
                                </li>
                                <li className="list-group-item">
                                  <strong>Monto: </strong> ${cliente.amount}
                                </li>
                                <li className="list-group-item">
                                  <strong>Confianza: </strong> {cliente.trust}
                                </li>
                                <li
                                  className="list-group-item activity"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Llamadas"
                                  onClick={() => {
                                    setShow(!show);
                                    setIndexToSet(cliente.id);
                                  }}
                                >
                                  <i className="fa-solid fa-phone fs-4 position-relative text-secondary">
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "llamada"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-message fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mensajes"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "mensaje"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-calendar-days fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Citas"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "cita"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                </li>
                              </ul>
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="Contactado">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  CONTACTADOS{" "}
                  <span
                    style={{ background: "#f5b74f" }}
                    className="badge text-black"
                  >
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Contactado"
                      ).length
                    }
                  </span>
                </strong>
                <span className="text-white">
                  {" "}
                  $
                  {store.clientes
                    .filter((cliente) => cliente.status === "Contactado")
                    .reduce((acum, index) => acum + parseInt(index.amount), 0)}
                </span>
                <scroll-container>
                  {store.clientes
                    .filter((cliente) => cliente.status === "Contactado")
                    .map((cliente, index) => (
                      <Draggable
                        key={cliente.id}
                        draggableId={String(cliente.id)}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <TarjetaCliente cliente={cliente}>
                              <ul className="list-group list-group-flush">
                                <span className="fs-5">{cliente.name}</span>
                                <li className="list-group-item">
                                  <strong>Edad: </strong>
                                  {actions.calcularEdad(cliente.birthdate) +
                                    " años"}
                                </li>
                                <li className="list-group-item">
                                  <strong>Monto: </strong> ${cliente.amount}
                                </li>
                                <li className="list-group-item">
                                  <strong>Confianza: </strong> {cliente.trust}
                                </li>
                                <li
                                  className="list-group-item activity"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Llamadas"
                                  onClick={() => {
                                    setShow(!show);
                                    setIndexToSet(cliente.id);
                                  }}
                                >
                                  <i className="fa-solid fa-phone fs-4 position-relative text-secondary">
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "llamada"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-message fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mensajes"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "mensaje"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-calendar-days fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Citas"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "cita"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                </li>
                              </ul>
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Primera Cita">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  PRIMERA CITA{" "}
                  <span style={{ background: "#cc3c43" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Primera Cita"
                      ).length
                    }
                  </span>
                </strong>
                <span className="text-white">
                  {" "}
                  $
                  {store.clientes
                    .filter((cliente) => cliente.status === "Primera Cita")
                    .reduce((acum, index) => acum + parseInt(index.amount), 0)}
                </span>
                <scroll-container>
                  {store.clientes
                    .filter((cliente) => cliente.status === "Primera Cita")
                    .map((cliente, index) => (
                      <Draggable
                        key={cliente.id}
                        draggableId={String(cliente.id)}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <TarjetaCliente cliente={cliente}>
                              <ul className="list-group list-group-flush">
                                <span className="fs-5">{cliente.name}</span>
                                <li className="list-group-item">
                                  <strong>Edad: </strong>
                                  {actions.calcularEdad(cliente.birthdate) +
                                    " años"}
                                </li>
                                <li className="list-group-item">
                                  <strong>Monto: </strong> ${cliente.amount}
                                </li>
                                <li className="list-group-item">
                                  <strong>Confianza: </strong> {cliente.trust}
                                </li>
                                <li
                                  className="list-group-item activity"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Llamadas"
                                  onClick={() => {
                                    setShow(!show);
                                    setIndexToSet(cliente.id);
                                  }}
                                >
                                  <i className="fa-solid fa-phone fs-4 position-relative text-secondary">
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "llamada"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-message fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mensajes"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "mensaje"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-calendar-days fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Citas"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "cita"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                </li>
                              </ul>
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Negociación">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  NEGOCIACIÓN{" "}
                  <span
                    style={{ background: "#4ff0f5" }}
                    className="badge text-black"
                  >
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Negociación"
                      ).length
                    }
                  </span>
                </strong>
                <span className="text-white">
                  {" "}
                  $
                  {store.clientes
                    .filter((cliente) => cliente.status === "Negociación")
                    .reduce((acum, index) => acum + parseInt(index.amount), 0)}
                </span>
                <scroll-container>
                  {store.clientes
                    .filter((cliente) => cliente.status === "Negociación")
                    .map((cliente, index) => (
                      <Draggable
                        key={cliente.id}
                        draggableId={String(cliente.id)}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <TarjetaCliente cliente={cliente}>
                              <ul className="list-group list-group-flush">
                                <span className="fs-5">{cliente.name}</span>
                                <li className="list-group-item">
                                  <strong>Edad: </strong>
                                  {actions.calcularEdad(cliente.birthdate) +
                                    " años"}
                                </li>
                                <li className="list-group-item">
                                  <strong>Monto: </strong> ${cliente.amount}
                                </li>
                                <li className="list-group-item">
                                  <strong>Confianza: </strong> {cliente.trust}
                                </li>
                                <li
                                  className="list-group-item activity"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Llamadas"
                                  onClick={() => {
                                    setShow(!show);
                                    setIndexToSet(cliente.id);
                                  }}
                                >
                                  <i className="fa-solid fa-phone fs-4 position-relative text-secondary">
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "llamada"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-message fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mensajes"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "mensaje"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-calendar-days fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Citas"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "cita"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                </li>
                              </ul>
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Cerrado">
            {(droppableProvided) => (
              <div
                className="kanban-block swim-lane"
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <strong className="kanban-title text-white">
                  CIERRES{" "}
                  <span style={{ background: "#367952" }} className="badge">
                    {
                      store.clientes.filter(
                        (cliente) => cliente.status === "Cerrado"
                      ).length
                    }
                  </span>
                </strong>
                <span className="text-white">
                  {" "}
                  $
                  {store.clientes
                    .filter((cliente) => cliente.status === "Cerrado")
                    .reduce((acum, index) => acum + parseInt(index.amount), 0)}
                </span>
                <scroll-container>
                  {store.clientes
                    .filter((cliente) => cliente.status === "Cerrado")
                    .map((cliente, index) => (
                      <Draggable
                        key={cliente.id}
                        draggableId={String(cliente.id)}
                        index={index}
                      >
                        {(draggableProvided, snapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            style={{
                              ...draggableProvided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.5" : "1",
                            }}
                          >
                            <TarjetaCliente cliente={cliente}>
                              <ul className="list-group list-group-flush">
                                <span className="fs-5">{cliente.name}</span>
                                <li className="list-group-item">
                                  <strong>Edad: </strong>
                                  {actions.calcularEdad(cliente.birthdate) +
                                    " años"}
                                </li>
                                <li className="list-group-item">
                                  <strong>Monto: </strong> ${cliente.amount}
                                </li>
                                <li className="list-group-item">
                                  <strong>Confianza: </strong> {cliente.trust}
                                </li>
                                <li
                                  className="list-group-item activity"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Llamadas"
                                  onClick={() => {
                                    setShow(!show);
                                    setIndexToSet(cliente.id);
                                  }}
                                >
                                  <i className="fa-solid fa-phone fs-4 position-relative text-secondary">
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "llamada"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-message fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Mensajes"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "mensaje"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                  <i
                                    className="fa-solid fa-calendar-days fs-4 position-relative text-secondary"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Citas"
                                  >
                                    {" "}
                                    <span
                                      style={{ fontSize: "10px" }}
                                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    >
                                      {
                                        store.clientActivity.filter(
                                          (elem) =>
                                            elem.client_id === cliente.id &&
                                            elem.contact_type === "cita"
                                        ).length
                                      }
                                    </span>
                                  </i>
                                </li>
                              </ul>
                            </TarjetaCliente>
                          </div>
                        )}
                      </Draggable>
                    ))}
                </scroll-container>
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <Activity
        setShow={setShow}
        show={show}
        actividad={store.clientActivity.filter(
          (elem) => elem.client_id === indexToSet
        )}
      />
    </>
  );
};
