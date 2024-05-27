import React from "react";
import "../../../styles/home.css";
import { Link } from "react-router-dom";
import { tutorialVideosData } from "../../data/tutorialVideosData";

export function TutorialVideoCard() {
  return (
    <div className="container courses__container">
      {tutorialVideosData.map((data) => {
        return (
          <article className="course" key={data.id}>
            <div>
              <img className="course__image" src={data.imgUrl} />
            </div>
            <div className="course__info">
              <h4>{data.title}</h4>
              <p>{data.description}</p>
              <Link to={`/videoTutorial/${data.id}`} className="course__btn">
                Ver curso
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
