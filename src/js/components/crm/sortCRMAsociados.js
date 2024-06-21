import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export default function SortCRMAsociados({ id }) {
  // console.log(id);
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState({
    amount: "Monto",
    age: "Edad",
    trust: "Confianza",
  });
  // const [filteredUsers, setFilteredUsers] = useState("")

  // console.log(store.usersByAgency, store.userClients);

  return (
    <div style={{}}>
      <label className="text-white d-flex justify-content-center">
        Buscador y filtros
      </label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del Prospecto"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            actions.findByNameAsociados(name);
          }}
        />
      </div>
      <div className="input-group mb-3 sort-search">
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.amount}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.getUserClients(id);
                setName("");
                setFilter({
                  amount: "Monto",
                  age: "Edad",
                  trust: "Confianza",
                });
              }}
            >
              Reiniciar
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAmountAsociados(300, 1499);
                setFilter({ ...filter, amount: "$300 a $1499" });
              }}
            >
              Entre $300 y $1499
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAmountAsociados(1500, 3499);
                setFilter({ ...filter, amount: "$1500 a $3499" });
              }}
            >
              Entre $1500 y $3999
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAmountAsociados(4000, 9999);
                setFilter({ ...filter, amount: "$4000 a $9999" });
              }}
            >
              Entre $4000 y $9999
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAmountAsociados(10000, 50000);
                setFilter({ ...filter, amount: "Más de $10000" });
              }}
            >
              Más de $10000
            </button>
          </li>
        </ul>
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.age}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.getUserClients(id);
                setName("");
                setFilter({
                  amount: "Monto",
                  age: "Edad",
                  trust: "Confianza",
                });
              }}
            >
              Reiniciar
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(0, 18);
                setFilter({ ...filter, age: "0 a 18 años" });
              }}
            >
              Entre 0 y 18 años
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(19, 29);
                setFilter({ ...filter, age: "19 a 29 años" });
              }}
            >
              Entre 19 y 29 años
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(30, 39);
                setFilter({ ...filter, age: "30 a 39 años" });
              }}
            >
              Entre 30 y 39 años
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(40, 54);
                setFilter({ ...filter, age: "40 a 54 años" });
              }}
            >
              Entre 40 y 54 años
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(55, 69);
                setFilter({ ...filter, age: "55 a 69 años" });
              }}
            >
              Entre 55 y 69 años
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAgeAsociados(70, 120);
                setFilter({ ...filter, age: "Más de 70 años" });
              }}
            >
              más de 70 años
            </button>
          </li>
        </ul>
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.trust}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.getUserClients(id);
                setName("");
                setFilter({
                  amount: "Monto",
                  age: "Edad",
                  trust: "Confianza",
                });
              }}
            >
              Reiniciar
            </button>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByTrustAsociados("Alta");
                setFilter({ ...filter, trust: "Alta" });
              }}
            >
              Alta
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByTrustAsociados("Media");
                setFilter({ ...filter, trust: "Media" });
              }}
            >
              Media
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByTrustAsociados("Baja");
                setFilter({ ...filter, trust: "Baja" });
              }}
            >
              Baja
            </button>
          </li>
        </ul>
        <button
          className="btn btn-light rounded-pill border-dark fw-bold"
          type="button"
          aria-expanded="false"
          onClick={() => {
            actions.getUserClients(id);
            setName("");
            setFilter({
              amount: "Monto",
              age: "Edad",
              trust: "Confianza",
            });
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

SortCRMAsociados.propTypes = {
  id: PropTypes.string,
};
