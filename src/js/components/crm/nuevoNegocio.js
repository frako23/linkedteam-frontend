import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import toast from "react-hot-toast";

export const Nuevonegocio = () => {
  const { actions } = useContext(Context);
  const [cliente, setCliente] = useState({
    name: "",
    birthdate: "",
    email: "",
    cellphone: "",
    amount: "",
    status: "Prospecto",
    trust: "Alta",
    notes: "",
    tag: "white",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cliente);
    actions.postClientes(cliente);
    handleClose();
    setCliente({
      name: "",
      birthdate: "",
      email: "",
      cellphone: "",
      amount: "",
      status: "Prospecto",
      trust: "Alta",
      notes: "",
      tag: "white",
    });
  };

  const handleForm = ({ target }) => {
    setCliente({ ...cliente, [target.name]: target.value });
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-sm btn-outline-secondary"
        style={{ height: "fit-content" }}
      >
        Nuevo Cliente
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Datos del cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Nombre y Apellido*</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="name"
                    placeholder="Nombre del cliente"
                    onChange={handleForm}
                    value={cliente.name}
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Please ingresa Nombre y Apellido del prospecto
                  </Form.Control.Feedback>
                </Col>
                <Col>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="cellphone"
                    placeholder="04XX-XXXXXXX"
                    onChange={handleForm}
                    value={cliente.cellphone}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    placeholder="nombre@correo.com"
                    onChange={handleForm}
                    value={cliente.email}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    onChange={handleForm}
                    value={cliente.birthdate}
                    autoFocus
                  />
                </Col>
              </Row>
            </Form.Group>
            {/* ------------------ SECCIÓN PARA AGREGAR CELULAR E EMAIL ------------------ */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Monto</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="5000"
                    name="amount"
                    value={cliente.amount}
                    onChange={handleForm}
                    autoFocus
                  />
                </Col>
                <Col>
                  <Form.Label>Etiqueta:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="tag"
                    defaultValue="white"
                    value={cliente.tag}
                    onChange={handleForm}
                  >
                    <option
                      className="text-center"
                      style={{ backgroundColor: "white" }}
                      value="white"
                    >
                      Blanco
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "black" }}
                      value="black"
                    >
                      Negro
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "blue" }}
                      value="blue"
                    >
                      Azúl
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "grey" }}
                      value="grey"
                    >
                      Gris
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "green" }}
                      value="green"
                    >
                      Verde
                    </option>
                    <option
                      className="text-center "
                      style={{ backgroundColor: "yellow" }}
                      value="yellow"
                    >
                      Amarillo
                    </option>
                    <option
                      className="text-center"
                      style={{ backgroundColor: "orange" }}
                      value="orange"
                    >
                      Naranja
                    </option>
                    <option
                      className="text-center"
                      style={{ backgroundColor: "pink" }}
                      value="pink"
                    >
                      Rosado
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "purple" }}
                      value="purple"
                    >
                      Púrpura
                    </option>
                    <option
                      className="text-center text-white"
                      style={{ backgroundColor: "red" }}
                      value="red"
                    >
                      Rojo
                    </option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Estatus:*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="status"
                    value={cliente.status}
                    defaultValue="Prospecto"
                    onChange={handleForm}
                  >
                    <option value=""></option>
                    <option value="Prospecto">Prospecto</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Primera Cita">Primera Cita</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Cerrado">Cerrado</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Nivel de confianza:*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="trust"
                    value={cliente.trust}
                    onChange={handleForm}
                    defaultValue="Alta"
                  >
                    <option value=""></option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            {/* ----------------------- SECCIÓN PARA AGREGAR NOTAS ----------------------- */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Notas</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                rows={3}
                placeholder="Breve descripción ¿hijos? ¿espos@?"
                value={cliente.notes}
                onChange={handleForm}
              />
              <span className="fw-bolder">* Campos requeridos</span>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
