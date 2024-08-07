import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import one from "../../img/1.webp";
import two from "../../img/2.webp";
import three from "../../img/3.webp";
import four from "../../img/4.webp";
import { VideoModal } from "../components/home/VideoModal";
import { Button } from "react-bootstrap";

export const Home = () => {
  const [menuBar, setMenuBar] = useState(false);
  const { actions } = useContext(Context);
  const [modalShow, setModalShow] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    url: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/perfil");
    }
  }, []);

  // console.log(token);
  return (
    <>
      {/* comienza la seccion del header */}

      <section className="header">
        <Link to={"/"} className="logo">
          LinkedTeam
        </Link>

        <nav className={`navbar ${menuBar ? "active" : ""}`}>
          <a href="#quePuedesHacer" className="smooth">
            ¿Qué podrás hacer?
          </a>

          <Link to="/signup" className="">
            Regístrate
          </Link>

          <Link to="/login" className="">
            Ingresa
          </Link>
          <Link to="/demo" className="">
            Prueba la app
          </Link>
        </nav>

        <div
          id="menu-btn"
          onClick={() => {
            if (menuBar != true) {
              setMenuBar(true);
            } else {
              setMenuBar(false);
            }
          }}
          className={menuBar ? "fas fa-xmark" : "fas fa-bars"}
        >
          {" "}
        </div>
      </section>

      {/* termina la sección del header */}

      {/* comienza la sección del home */}

      <section className="new-home">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div
              className="slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${one})`,
              }}
            >
              <div className="content">
                <span>Sácale el máximo potencial a tú equipo de trabajo</span>
                <h3>Mantente conectado con tu equipo de trabajo</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${two})`,
              }}
            >
              <div className="content">
                <span>Entrenamiento constante</span>
                <h3>Forma a tú equipo de trabajo</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${three})`,
              }}
            >
              <div className="content">
                <span>
                  Haz seguimiento efectivo de prospectos propios y de tu equipo
                </span>
                <h3>La App para la prospección efectiva</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="slide"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${four})`,
              }}
            >
              <div className="content">
                <span>Registra y haz seguimiento de todas tus tareas</span>
                <h3>Nunca olvides una tarea</h3>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* termina la sección del home */}
      <div id="quePuedesHacer"></div>
      {/* empieza la sección de servicios */}

      <section className="services background-linkedin">
        <h1 className="heading-tittle">
          {" "}
          ¿Qué podrás hacer en <span>LinkedTeam</span>?
        </h1>
        <div className="box-container">
          <div className="box">
            <i className="bx bxl-youtube icon"></i>
            <h4>Plataforma de formación</h4>
            <h6>
              Podrás cargar contenido de alto valor para a tu equipo de trabajo
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "Plataforma de E-learning",
                    url: "6L098JYVed8",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <div className="box">
            <i className="bx bxs-layout icon"></i>
            <h4>CRM</h4>
            <h6>
              Podrás guardar cada uno de tus prospectos, y usar el embudo de
              ventas para hacer un seguimiento efectivo
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "Registro de prospectos",
                    url: "QDPIif_bPx4",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <div className="box">
            <i className="bx bx-table icon"></i>
            <h4>Registro de interacciones</h4>
            <h6>
              Puedes guardar todas las interacciones que tengas con tus
              prospectos
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "Registro de interacciones",
                    url: "xrOD3gi7_WA",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>

        <div className="box-container">
          <div className="box">
            <i className="bx bxs-dashboard icon"></i>
            <h4>Tablero de visualización</h4>
            <h6>
              Tablero de resúmen, con indicadores del embudo de ventas,
              indicadores de gestion de ventas y resumen de tareas pendientes
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "Tablero de visualización",
                    url: "C1URivfYhDY",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <div className="box">
            <i className="bx bx-show-alt icon"></i>
            <h4>Visualiza la actividad de tus asociados</h4>
            <h6>
              Supervisa de manera eficiente a tu fuerza de ventas, ¡Aumenta la
              productividad y el rendimiento de tu equipo hoy mismo!
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "Visualizar prospectos de tus asociados",
                    url: "LD5cNftpKAU",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <div className="box">
            <i className="bx bx-list-ol icon"></i>
            <h4>App de tareas pendientes</h4>
            <h6>
              Podrás anotar esas tareas claves, para hacerles con el método
              Kanban
            </h6>
            <div style={{ marginTop: "1rem" }}>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true);
                  setVideoData({
                    title: "App de Tareas Pendientes",
                    url: "mGI-JOQL6uM",
                  });
                }}
              >
                Ver Video
              </Button>

              <VideoModal
                title={videoData.title}
                url={videoData.url}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>
      </section>
      {/* termina la sección de servicios */}

      {/* comienza el footer */}

      <section className="footer">
        <h3>Información de Contacto</h3>
        <div className="box">
          {/* <a href="#">
            {" "}
            <i className="fa-brands fa-whatsapp"></i> +(58)0412-XXXXXX
          </a> */}
          <a href="mailto:linkedteam2023@gmail.com">
            {" "}
            <i className="fas fa-envelope"></i> linkedteam2023@gmail.com
          </a>
          {/* <a href="#">
            {" "}
            <i className="fas fa-map"></i> Caracas, Venezuela
          </a> */}
        </div>

        <div className="credit">
          {" "}
          Creado por <a href="https://frako-dev.vercel.app/">frakoDev</a>
        </div>
      </section>

      {/* termina el footer */}
    </>
  );
};
