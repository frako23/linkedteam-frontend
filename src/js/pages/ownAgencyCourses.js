import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { OwnCourseCard } from "../components/courses/ownCourseCard";
import CreateCourse from "../components/courses/createCourse";
import { Pricing } from "./pricing";
import { useNavigate } from "react-router-dom";
import { NoCourses } from "./NoCourses";

export const OwnAgencyCourses = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Cursos para tu equipo");
  }, []);

  const id = sessionStorage.getItem("usuario.id");
  useEffect(() => {
    if (store.usuario.status === "inactive") {
      navigate("/pricing");
    }
  }, [store.usuario.status]);

  useEffect(() => actions.getCourses(id), []);
  console.log(store.courses);
  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div className="n-container">
          <div className="create-course-heading">
            <CreateCourse />
            <h3>Haz click aqui para añadir un curso para tu equipo</h3>
          </div>
          {store.courses.length > 0 ? <OwnCourseCard /> : <NoCourses />}
        </div>
      )}
    </>
  );
};
