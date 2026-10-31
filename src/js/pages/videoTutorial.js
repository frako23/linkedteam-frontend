import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { tutorialVideosData } from "../data/tutorialVideosData";

export const VideoTutorial = () => {
  const { theid } = useParams();
  const video = tutorialVideosData.find((tutorial) => tutorial.id === theid);

  if (!video) {
    return (
      <p className="text-muted-foreground p-6 text-sm">
        No encontramos este video.
      </p>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4 lg:p-6">
      <div className="aspect-video overflow-hidden rounded-xl border">
        <ReactPlayer src={video.linkUrl} width="100%" height="100%" controls />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{video.title}</h1>
        <p className="text-muted-foreground">{video.description}</p>
      </div>
    </div>
  );
};
