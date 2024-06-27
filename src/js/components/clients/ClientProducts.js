import React, { useContext, useEffect } from "react";
import "../../../styles/dashboard.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import { Context } from "../../store/appContext";

export const ClientProducts = ({ show, onClose, client }) => {
  const { store, actions } = useContext(Context);
  console.log(show, client);
  useEffect(() => {
    actions.getAllClienteProductos(client.id);
  }, [client.id]);
  console.log(store.allClienteProductos);
  return (
    <>
      <Modal show={show} onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Productos asociados a {client.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: "5rem" }}>Fecha de Inicio</th>
                      <th style={{ width: "5rem" }}>Tipo de Seguro</th>
                      <th style={{ width: "5rem" }}>Empresa</th>
                      <th style={{ width: "5rem" }}>Producto</th>
                      <th style={{ width: "5rem" }}>Monto</th>
                      <th style={{ width: "5rem" }}>Modalidad de pago</th>
                      <th>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.allClienteProductos.map((clientProduct, index) => (
                      <tr key={index}>
                        <td scope="row">{clientProduct.date_of_closing}</td>
                        <td scope="row">{clientProduct.product_type}</td>
                        <td scope="row">{clientProduct.company}</td>
                        <td scope="row">{clientProduct.product_name}</td>
                        <td scope="row">$ {clientProduct.amount}</td>
                        <td scope="row">{clientProduct.payment_recurrence}</td>
                        <td className=" text-wrap" scope="row">
                          {clientProduct.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

ClientProducts.propTypes = {
  show: PropTypes.bool,
  client: PropTypes.object,
};
