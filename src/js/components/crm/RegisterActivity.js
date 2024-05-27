import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export const RegisterActivity = ({ id }) => {
  const { store, actions } = useContext(Context);
  const [activity, setActivity] = useState({
    date: "",
    contact_type: "",
    comment: "",
  });
  const handleActivity = (e) => {
    setActivity({ ...activity, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity(id);
    }
  }, [store.token]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(activity);
    actions.postClientActivity(activity, id);
    setActivity("");
    toast.success("La actividad fue registrada");
  };
  return (
    <>
      <button
        onClick={handleShow}
        className="btn btn-success"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Registra actividad"
      >
        <i className="fa-solid fa-pen-to-square fs-5"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Datos del cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    className="form-control"
                    name="date"
                    id="inputEmail3"
                    value={activity.date}
                    onChange={(e) => handleActivity(e)}
                    autoFocus
                  />
                </Col>
              </Row>
            </Form.Group>
            {/* ------------------ SECCIÓN PARA AGREGAR CELULAR E EMAIL ------------------ */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Tipo de contacto</Form.Label>
                  <Form.Select
                    className="form-select"
                    aria-label="Default select example"
                    name="contact_type"
                    value={activity.contact_type}
                    onChange={(e) => handleActivity(e)}
                    required
                  >
                    <option value="">Selectiona el tipo de contacto</option>
                    <option value="llamada">Llamada</option>
                    <option value="mensaje">Mensaje o correo</option>
                    <option value="cita">Cita </option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            {/* ----------------------- SECCIÓN PARA AGREGAR NOTAS ----------------------- */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                placeholder="El cliente ..."
                value={activity.comment}
                onChange={(e) => handleActivity(e)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" type="submit" onClick={handleClose}>
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

RegisterActivity.propTypes = {
  id: PropTypes.number,
};
