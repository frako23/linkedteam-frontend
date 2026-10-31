import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Logo } from "@/components/logo";

/** Dos columnas: formulario a la izquierda, mensaje de marca a la derecha. */
export function AuthLayout({ titulo, descripcion, children, pie }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-6 p-6 md:p-10">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Logo className="size-6" />
          LinkedTeam
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {titulo}
              </h1>
              <p className="text-muted-foreground text-sm">{descripcion}</p>
            </div>
            {children}
            <div className="text-muted-foreground flex flex-col gap-1 text-center text-sm">
              {pie}
            </div>
          </div>
        </div>
      </div>
      <div className="dark bg-background text-foreground hero-glow relative hidden flex-col justify-end gap-3 overflow-hidden p-10 lg:flex">
        <div className="bg-cuadricula absolute inset-0 opacity-60" />
        <div className="relative flex max-w-md flex-col gap-3">
          <p className="text-3xl font-semibold tracking-tight text-balance">
            La mejor herramienta para hacer crecer tu negocio
          </p>
          <p className="text-muted-foreground text-sm">
            Controla tu gestión de ventas, fórmate y, si tienes equipo,
            forma a tus asesores y monitorea su desempeño.
          </p>
        </div>
      </div>
    </div>
  );
}

export function EnlaceAuth({ to, children }) {
  return (
    <Link
      to={to}
      className="text-accent-foreground font-medium underline-offset-4 hover:underline dark:text-accent-foreground"
    >
      {children}
    </Link>
  );
}

export function CampoClave({ visible, onToggle, ...props }) {
  return (
    <InputGroup>
      <InputGroupInput type={visible ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          onClick={onToggle}
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
