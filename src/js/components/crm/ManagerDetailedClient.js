import React, { useState } from "react";
import "../../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";

export const ManagerDetailedClient = ({ prospecto }) => {
  const [show, setShow] = useState(false);
  const [cliente, setCliente] = useState({
    name: prospecto.name,
    birthdate: prospecto.birthdate,
    email: prospecto.email,
    cellphone: prospecto.cellphone,
    amount: prospecto.amount,
    trust: prospecto.trust,
    tag: prospecto.tag,
    status: prospecto.status,
    notes: prospecto.notes,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleForm = ({ target }) => {
    setCliente({ [target.name]: target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Detalle"
        onClick={handleShow}
      >
        <i className="bx bxs-detail fs-5"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{cliente.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Nombre y Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Nombre del cliente"
                    value={cliente.name}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="tel"
                    name="cellphone"
                    placeholder="04XX-XXXXXXX"
                    value={cliente.cellphone}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    placeholder="nombre@correo.com"
                    value={cliente.email}
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="birthdate"
                    value={cliente.birthdate}
                    disabled
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
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label>Etiqueta:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="status"
                    value={cliente.tag}
                    disabled
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
                  <Form.Label>Estatus:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="status"
                    value={cliente.status}
                    disabled
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
                  <Form.Label>Nivel de confianza:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="trust"
                    value={cliente.trust}
                    disabled
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
                disabled
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ManagerDetailedClient.propTypes = {
  prospecto: PropTypes.object,
};
