import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";

export default function SortCRM() {
  const { actions } = useContext(Context);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState({
    amount: "Monto",
    age: "Edad",
    trust: "Confianza",
  });
  // const [filteredUsers, setFilteredUsers] = useState("")

  return (
    <div style={{}}>
      <div className="form-floating mt-3 mb-1">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            actions.findByName(name);
          }}
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput" className="text-secondary">
          Buscar cliente
        </label>
      </div>
      <div className="input-group mb-3 sort-search w-100">
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border w-25"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.amount}
        </button>
        <ul className="dropdown-menu w-25">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAmount(300, 1499);
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
                actions.filterByAmount(1500, 3499);
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
                actions.filterByAmount(4000, 9999);
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
                actions.filterByAmount(10000, 50000);
                setFilter({ ...filter, amount: "Más de $10000" });
              }}
            >
              Más de $10000
            </button>
          </li>
        </ul>
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border w-25"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.age}
        </button>
        <ul className="dropdown-menu w-25">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByAge(0, 18);
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
                actions.filterByAge(19, 29);
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
                actions.filterByAge(30, 39);
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
                actions.filterByAge(40, 54);
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
                actions.filterByAge(55, 69);
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
                actions.filterByAge(70, 120);
                setFilter({ ...filter, age: "Más de 70 años" });
              }}
            >
              más de 70 años
            </button>
          </li>
        </ul>
        <button
          className="btn btn-dark dropdown-toggle rounded-pill border w-25"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {filter.trust}
        </button>
        <ul className="dropdown-menu w-25">
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                actions.filterByTrust("Alta");
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
                actions.filterByTrust("Media");
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
                actions.filterByTrust("Baja");
                setFilter({ ...filter, trust: "Baja" });
              }}
            >
              Baja
            </button>
          </li>
        </ul>
        <button
          className="btn btn-light rounded-pill border w-25-dark fw-bold text-white"
          style={{ background: "#695cfe" }}
          type="button"
          aria-expanded="false"
          onClick={() => {
            actions.getClientes();
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
