import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { PricingCard } from "../components/payment/pricingCard";

export const Pricing = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.setHeader("Donaciones");
  }, []);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Si LinkedTeam te ha parecido útil, puedes apoyar el proyecto
        </h1>
        <p className="text-muted-foreground mt-2">
          Tus donaciones mantienen vivo y en crecimiento este CRM con plataforma
          de formación para la industria de seguros.
        </p>
      </div>

      <section className="flex max-w-2xl flex-col gap-3 text-sm leading-6">
        <p>
          En diciembre de 2022, LinkedTeam nació de una simple conversación con
          un amigo. Esa chispa se transformó en meses de trabajo, hasta llegar a
          la versión 1.0 a finales de 2023. En mayo de 2024 lanzamos la versión
          2.0 estable, que sigue en desarrollo constante.
        </p>
        <p>
          LinkedTeam está pensado para que las empresas de seguros optimicen sus
          procesos, mejoren la comunicación con sus asociados y clientes, y
          fortalezcan su presencia en el mercado.
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight">
          Tus donaciones permiten
        </h2>
        <ul className="text-muted-foreground flex list-disc flex-col gap-2 pl-5">
          <li>
            <strong className="text-foreground">
              Desarrollar nuevas funcionalidades
            </strong>{" "}
            que hagan de LinkedTeam una herramienta más útil y eficaz.
          </li>
          <li>
            <strong className="text-foreground">
              Mejorar la estabilidad y el rendimiento
            </strong>{" "}
            invirtiendo en infraestructura y tecnología.
          </li>
          <li>
            <strong className="text-foreground">Ampliar el equipo</strong> con
            más desarrolladores, diseñadores y atención al cliente.
          </li>
        </ul>
      </section>

      <PricingCard />

      <p className="text-sm">
        Muchas gracias por tu apoyo.
        <br />
        <span className="text-muted-foreground">
          Francisco Orozco · Desarrollador full-stack de LinkedTeam
        </span>
      </p>
    </div>
  );
};
