import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export function CourseCardOwnAgency() {
  const { store, actions } = useContext(Context);
  useEffect(() => actions.getUsuario(), []);

  useEffect(() => actions.getCourses(store.usuario.own_agency.id), []);

  // console.log(store.courses);

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
