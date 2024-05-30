import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";

import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Donaciones");
  }, []);
  return (
    <div className="n-container">
      <h1 className="text-black  text-center pt-6 kanban-head-title">
        Si <span style={{ color: "#695cfe" }}>LinkedTeam</span> te ha parecido
        de utilidad
      </h1>
      <h3 style={{ paddingBottom: "2rem" }} className="text-center">
        Aquí puedes{" "}
        <span style={{ color: "#0d571d", fontWeight: "bolder" }}>apoyar</span>{" "}
        este proyecto
      </h3>

      <div style={{ paddingLeft: "7rem", paddingRight: "3rem" }}>
        <h5>¡Apoya el futuro de LinkedTeam!</h5>

        <p>
          En diciembre de 2022, LinkedTeam nació de una simple conversación con
          un amigo. Esa chispa de inspiración se transformó en meses de arduo
          trabajo, superando desafíos y celebrando logros, culminando en la
          versión 1.0 a finales del 2023.
        </p>

        <p>
          Hoy, con orgullo, presentamos la versión 2.0 estable de LinkedTeam,
          lanzada en mayo de 2024, y aún en constante desarrollo.
        </p>

        <p>
          LinkedTeam es un CRM con plataforma eLearning especialmente diseñado
          para la industria de seguros. Nuestra misión es ayudar a las empresas
          a optimizar sus procesos, mejorar la comunicación con sus asociados y
          clientes, y fortalecer su presencia en el mercado.
        </p>

        <h6>
          LinkedTeam es una herramienta en constante evolución, y para
          garantizar su continuo crecimiento y mejora, necesitamos tu apoyo.
        </h6>

        <p>Tus donaciones permitirán:</p>

        <ul>
          <li>
            Desarrollar nuevas funcionalidades: Estamos trabajando arduamente
            para crear nuevas funciones que hagan de LinkedTeam una herramienta
            aún más útil y eficaz para nuestros usuarios. Tus donaciones
            acelerarán este proceso y nos permitirán crear las herramientas que
            necesitas para alcanzar el éxito.
          </li>
          <li>
            Mejorar la estabilidad y el rendimiento: Nuestro objetivo es
            garantizar que LinkedTeam funcione a la perfección para todos
            nuestros usuarios. Tus donaciones nos permitirán invertir en
            infraestructura y tecnología para mejorar la estabilidad y el
            rendimiento de la plataforma.
          </li>
          <li>
            Ampliar nuestro equipo: A medida que LinkedTeam crece, necesitamos
            más talento para mantener el ritmo. Tus donaciones nos permitirán
            contratar a nuevos desarrolladores, diseñadores y expertos en
            atención al cliente para ofrecerte el mejor servicio posible.
          </li>
        </ul>

        <h6>
          Con tu ayuda, podemos seguir haciendo de LinkedTeam la mejor
          herramienta CRM y eLearning para la industria de seguros.
        </h6>

        <p>¡Dona hoy mismo y ayúdanos a construir el futuro de LinkedTeam!</p>

        <PricingCard />

        <p>&nbsp;</p>

        <b>Muchas gracias por tu apoyo!</b>

        <p>
          Francisco Orozco <br></br>Desarrollador Full-Stack de LinkedTeam
        </p>
      </div>
    </div>
  );
};
