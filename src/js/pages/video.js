import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ReactPlayer from "react-player";
import "../../styles/video.css";

import { useParams } from "react-router-dom";

export const Video = () => {
  const params = useParams();
  const { store } = useContext(Context);
  console.log(store.courses[params.theid - 1]);
  return (
    <div className="d-flex n-container">
      <div className="contenedor">
        <div className="contenedor-video">
          <ReactPlayer
            className="react-player"
            url={store.courses[params.theid - 1].link_url}
            width="100%"
            height="100%"
            controls
          />
        </div>
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">
              {store.courses[params.theid - 1].title}
            </h5>
            <p className="card-text">
              {store.courses[params.theid - 1].description}
            </p>
          </div>
          {store.courses[params.theid - 1].category && (
            <div className="card-footer">
              <b>{store.courses[params.theid - 1].category}</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
