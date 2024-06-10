import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Badge, Col, Row } from "react-bootstrap";

function CreateProduct() {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState({
    company: "",
    product_name: "",
    product_type: "",
    product_description: "",
  });
  const id = localStorage.getItem("usuario.id");
  const handleForm = ({ target }) => {
    setProducts({ ...products, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getProducts();
  }, []);
  console.log(store.productos);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(products, store.usuario.own_agency.id);
    actions.postProducts(products);
    setProducts({
      company: "",
      product_name: "",
      product_type: "",
      product_description: "",
    });
    handleClose();
    toast.success("Registraste el producto correctamente");
    actions.getProducts();
  };

  return (
    <>
      <button
        className="btn btn-light rounded-pill ms-2 border w-25-dark fw-bold text-white"
        style={{ background: "#695cfe" }}
        onClick={handleShow}
      >
        Nuevo Producto
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Crea tu producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <Col>
                  <Form.Label>Productos Cargados</Form.Label>
                  <div className="d-flex gap-3 ">
                    {store.productos.length > 0 ? (
                      store.productos.map((producto) => (
                        <Badge key={producto.id} bg="dark">
                          <span>{producto.product_name}</span>
                        </Badge>
                      ))
                    ) : (
                      <h5>Aún no tienes productos cargados</h5>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Empresa*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CICA LIFE, Best Doctor, VUMI..."
                    autoFocus
                    name="company"
                    value={products.company}
                    onChange={handleForm}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Nombre de la póliza*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fredom 20"
                    autoFocus
                    name="product_name"
                    value={products.product_name}
                    onChange={handleForm}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>Tipo de póliza*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Seguro de Vida"
                    autoFocus
                    name="product_type"
                    value={products.product_type}
                    onChange={handleForm}
                    required
                  />
                </Col>
              </Row>

              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="product_description"
                maxLength="1000"
                value={products.product_description}
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

export default CreateProduct;
