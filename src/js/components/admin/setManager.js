import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

function SetManager({ userId, userName }) {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newManager, setNewManager] = useState({
    name: "",
    id: 0,
    userId: userId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userRole);
    actions.putManager(newManager);
    handleClose();
  };

  const managers = store.totalUsuarios.filter(
    (usuario) => usuario.role == "manager"
  );

  console.log(managers);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Asignar Gerente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Gerente a {userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Asignar <strong>{newManager.name}</strong> como su Gerente
          <div className="d-flex justify-content-center pt-5">
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              {managers.length > 0 &&
                managers.map((usuario) => {
                  return (
                    <div key={usuario.id}>
                      <Dropdown.Item
                        onClick={() =>
                          setNewManager({
                            ...newManager,
                            name: usuario.name,
                            id: usuario.id,
                          })
                        }
                      >
                        {usuario.name}
                      </Dropdown.Item>
                    </div>
                  );
                })}
            </DropdownButton>
          </div>
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

export default SetManager;

SetManager.propTypes = {
  userId: PropTypes.string,
  userName: PropTypes.string,
};
