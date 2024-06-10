import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const role = localStorage.getItem("usuario.role");
  const [toggle, setToggle] = useState("close");

  const toggleFunc = () => {
    if (toggle == "close") {
      setToggle("open");
    } else {
      setToggle("close");
    }
  };

  // useEffect(() => {
  //   actions.getUsuario();
  // }, []);

  useEffect(() => {
    if (store.usuario.manager_id) {
      actions.getCourses(store.usuario.manager_id);
    }
  }, [store.usuario.manager_id]);

  // console.log(store.courses);

  return (
    <nav
      className={`sidebar shadow ${toggle == "close" ? "close" : "open"} ${store.notnav && "d-none"}`}
      id="body"
    >
      <div className="menu-bar">
        <div className="menu">
          {/* <li className="search-box">
            <i className="bx bx-search icon"></i>
            <input type="text" placeholder="Search..." />
          </li> */}

          <ul className="p-0">
            <Link to="/perfil">
              <li className="ps-0">
                <i
                  className={`bx bx-bar-chart-alt-2 icon ${store.header === "Tablero de control" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Tablero de control</span>
                <span className="tooltip">Tablero de control</span>
              </li>
            </Link>
            {store.courses.length > 0 && (
              <Link to="/courses">
                <li className="ps-0">
                  <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger">
                    {store.courses.length}
                  </span>
                  <i
                    className={`bx bxl-youtube icon ${store.header === "Cursos disponibles" ? "active" : "unactive"}`}
                  ></i>
                  <span className="text nav-text">Cursos disponibles</span>
                  <span className="tooltip">Cursos disponibles</span>
                </li>
              </Link>
            )}
            <Link to="/salesFunnel">
              <li className="ps-0">
                <i
                  className={`fa-solid fa-filter-circle-dollar icon-fa ${store.header === "Embudo de ventas" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Embudo de ventas</span>
                <span className="tooltip">Embudo de ventas</span>
              </li>
            </Link>
            <Link to="/clients">
              <li className="ps-0">
                <i
                  className={`fa-solid fa-users icon-fa ${store.header === "Clientes" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Clientes</span>
                <span className="tooltip">Clientes</span>
              </li>
            </Link>
            <Link to="/todo">
              <li className="ps-0">
                <i
                  className={`bx bx-list-ol icon ${store.header === "Tareas pendientes" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Tareas pendientes</span>
                <span className="tooltip">Tareas pendientes</span>
              </li>
            </Link>

            {role == "manager" ? (
              <Link to="/OwnAgencyCourses">
                <li className="ps-0">
                  <i
                    className={`fa-solid fa-person-chalkboard icon-fa ${store.header === "Cursos para tu equipo" ? "active" : "unactive"}`}
                  ></i>
                  <span className="text nav-text">Cursos para tu equipo</span>
                  <span className="tooltip">Cursos para tu equipo</span>
                </li>
              </Link>
            ) : (
              ""
            )}
            <Link to="/pricing">
              <li className="ps-0">
                <i
                  className={`fa-regular fa-money-bill-1 icon-fa ${store.header === "Donaciones" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Donaciones</span>
                <span className="tooltip">Donaciones</span>
              </li>
            </Link>
            <Link to="/tutorialVideos">
              <li className="ps-0">
                <i
                  className={`fa-solid fa-circle-info icon-fa ${store.header === "Videos tutoriales" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Videos tutoriales</span>
                <span className="tooltip">Videos tutoriales</span>
              </li>
            </Link>
            <Link to="/bugs">
              <li className="ps-0">
                <i
                  className={`bx bx-bug icon ${store.header === "Reportar errores" ? "active" : "unactive"}`}
                ></i>
                <span className="text nav-text">Reportar errores</span>
                <span className="tooltip">Reportar errores</span>
              </li>
            </Link>
            <a href="#">
              <i
                className={`${toggle} toggle bx bx-chevron-right`}
                onClick={() => toggleFunc()}
              ></i>
            </a>
          </ul>
        </div>
      </div>
    </nav>

    /* <div className="menu">
       <div className="text-center">
         <Link to="/perfil">
           <i className="fa-solid fa-user mt-5 mb-5 icono text-center"></i>
         </Link>
       </div>
       <div className="text-center">
         <Link to="/courses">
           <i className="fa-solid fa-video mt-5 mb-5 icono text-center"></i>
         </Link>
       </div>
       <div className="text-center">
         <Link to="/dashboard">
           <i className="fa-solid fa-comment-dollar icono mt-5 mb-5 text-center"></i>
         </Link>
       </div>
       <div className="text-center">
         <Link to="/">
           <span className="" onClick={(event) => actions.logout()}>
             <i className="fa-solid fa-person-through-window  icono mt-5 mb-5 text-center"></i>
           </span>
         </Link>
       </div>
     </div> */
  );
};
