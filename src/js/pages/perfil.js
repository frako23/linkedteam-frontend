import React, { useContext, useEffect } from "react";
import "../../styles/perfil.css";
import { Context } from "../store/appContext";
import { AdminPannel } from "../components/admin/adminPannel";
import { Pricing } from "./pricing";
import { NewUserPannel } from "../components/dashboard/NewUserPannel";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    // actions.getUsuario();
    actions.setHeader("Tablero de control");
    actions.setNotNav(false);
    // actions.closedArray();
    // actions.amountSumClosed();
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

  return (
    <>
      {/* pagina */}
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : store.usuario.role === "admin" ? (
        <AdminPannel />
      ) : (
        // <UserPannel />
        <NewUserPannel />
      )}
    </>
  );
};
