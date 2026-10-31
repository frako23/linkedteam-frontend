import { Link } from "react-router-dom";
import { CirclePlay } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function CourseGrid({ cursos, ruta }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cursos.map((curso) => (
        <Link key={curso.id} to={`${ruta}/${curso.id}`} className="group">
          <Card className="hover:border-primary/40 gap-0 overflow-hidden py-0 transition-colors">
            <AspectRatio ratio={16 / 9} className="bg-muted relative">
              {curso.img ? (
                <img src={curso.img} alt="" className="size-full object-cover" />
              ) : null}
              <span className="bg-background/80 absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full backdrop-blur transition-transform group-hover:scale-105">
                <CirclePlay className="size-5" />
              </span>
            </AspectRatio>
            <CardContent className="flex flex-col gap-1 p-4">
              <h3 className="line-clamp-2 font-medium">{curso.title}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {curso.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
