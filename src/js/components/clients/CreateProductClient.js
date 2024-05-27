import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Col, Row } from "react-bootstrap";

function CreateProductClient({ clientId }) {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [clienteProducto, setClienteProducto] = useState({
    amount: "",
    date_of_closing: "",
    payment_recurrence: "",
    notes: "",
  });
  const [productId, setProductId] = useState({
    company: "",
    id: 0,
    product_description: "",
    product_name: "",
    product_type: "",
    user_id: 0,
  });
  console.log(clientId);
  // const id = sessionStorage.getItem("usuario.id");
  const handleForm = ({ target }) => {
    setClienteProducto({ ...clienteProducto, [target.name]: target.value });
  };
  const handleProductId = ({ target }) => {
    setProductId(
      store.productos.find((producto) => producto.product_name == target.value)
    );
  };

  useEffect(() => {
    actions.getProducts();
  }, []);
  console.log(store.productos);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(clienteProducto, store.usuario.own_agency.id);
    actions.postClienteProductos(clienteProducto, clientId, productId.id);
    setClienteProducto({
      amount: "",
      date_of_closing: "",
      payment_recurrence: "",
      notes: "",
    });
    handleClose();
    toast.success("Registraste el producto correctamente");
    actions.getProducts();
  };
  console.log(clienteProducto, productId);
  return (
    <>
      <button
        data-toggle="tooltip"
        title="Asignar Producto al Cliente"
        className="btn btn-light rounded-pill ms-2 border w-25-dark fw-bold text-white"
        style={{ background: "#695cfe" }}
        onClick={handleShow}
      >
        <i className="fa-solid fa-folder-plus"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Registra el producto para: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Producto*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="product_name"
                    value={productId.product_name}
                    onChange={handleProductId}
                    required
                  >
                    <option
                      className="text-center"
                      style={{ backgroundColor: "white" }}
                      value=""
                    ></option>
                    {store.productos.length > 0 ? (
                      store.productos.map((producto) => (
                        <option
                          key={producto.id}
                          className="text-center"
                          style={{ backgroundColor: "white" }}
                          value={producto.product_name}
                        >
                          <span>{producto.product_name}</span>
                        </option>
                      ))
                    ) : (
                      <option
                        className="text-center"
                        style={{ backgroundColor: "white" }}
                        value=""
                      >
                        No hay productos guardados
                      </option>
                    )}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Fecha de cierre*</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="06/05/2024"
                    autoFocus
                    name="date_of_closing"
                    value={clienteProducto.date_of_closing}
                    onChange={handleForm}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Monto*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="5000"
                    autoFocus
                    name="amount"
                    value={clienteProducto.amount}
                    onChange={handleForm}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Frecuencia de pago*</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="payment_recurrence"
                    value={clienteProducto.payment_recurrence}
                    onChange={handleForm}
                    required
                  >
                    <option className="text-center" value=""></option>
                    <option className="text-center" value="mensual">
                      Mensual
                    </option>
                    <option className="text-center" value="trimestral">
                      Trimestral
                    </option>
                    <option className="text-center" value="semestral">
                      Semestral
                    </option>
                    <option className="text-center" value="anual">
                      Anual
                    </option>
                  </Form.Select>
                </Col>
              </Row>

              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                maxLength="1000"
                value={clienteProducto.notes}
                onChange={handleForm}
              />
            </Form.Group>
            <span className="fw-bolder">* Campos requeridos</span>
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

export default CreateProductClient;
