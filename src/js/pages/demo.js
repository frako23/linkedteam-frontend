import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/index.css";
import { ModalLoader } from "../components/utils/ModalLoader";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/perfil");
    }
  }, [store.token]);
  return (
    <div
      className="px-4 pt-5 px-md-5 text-center text-lg-start background-linkedin"
      style={{ height: "100vh", overflow: "auto" }}
    >
      <div className="row gx-lg-5 align-items-center mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0" style={{ z: "10" }}>
          <h1
            className="my-5 display-5 fw-bold ls-tight"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            <span
              style={{
                color: "rgb(167, 100, 255",
              }}
            >
              LinkedTeam
            </span>
            <br />
            La mejor herramienta
            <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              para hacer crecer tu negocio
            </span>
          </h1>
          <p
            className="mb-4 opacity-70"
            style={{ color: "hsl(218, 81%, 85%)" }}
          >
            Con LinkedTeam podrás no solo controlar tu gestión personal de
            ventas sino también formarte y si tienes equipo podrás formarlos y
            monitorear su desempeño, todo con el objetivo de incrementar tus
            ventas
          </p>
        </div>

        <div className="col-lg-6 mb-5 mb-lg-0 d-flex justify-content-center position-relative">
          {/* <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div> */}

          <div
            className="card bg-glass"
            style={{ width: "auto", height: "auto" }}
          >
            <div className="card-body text-dark px-4 py-5 px-md-5 ">
              <form>
                <div className="d-flex justify-content-center flex-column ">
                  <h5 className="d-flex justify-content-center mb-4">
                    ¿Quieres probar la app?
                  </h5>

                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={() => {
                      actions.login("gerente@correo.com", "gerente");
                      actions.setLoader(true);
                    }}
                  >
                    Prueba la app como <b>GERENTE</b>
                  </button>
                  <ModalLoader />
                  <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={() => {
                      actions.login("asociado1@correo.com", "asociado1");
                      actions.setLoader(true);
                    }}
                  >
                    Prueba la app como <b>ASOCIADO</b>
                  </button>
                </div>
                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>
                    ¿Quieres registrarte?
                    <Link
                      to="/signup"
                      style={{
                        color: "rgb(167, 100, 255)",
                        fontWeight: "bold",
                        marginLeft: "1rem",
                      }}
                    >
                      REGISTRATE
                    </Link>
                  </p>
                  <p>
                    ¿Ya tienes cuenta?
                    <Link
                      to="/login"
                      style={{
                        color: "rgb(167, 100, 255)",
                        fontWeight: "bold",
                        marginLeft: "1rem",
                      }}
                    >
                      INGRESA
                    </Link>
                  </p>
                </div>

                {/* < />!-- Register buttons --> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
