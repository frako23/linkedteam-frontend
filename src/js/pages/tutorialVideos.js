import { useContext, useEffect } from "react";
import { Context } from "@/store/appContext";
import { Pricing } from "./pricing";
import { TutorialVideoCard } from "../components/courses/tutorialVideoCard";

export const TutorialVideos = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.setHeader("Videos tutoriales");
  }, []);

  if (store.usuario.status === "inactive") return <Pricing />;

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Videos tutoriales
        </h1>
        <p className="text-muted-foreground text-sm">
          Aprende a sacarle provecho a cada módulo de LinkedTeam.
        </p>
      </div>
      <TutorialVideoCard />
    </div>
  );
};
