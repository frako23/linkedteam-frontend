import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { agenciesData } from "../../data/agenciesData";
import Modal from "react-bootstrap/Modal";

export function AgencyCard() {
  let fullData = agenciesData;
  const { actions } = useContext(Context);
  const [smShow, setSmShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

  return (
    <div className="container courses__container">
      {fullData.map((data) => {
        return (
          <article className="course" key={data.id}>
            <div>
              <img className="course__image2" src={data.logoUrl} />
            </div>
            <div className="course__info">
              <h4>
                <strong>Agencia:</strong> {data.name}
              </h4>
              <h4>
                {" "}
                <strong>Gerente:</strong> {data.manager}
              </h4>

              <button
                onClick={() => {
                  setSmShow(true);
                  setModalData(data);
                }}
                className="course__btn"
              >
                Seleccionar
              </button>
            </div>
          </article>
        );
      })}
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            ¿Deseas agregarte a la agencia <strong>{modalData.name}</strong>{" "}
            Gerente <strong>{modalData.manager}</strong>?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success"
              onClick={() => {
                actions.selectAgency({ agency_ybt: modalData.name });
                setSmShow(false);
                navigate("/perfil");
              }}
            >
              Si
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={() => setSmShow(false)}
            >
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
