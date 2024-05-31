import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import img2 from "../../../img/nohayvideos.jpg";

export function OwnCourseCard() {
  const { store, actions } = useContext(Context);
  // useEffect(() => actions.getUsuario(), []);

  // useEffect(() => actions.getCourses(store.usuario.own_agency.id), []);

  // console.log(store.courses);

  return (
    <>
      {store.courses.length == 0 ? (
        <div className="video-not-set">
          <img src={img2} />
          <Link to="/perfil">
            <h2>
              Asi estan los asociados de tu equipo, esperando que montes cursos
              para ellos...
            </h2>
          </Link>
        </div>
      ) : (
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
      )}
    </>
  );
}
