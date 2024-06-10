import React, { useContext, useEffect } from "react";
import "../../styles/perfil.css";
import { Context } from "../store/appContext";
import { AdminPannel } from "../components/admin/adminPannel";
import { NewUserPannel } from "../components/dashboard/NewUserPannel";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    // actions.closedArray();
    // actions.amountSumClosed();
    actions.setHeader("Tablero de control");
    actions.setNotNav(false);
  }, []);
  useEffect(() => {
    // actions.getUsuario();
    actions.getClientes();
    actions.closedArray();
    actions.amountSumClosed();
  }, [store.clientes.length]);

  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  const role = localStorage.getItem("usuario.role");
  return (
    <>
      {/* pagina */}
      {role === "admin" ? (
        <AdminPannel />
      ) : (
        // <UserPannel />
        <NewUserPannel />
      )}
    </>
  );
};
