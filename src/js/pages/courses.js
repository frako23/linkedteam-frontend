import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "@/store/appContext";
import { CourseCard } from "../components/courses/courseCard";
import { Pricing } from "./pricing";

export const Courses = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.setHeader("Cursos disponibles");
  }, []);

  useEffect(() => {
    if (store.usuario.status === "inactive") navigate("/pricing");
  }, [store.usuario.status]);

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Cursos disponibles
        </h1>
        <p className="text-muted-foreground text-sm">
          Formación que tu gerente preparó para el equipo.
        </p>
      </div>
      <CourseCard />
    </div>
  );
};
