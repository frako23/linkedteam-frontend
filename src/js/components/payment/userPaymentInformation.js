import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";

function UserPaymentInformation(index) {
  const [show, setShow] = useState(false);
  const { store, actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleGetPayments = () => actions.getPayments(index.id);

  // console.log(index.id);
  // console.log(store.payments);

  return (
    <>
      <div className="single-btn">
        <Button
          variant="light"
          onClick={() => {
            setShow(true);
            handleGetPayments();
          }}
        >
          Historial
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} size={"xl"}>
        <table className="table payment-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Monto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Referencia</th>
              <th scope="col">Notas</th>
              <th scope="col">Estatus</th>
            </tr>
          </thead>
          <tbody>
            {store.payments.map((payment) => (
              <tr key={payment.id}>
                <th scope="row">{payment.id}</th>
                <td>{payment.amount}</td>
                <td>{payment.payment_method}</td>
                <td>{payment.payment_date}</td>
                <td>{payment.reference}</td>
                <td>{payment.notes}</td>
                <td className="payment-approvement">
                  <span>{payment.status}</span>
                  <button
                    className="btn btn-success"
                    // onClick={(e) =>
                    //   actions.activateUser({
                    //     status: "inactive",
                    //     user_id: usuario.id,
                    //   })
                    // }
                  >
                    Aprobar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default UserPaymentInformation;
