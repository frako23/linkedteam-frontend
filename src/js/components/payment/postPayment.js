import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";

function postPayment() {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [payment, setPayment] = useState({
    payment_date: "",
    notes: "",
    reference: "",
    payment_method: "",
    amount: "",
  });
  const handleForm = ({ target }) => {
    setPayment({ ...payment, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getCompany();
  }, []);

  const paymentType = [
    {
      type: "Zelle",
      data: "Francisco Orozco frako23@gmail.com",
    },
    {
      type: "Pago Móvil",
      data: "Mercantil 04242526757 16620687",
    },
    {
      type: "Paypal",
      data: "Francisco Orozco frako23@gmail.com",
    },
    {
      type: "Binance Pay",
      data: "Francisco Orozco frako23@gmail.com",
    },
    {
      type: "Zinli",
      data: "Francisco Orozco frako23@gmail.com",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(payment);
    actions.postPayment(payment);
    setPayment({
      payment_date: "",
      notes: "",
      reference: "",
      payment_method: "",
      amount: 0,
    });
    handleClose();
    Swal.fire({
      title: "Haz registrado tu pago correctamente 👌",
      confirmButtonText: "OK",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Registra tu pago
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registra tu pago</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="dropdown-type">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Forma de pago</Form.Label>
                <InputGroup className="mt-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title={
                      payment.payment_method == ""
                        ? "Tipo de pago"
                        : payment.payment_method
                    }
                    id="input-group-dropdown-1"
                  >
                    {paymentType.map((payment, index) => (
                      <Dropdown.Item
                        href="#"
                        key={index}
                        name="company"
                        required
                        onClick={() =>
                          setPayment({
                            ...payment,
                            payment_method: payment.type,
                          })
                        }
                        value={payment.type}
                      >
                        {payment.type}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </InputGroup>
              </Form.Group>

              <div style={{ width: "11rem" }}>
                <h4>Datos</h4>
                <span>{payment.data}</span>
              </div>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Monto del pago</Form.Label>
              <Form.Control
                type="number"
                placeholder="Colocar el monto en Bs o $"
                autoFocus
                required
                name="amount"
                value={payment.amount}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fecha del pago</Form.Label>
              <Form.Control
                type="date"
                placeholder="KGC Group"
                autoFocus
                required
                name="payment_date"
                value={payment.payment_date}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Número de referencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="32utfdL"
                autoFocus
                required
                name="reference"
                value={payment.reference}
                onChange={handleForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                maxLength="1000"
                value={payment.notes}
                onChange={handleForm}
              />
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

export default postPayment;
