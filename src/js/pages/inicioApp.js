import { Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { tokenVigente } from "@/lib/sesion";

// Arranque de la app instalada: decide a dónde ir según la sesión y la conexión.
export const InicioApp = () => {
  const token = localStorage.getItem("token");
  const conexion = navigator.onLine;

  let destino = "/perfil";
  if (!token) destino = "/login";
  else if (!conexion) destino = "/salesFunnel";
  else if (!tokenVigente(token)) destino = "/login";

  return (
    <>
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6" />
      </div>
      <Navigate to={destino} replace />
    </>
  );
};
