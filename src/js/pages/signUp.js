import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/index.css";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShowHide, setPasswordShowHide] = useState(true);
  const navigate = useNavigate();

  const notify = () =>
    toast.success(`Te has registrado exitosamente ${name}`, {
      // Custom Icon
      icon: "👏",
    });

  useEffect(() => {
    actions.setNotNav(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops... hubo un error",
        text: "¡La contraseña y la confirmación de contraseña no coinciden!",
      });
    } else if (name != "" && lastname != "" && email != "" && password != "") {
      const response = await actions.signup(name, lastname, email, password);
      if (response) {
        notify();
        const ingresar = await actions.login(email, password);
        if (ingresar) {
          navigate("/perfil");
        }
      }
    }
  };

  return (
    <div
      className="px-4 py-5 m-0  px-md-5 text-center text-lg-start  background-linkedin"
      style={{ height: "100vh" }}
    >
      <Toaster />
      <div className="row gx-lg-5 align-items-center mb-5">
        <div
          className="col-lg-6 mb-5 mb-lg-0"
          style={{
            zIndex: "10",
          }}
        >
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

        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          {/* <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          ></div>
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          ></div> */}

          <div className="card bg-glass">
            <div className="card-body px-4 py-5 px-md-5">
              <form
                className="needs-validation"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                <div className="row" style={{ margin: "0px" }}>
                  <div className="col-md-6 mb-2">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="validationCustom01"
                        className="form-control"
                        placeholder="Tu nombre aquí"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="validationCustom01"
                        style={{ paddingLeft: "3rem" }}
                      >
                        Nombre
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form3Example2"
                        required
                        className="form-control"
                        placeholder="Tu apellido aquí"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Please choose a username.
                      </div>
                      <label
                        className="form-label"
                        htmlFor="form3Example2"
                        style={{ paddingLeft: "3rem" }}
                      >
                        Apellido
                      </label>
                    </div>
                  </div>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    required
                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                    className="form-control"
                    placeholder="tucorreo@aqui.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Correo Electrónico
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type={passwordShowHide ? "password" : "text"}
                    id="form3Example4"
                    required
                    className="form-control password-input"
                    placeholder="Aquí tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Contraseña
                  </label>
                </div>

                {/* <!-- Confirm Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type={passwordShowHide ? "password" : "text"}
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Aquí tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <span
                    className="password-show"
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
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirma tú contraseña
                  </label>
                </div>
                {/* <!-- Checkbox --> */}
                {/* <div className="form-check d-flex justify-content-center mb-4">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                  <label className="form-check-label" htmlFor="form2Example33">
                    Subscribe to our newsletter
                  </label>
                </div> */}

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                  style={{ width: "-webkit-fill-available" }}
                >
                  !Regístrate Ya!
                </button>

                {/* <!-- Register buttons --> */}
                {/* <div className="text-center">
                  <p>o regístrate con:</p>
                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div> */}
              </form>
              <div className="text-center">
                <span> ¿Ya estas inscrit@? </span>
                <Link
                  to="/login"
                  className="fw-bold"
                  style={{ color: "rgb(167, 100, 255)" }}
                >
                  INGRESA AQUÍ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
