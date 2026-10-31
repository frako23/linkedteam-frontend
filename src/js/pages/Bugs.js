import { useContext, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { CircleCheck } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Bugs = () => {
  const { actions } = useContext(Context);
  const [state, handleSubmit] = useForm("xjvnqkdv");

  useEffect(() => {
    actions.setHeader("Reportar errores");
  }, []);

  if (state.succeeded) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 p-6 text-center">
        <CircleCheck className="text-etapa-cerrado size-10" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Gracias por tu ayuda
        </h1>
        <p className="text-muted-foreground">
          Tu reporte nos permite encontrar y solucionar problemas que podrían
          pasar desapercibidos. Gracias a tus comentarios mejoramos la app para
          todos.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          ¿Viste algún error en LinkedTeam?
        </h1>
        <p className="text-muted-foreground text-sm">
          Cuéntanos qué pasó y lo revisamos.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Título del error</Label>
          <Input id="title" name="title" />
          <ValidationError prefix="Título" field="title" errors={state.errors} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Detalle del error</Label>
          <Textarea id="message" name="message" rows={8} />
          <ValidationError
            prefix="Mensaje"
            field="message"
            errors={state.errors}
          />
        </div>
        <div>
          <Button type="submit" disabled={state.submitting}>
            Enviar reporte
          </Button>
        </div>
      </form>
    </div>
  );
};
