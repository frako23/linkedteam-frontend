import React from "react";
import "../../styles/profile__card.css";
import img from "../../img/img_avatar.png";

export const ProfileCard = () => {
  return (
    <div className="flip-card profile">
      <div className="flip-card-inner">
        <div className="flip-card-front  ">
          <img
            src={img}
            alt="Avatar"
            style={{ width: "300px", height: "300px" }}
            className=""
          />
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  );
};
