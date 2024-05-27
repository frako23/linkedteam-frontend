import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

function CreateCompany() {
  const [show, setShow] = useState(false);
  const { actions } = useContext(Context);
  const [company, setCompany] = useState({
    name: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleForm = ({ target }) => {
    setCompany({ [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(company);
    actions.postCompany(company);
    setCompany({
      name: "",
    });
    handleClose();
    Swal.fire({
      title: "Registraste la Compañía correctamente 🙌",
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Crear Compañía
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Compañía</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Compañía</Form.Label>
              <Form.Control
                type="text"
                placeholder="CICA LIFE"
                autoFocus
                name="name"
                onChange={handleForm}
                value={company.name}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateCompany;
