import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Panel lateral con formulario: crear y editar registros. */
export function FormSheet({
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  submitLabel = "Guardar",
  guardando = false,
  soloLectura = false,
  children,
  className,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn("w-full overflow-y-auto sm:max-w-lg", className)}>
        <form onSubmit={onSubmit} className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            {description ? (
              <SheetDescription>{description}</SheetDescription>
            ) : null}
          </SheetHeader>
          <fieldset
            disabled={soloLectura}
            className="flex min-w-0 flex-1 flex-col gap-4 border-0 px-4 py-2"
          >
            {children}
          </fieldset>
          <SheetFooter className="flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {soloLectura ? "Cerrar" : "Cancelar"}
            </Button>
            {soloLectura ? null : (
              <Button type="submit" disabled={guardando}>
                {guardando ? <Spinner /> : null}
                {submitLabel}
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function Campo({ label, id, className, ...props }) {
  const campoId = id || props.name;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={campoId}>
        {label}
        {props.required ? " *" : ""}
      </Label>
      <Input id={campoId} {...props} />
    </div>
  );
}

export function CampoArea({ label, id, className, ...props }) {
  const campoId = id || props.name;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={campoId}>{label}</Label>
      <Textarea id={campoId} rows={3} {...props} />
    </div>
  );
}

/** Select nativo con el estilo de Input: conserva `required` y el `onChange` por `target`. */
export function CampoSelect({ label, id, className, children, ...props }) {
  const campoId = id || props.name;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={campoId}>
        {label}
        {props.required ? " *" : ""}
      </Label>
      <select
        id={campoId}
        className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function Fila({ children }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
