import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { AgencyCard } from "../components/agency-company/agencyCard";
import Swal from "sweetalert2";

export const AgencyToSelect = () => {
  const { store, actions } = useContext(Context);

  const [company, setCompany] = useState("");

  const id = store.usuario.id;

  if (company !== "") {
    // console.log(company, id);
    actions.putUserCompany(company, id);
    Swal.fire(` 🤝 Perteneces a ${company}`);
  }

  useEffect(() => {
    if (store.usuario.agency === null) {
      actions.getCompany();
      // console.log(store.company);
      Swal.fire({
        title: "Selecciona la compañia a la que perceneces",
        input: "select",
        inputOptions: store.company.map((com) => {
          `${com.name}: ${com.name}`;
        }),
        inputPlaceholder: "Selecciona la compañia",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== "") {
              resolve(`Selccionaste ${value}`);
              setCompany(value);
            } else {
              resolve("Debes seleccionar una opción");
            }
          });
        },
      });
    }
  }, []);

  return (
    <>
      <h1
        className="text-black text-center mt-4 kanban-head-title"
        style={{ paddingBottom: "3rem" }}
      >
        Selecciona la agencia a la que perteneces
      </h1>
      <AgencyCard />
    </>
  );
};
