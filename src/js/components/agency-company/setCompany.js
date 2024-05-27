import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Context } from "../../store/appContext";
import Swal from "sweetalert2";

function SetCompany() {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const [company, setCompany] = useState("");
  const [agency, setAgency] = useState({
    name: "",
    id: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => actions.getCompany(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(agency);
    actions.selectAgency(agency.id);
    setCompany();
    handleClose();
    Swal.fire(
      ` 🤝 Perteneces a la agencia ${agency.name} de le empresa ${company}`
    );
  };

  return (
    <>
      <button className="button-single" onClick={handleShow}>
        Elige tú compañia y luego elige tú agencia
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Elige tú compañia y luego elige tú agencia</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <InputGroup className="mt-3">
                <DropdownButton
                  variant="outline-secondary"
                  title={company == "" ? "Elige tu compañía" : company}
                  id="input-group-dropdown-1"
                >
                  {store.company.map((com, index) => (
                    <Dropdown.Item
                      href="#"
                      key={index}
                      onClick={() => {
                        setCompany(com.name);
                        actions.getAgencies(com.id);
                      }}
                      value={com.name}
                    >
                      {com.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>
              {company !== "" && store.agencies.length > 0 ? (
                <InputGroup className="mt-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title={agency.name == "" ? "Agencia" : agency.name}
                    id="input-group-dropdown-1"
                  >
                    {store.agencies.map((agen, index) => (
                      <Dropdown.Item
                        href="#"
                        key={index}
                        onClick={() =>
                          setAgency({ name: agen.name, id: agen.id })
                        }
                        value={agen.name}
                      >
                        {agen.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </InputGroup>
              ) : (
                ""
              )}
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

export default SetCompany;
