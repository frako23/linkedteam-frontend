import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { CourseGrid } from "./course-grid";

export function CourseCard() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCourses(store.usuario.manager_id);
  }, []);

  return (
    <CourseGrid
      ruta="/video"
      cursos={store.courses.map((c) => ({ ...c, img: c.img_url }))}
    />
  );
}
