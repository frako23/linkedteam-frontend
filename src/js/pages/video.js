import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Context } from "@/store/appContext";
import { Badge } from "@/components/ui/badge";

export const Video = () => {
  const params = useParams();
  const { store } = useContext(Context);
  const curso =
    store.courses.find((c) => String(c.id) === params.theid) ??
    store.courses[params.theid - 1];

  if (!curso) {
    return (
      <p className="text-muted-foreground p-6 text-sm">
        No encontramos este curso.
      </p>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4 lg:p-6">
      <div className="aspect-video overflow-hidden rounded-xl border">
        <ReactPlayer src={curso.link_url} width="100%" height="100%" controls />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{curso.title}</h1>
        {curso.category && <Badge variant="secondary">{curso.category}</Badge>}
        <p className="text-muted-foreground">{curso.description}</p>
      </div>
    </div>
  );
};
