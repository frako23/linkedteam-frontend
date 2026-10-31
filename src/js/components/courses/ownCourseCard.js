import { useContext } from "react";
import { GraduationCap } from "lucide-react";
import { Context } from "@/store/appContext";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CourseGrid } from "./course-grid";

export function OwnCourseCard() {
  const { store } = useContext(Context);

  if (store.courses.length === 0) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <GraduationCap />
          </EmptyMedia>
          <EmptyTitle>Aún no publicas cursos para tu equipo</EmptyTitle>
          <EmptyDescription>
            Tus asesores verán aquí los cursos que montes para ellos.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return (
    <CourseGrid
      ruta="/video"
      cursos={store.courses.map((c) => ({ ...c, img: c.img_url }))}
    />
  );
}
