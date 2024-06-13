import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/index.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const [passwordShowHide, setPasswordShowHide] = useState(true);
  // console.log("Este es tu token", store.token);

  const handleClick = () => {
    // const success = await
    actions.login(email, password);
    // success && navigate("/");
  };
  useEffect(() => actions.setNotNav(true), []);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      // console.log("entrando al use effect");
      // actions.getUsuario();
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
                {/* < />!-- 2 column grid layout with text inputs for the first and last names --> */}

                {/* < />!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example1"
                    value={email}
                    required
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    className="form-control"
                    placeholder="tucorreo@correo.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Coloca tu correo
                  </label>
                </div>

                {/* < />!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type={passwordShowHide ? "password" : "text"}
                    id="form2Example2"
                    value={password}
                    required
                    className="form-control"
                    placeholder="contraseña1234..."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="password-show-login"
                    onClick={() => setPasswordShowHide(!passwordShowHide)}
                  >
                    <i
                      className={
                        passwordShowHide
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </span>
                  <label className="form-label" htmlFor="form3Example4">
                    Coloca tu contraseña
                  </label>
                </div>

                {/* < />!-- Checkbox --> */}

                {/* < />!-- Submit button --> */}
                <div className="d-flex justify-content-evenly">
                  <Link to="/">
                    <button
                      type="button"
                      className="btn btn-danger btn-block mb-4"
                    >
                      Regresar
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-success btn-block mb-4"
                    onClick={handleClick}
                  >
                    Ingresar
                  </button>
                </div>
                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>
                    ¿No estas inscit@ aún?
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
                    ¿Quieres probar la app?
                    <Link
                      to="/demo"
                      style={{
                        color: "rgb(167, 100, 255)",
                        fontWeight: "bold",
                        marginLeft: "1rem",
                      }}
                    >
                      ACCESA A LA DEMO
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
