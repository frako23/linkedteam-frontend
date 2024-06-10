import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import toast from "react-hot-toast";

function CreateCourse() {
  const [show, setShow] = useState(false);
  const { actions } = useContext(Context);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [courses, setCourses] = useState({
    title: "",
    description: "",
    img_url: "",
    link_url: "",
  });
  const id = localStorage.getItem("usuario.id");
  const handleForm = ({ target }) => {
    setCourses({ ...courses, [target.name]: target.value });
  };

  useEffect(() => {
    actions.getCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(courses, store.usuario.own_agency.id);
    actions.postCourses(courses, id);
    setCourses({
      title: "",
      description: "",
      img_url: "",
      link_url: "",
      category: "",
      tag: "",
    });
    handleClose();
    toast.success("Registraste el curso correctamente");
    actions.getCourses();
  };

  return (
    <>
      <button
        className="btn btn-light rounded-pill border w-25-dark fw-bold text-white"
        style={{ background: "#695cfe" }}
        onClick={handleShow}
      >
        Crear Curso
      </button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Crea el curso para tu equipo aquí</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Titulo del curso</Form.Label>
              <Form.Control
                type="text"
                placeholder="Titulo del video"
                autoFocus
                name="title"
                value={courses.title}
                onChange={handleForm}
              />

              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                maxLength="1000"
                value={courses.description}
                onChange={handleForm}
              />

              <Form.Label>Link del Video</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.youtube.com/#####"
                autoFocus
                name="link_url"
                value={courses.link_url}
                onChange={handleForm}
              />

              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Motivación"
                autoFocus
                name="category"
                value={courses.category}
                onChange={handleForm}
              />

              <Form.Label>Color de la etiqueta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Verde"
                autoFocus
                name="tag"
                value={courses.tag}
                onChange={handleForm}
              />

              <Form.Label>Link de la imágen</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.#####"
                autoFocus
                name="img_url"
                value={courses.img_url}
                onChange={handleForm}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateCourse;
