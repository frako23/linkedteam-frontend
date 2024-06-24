import React, { useEffect, useState } from "react";
import "../../../styles/dashboard.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

export const Activity = ({ show, onClose, actividad }) => {
  console.log(actividad);

  return (
    <>
      <Modal show={show} onHide={onClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Interacciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Row>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: "5rem" }}>Fecha</th>
                      <th style={{ width: "5rem" }}>Tipo de contacto</th>
                      <th>Comentario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actividad.map((act, index) => (
                      <tr key={index}>
                        <td scope="row">{act.date}</td>
                        <td>{act.contact_type}</td>
                        <td className=" text-wrap">{act.comment}</td>
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

Activity.propTypes = {
  show: PropTypes.bool,
  actividad: PropTypes.object,
  onCLose: PropTypes.func,
};
