import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import * as XLSX from "xlsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ModalLoader } from "../utils/ModalLoader";

export const ImportFromExcel = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState([]);
  const handleClose = () => {
    setShow(false);
    setData([]);
  };
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  // function excelSerialDateToJSDate(serialDate) {
  //   const excelStartDate = new Date(Date.UTC(2039, 12, 2));
  //   const utc_days = Math.floor(
  //     serialDate - excelStartDate.getTime() / 86400000
  //   );
  //   const utc_value = utc_days * 86400;
  //   return new Date(utc_value * 1000);
  // }
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      // let parsedData = XLSX.utils.sheet_to_json(sheet);

      // Convertir las fechas del formato de Excel al formato de JavaScript
      // parsedData = parsedData.map((item) => {
      //   if (item.birthdate_) {
      //     // Verifica que la propiedad 'birthdate_' exista
      //     console.log(item.birthdate_); // Debería mostrar el valor original en formato de Excel
      //     item.birthdate = excelSerialDateToJSDate(Number(item.birthdate_)); // Convierte y asigna a 'birthdate'
      //     console.log(item.birthdate); // Debería mostrar la fecha convertida
      //   }
      //   return item;
      // });
      // console.log(parsedData);
      setData(parsedData);
    };
  };

  const uploadData = (data) => {
    for (let i = 0; i < data.length; i++) {
      actions.postClientes(data[i]);
    }
  };

  // const dataCopy = data.forEach((obj) => {
  //   delete obj.__rowNum__;
  // });

  return (
    <>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={handleShow}
        style={{ height: "fit-content" }}
      >
        Importar <i className="fa-solid fa-file-excel"></i>
      </button>
      <ModalLoader />
      <Modal show={show} onHide={handleClose} size="xl">
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>
              Importar Data <i className="fa-solid fa-file-excel"></i>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ display: "inline-grid", width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              <a
                href="https://github.com/frako23/linkedteam-frontend/raw/main/public/LinkedTeam-template.xlsx"
                download="LinkedTeam-template"
                className="btn btn-primary"
              >
                Descargar plantilla
              </a>
            </div>
            {console.log(data)}
            {data.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ color: "black" }}>Nombre y Apellido</th>
                      <th style={{ color: "black" }}>Fecha de Nacimiento</th>
                      <th style={{ color: "black" }}>Email</th>
                      <th style={{ color: "black" }}>Celular</th>
                      <th style={{ color: "black" }}>Monto</th>
                      <th style={{ color: "black" }}>Etiqueta</th>
                      <th style={{ color: "black" }}>Estatus</th>
                      <th style={{ color: "black" }}>Nivel de Confianza</th>
                      <th style={{ color: "black" }}>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr key={index}>
                        <td key={index} style={{ color: "black" }}>
                          {row.name}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.birthdate}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.email}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.cellphone}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.amount}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.status}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.trust}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.tag}
                        </td>
                        <td key={index} style={{ color: "black" }}>
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  actions.setLoader(true);
                  uploadData(data);
                  handleClose();
                  actions.setLoader(false);
                }}
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
