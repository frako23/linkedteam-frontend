import { tutorialVideosData } from "../../data/tutorialVideosData";
import { CourseGrid } from "./course-grid";

export function TutorialVideoCard() {
  return (
    <CourseGrid
      ruta="/videoTutorial"
      cursos={tutorialVideosData.map((v) => ({ ...v, img: v.imgUrl }))}
    />
  );
}
