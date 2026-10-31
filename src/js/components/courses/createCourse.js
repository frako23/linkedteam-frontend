import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, FormSheet, Fila } from "../form-kit";

const VACIO = {
  title: "",
  description: "",
  img_url: "",
  link_url: "",
  category: "",
  tag: "",
};

function CreateCourse() {
  const { actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);
  const [courses, setCourses] = useState(VACIO);
  const id = localStorage.getItem("usuario.id");

  const handleForm = ({ target }) =>
    setCourses({ ...courses, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postCourses(courses, id);
    setCourses(VACIO);
    setAbierto(false);
    toast.success("Curso publicado");
    actions.getCourses(id);
  };

  return (
    <>
      <Button onClick={() => setAbierto(true)}>
        <Plus /> Crear curso
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Crea un curso para tu equipo"
        onSubmit={handleSubmit}
      >
        <Campo
          label="Título del curso"
          name="title"
          placeholder="Título del video"
          value={courses.title}
          onChange={handleForm}
          autoFocus
        />
        <CampoArea
          label="Descripción"
          name="description"
          maxLength="1000"
          value={courses.description}
          onChange={handleForm}
        />
        <Campo
          label="Link del video"
          name="link_url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={courses.link_url}
          onChange={handleForm}
        />
        <Fila>
          <Campo
            label="Categoría"
            name="category"
            placeholder="Motivación"
            value={courses.category}
            onChange={handleForm}
          />
          <Campo
            label="Color de la etiqueta"
            name="tag"
            placeholder="Verde"
            value={courses.tag}
            onChange={handleForm}
          />
        </Fila>
        <Campo
          label="Link de la imagen"
          name="img_url"
          placeholder="https://..."
          value={courses.img_url}
          onChange={handleForm}
        />
      </FormSheet>
    </>
  );
}

export default CreateCourse;
