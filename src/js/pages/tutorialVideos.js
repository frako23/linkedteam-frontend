import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/dashboard.css";
import { Pricing } from "./pricing";
import { TutorialVideoCard } from "../components/courses/tutorialVideoCard";

export const TutorialVideos = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.setHeader("Videos tutoriales");
  }, []);

  return (
    <>
      {store.usuario.status === "inactive" ? (
        <Pricing />
      ) : (
        <div className="n-container">
          <TutorialVideoCard />
        </div>
      )}
    </>
  );
};
