import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import { Link } from "react-router-dom";

export function CourseCard() {
  const { store, actions } = useContext(Context);

  // useEffect(() => {
  //   actions.getUsuario();
  // }, []);

  useEffect(() => actions.getCourses(store.usuario.manager_id), []);

  return (
    <div className="container courses__container">
      {store.courses.map((data) => {
        return (
          <article className="course" key={data.id}>
            <div>
              <img className="course__image" src={data.img_url} />
            </div>
            <div className="course__info">
              <h4>{data.title}</h4>
              <p>{data.description}</p>
              <Link to={`/video/${data.id}`} className="course__btn">
                Ver curso
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
