import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import toast from "react-hot-toast";

export const CreateClient = () => {
  const { actions } = useContext(Context);
  const [cliente, setCliente] = useState({
    name: "",
    birthdate: "",
    email: "",
    cellphone: "",
    amount: "",
    status: "Cliente",
    trust: "Alta",
    notes: "",
    tag: "",
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
      status: "Cliente",
      trust: "Alta",
      notes: "",
      tag: "",
    });
    toast.success("Tu cliente fue registrado correctamente");
  };

  const handleForm = ({ target }) => {
    setCliente({ ...cliente, [target.name]: target.value });
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-light rounded-pill border w-25-dark fw-bold text-white"
        style={{ background: "#695cfe" }}
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
              </Row>
            </Form.Group>
            {/* ------------------ SECCIÓN PARA AGREGAR CELULAR E EMAIL ------------------ */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
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
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    onChange={handleForm}
                    value={cliente.birthdate}
                    autoFocus
                  />
                </Col>
                {/* <Col>
                  <Form.Label>Fecha de cierre*</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_closing"
                    onChange={handleFormProducto}
                    value={clienteProducto.date_of_closing}
                    autoFocus
                  />
                </Col> */}
                {/* <Col>
                  <Form.Label>Recurrencia de pago*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="payment_recurrence"
                    value={clienteProducto.payment_recurrence}
                    onChange={handleFormProducto}
                  >
                    <option value=""></option>
                    <option value="Prospecto">Mensual</option>
                    <option value="Contactado">Trimestral</option>
                    <option value="Primera Cita">Semestral</option>
                    <option value="Negociación">Anual</option>
                    <option value="Cerrado">Otro</option>
                  </Form.Select>
                </Col> */}
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
