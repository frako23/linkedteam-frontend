import React, { useContext } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const ModalLoader = () => {
  const { store } = useContext(Context);
  return (
    <Modal
      size="sm"
      show={store.loader}
      onHide={store.loader}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <Spinner animation="border" variant="primary" />
          Cargando...
        </Modal.Title>
      </Modal.Header>
    </Modal>
  );
};
