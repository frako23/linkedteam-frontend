import { useContext } from "react";
import { Link } from "react-router-dom";
import { WifiOff } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

/** Envuelve una sección que necesita internet: sin conexión muestra un aviso claro. */
export function RequiereConexion({ children }) {
  const { store } = useContext(Context);
  if (store.conexion !== false) return children;

  return (
    <Empty className="m-4 border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WifiOff />
        </EmptyMedia>
        <EmptyTitle>Esta sección necesita conexión</EmptyTitle>
        <EmptyDescription>
          Conéctate a internet para verla. Mientras tanto, puedes registrar
          interacciones y negocios desde tu embudo.
        </EmptyDescription>
      </EmptyHeader>
      <Button asChild>
        <Link to="/salesFunnel">Ir a mi embudo</Link>
      </Button>
    </Empty>
  );
}
