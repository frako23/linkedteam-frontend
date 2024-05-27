import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import toast from "react-hot-toast";

function SetRoleManager({ userId }) {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [agen, setAgen] = useState("");
  const [userRole, setUserRole] = useState({
    role: "",
    own_agency: "",
    own_agency_id: "",
    userId: "",
  });
  const [company, setCompany] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    actions.getCompany();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userRole);
    actions.selectRole(userRole);
    handleClose();
    setUserRole({
      role: "",
      own_agency_id: "",
      userId: "",
    });
    handleClose();
    toast.success(
      `Registraste a usuario como ${userRole.role} en con el gerente... 🙌`
    );
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Gerente
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Asignar Gerente a Agencia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputGroup className="mt-3">
                <DropdownButton
                  variant="outline-secondary"
                  title={company.name == "" ? "Compañía" : company.name}
                  id="input-group-dropdown-1"
                >
                  {store.company.map((com, index) => (
                    <Dropdown.Item
                      href="#"
                      key={index}
                      name="company"
                      onClick={async () => {
                        setCompany({
                          name: com.name,
                          id: com.id,
                        });
                        await actions.getAgencies(com.id);
                        // console.log(store.agencies);
                      }}
                      value={company.name}
                    >
                      {com.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </InputGroup>
              {company.name !== "" && store.agencies.length > 0 ? (
                <InputGroup className="mt-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title={agen == "" ? "Agencia" : agen}
                    id="input-group-dropdown-1"
                  >
                    {store.agencies.map((agency, index) => (
                      <Dropdown.Item
                        href="#"
                        key={index}
                        onClick={() => {
                          setUserRole({
                            role: "manager",
                            own_agency_id: agency.id,
                            userId: userId,
                          });
                          setAgen(agency.name);
                          // console.log(userId);
                          // console.log(agency.name);
                        }}
                        value={userRole.own_agency_id}
                      >
                        {agency.name}
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
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default SetRoleManager;
