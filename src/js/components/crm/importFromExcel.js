import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import * as XLSX from "xlsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Swal from "sweetalert2";

export const ImportFromExcel = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState([]);
  const handleClose = () => {
    setShow(false);
    setData([]);
  };
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };
  const uploadData = (clientes) => {
    Object.freeze(clientes);
    const dataCopy = [...clientes];
    console.log(dataCopy);
    for (let i = 0; i < dataCopy.length; i++) {
      delete dataCopy[i].__rowNum__;
    }
    console.log(dataCopy);
    // actions.postClientes(clientes);
  };

  // const remove__RowNum__ = (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     delete data[i].__rowNum__;
  //   }
  //   return data;
  // };

  return (
    <>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={handleShow}
        style={{ height: "fit-content" }}
      >
        Importar <i className="fa-solid fa-file-excel"></i>
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              Importar Data <i className="fa-solid fa-file-excel"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: "inline-grid" }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
            />
            {console.log(data)}
            {data.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ color: "black" }}>Nombre</th>
                    <th style={{ color: "black" }}>Monto</th>
                    <th style={{ color: "black" }}>Fecha de Nacimiento</th>
                    <th style={{ color: "black" }}>Confianza</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      <td key={index} style={{ color: "black" }}>
                        {row.name}
                      </td>
                      <td key={index} style={{ color: "black" }}>
                        {row.amount}
                      </td>
                      <td key={index} style={{ color: "black" }}>
                        {row.birthdate}
                      </td>
                      <td key={index} style={{ color: "black" }}>
                        {row.trust}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  // console.log(data);
                  uploadData(data);
                }}
                // uploadData(data)
                // style={{ width: "12rem", marginInline: "0.5rem" }}
              >
                {" "}
                Cargar la data <i className="fa-solid fa-file-excel"></i>
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};
