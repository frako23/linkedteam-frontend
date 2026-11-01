import { useContext } from "react";
import { Link } from "react-router-dom";
import { CloudUpload, LogIn, WifiOff } from "lucide-react";
import { Context } from "@/store/appContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const plural = (n) => (n === 1 ? "1 pendiente" : `${n} pendientes`);

/** Indicador del encabezado: sin conexión, enviando o cuántos cambios faltan. */
export function EstadoConexion() {
  const { store, actions } = useContext(Context);
  const total = store.pendientes.length;
  const sinConexion = store.conexion === false;

  let contenido = null;
  if (store.sesionVencida && total > 0) {
    return (
      <div className="ml-auto shrink-0" aria-live="polite">
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">
            <LogIn /> Inicia sesión para enviar
          </Link>
        </Button>
      </div>
    );
  }
  if (sinConexion) {
    contenido = (
      <>
        <WifiOff /> Sin conexión
        {total > 0 ? <Badge variant="secondary">{total}</Badge> : null}
      </>
    );
  } else if (store.sincronizando) {
    contenido = (
      <>
        <Spinner /> Enviando…
      </>
    );
  } else if (total > 0) {
    contenido = (
      <>
        <CloudUpload /> <Badge variant="secondary">{plural(total)}</Badge>
      </>
    );
  }

  return (
    <div className="ml-auto shrink-0" aria-live="polite">
      {contenido ? (
        <Button variant="ghost" size="sm" onClick={() => actions.abrirPendientes(true)}>
          {contenido}
        </Button>
      ) : null}
    </div>
  );
}
