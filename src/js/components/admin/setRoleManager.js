import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

function SetRoleManager({ userId, userName }) {
  const [show, setShow] = useState(false);
  const { actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userRole = {
    userId: userId,
    role: "manager",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userRole);
    actions.selectRole(userRole);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Gerente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Role Generente a {userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estas seguro que quieres asignar role gerente a {userName} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Si, Guardar los cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SetRoleManager;

SetRoleManager.propTypes = {
  userId: PropTypes.string,
  userName: PropTypes.string,
};
