import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "@/store/appContext";
import { OwnCourseCard } from "../components/courses/ownCourseCard";
import CreateCourse from "../components/courses/createCourse";
import { Pricing } from "./pricing";

export const OwnAgencyCourses = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const id = localStorage.getItem("usuario.id");

  useEffect(() => {
    actions.setHeader("Cursos para tu equipo");
    actions.getCourses(id);
  }, []);

  useEffect(() => {
    if (store.usuario.status === "inactive") navigate("/pricing");
  }, [store.usuario.status]);

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Cursos para tu equipo
          </h1>
          <p className="text-muted-foreground text-sm">
            Publica videos de formación para tus asesores.
          </p>
        </div>
        <CreateCourse />
      </div>
      <OwnCourseCard />
    </div>
  );
};
