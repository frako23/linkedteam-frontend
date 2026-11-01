import { useEffect, useState } from "react";
import { Share, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  descartarInstalacion,
  esIOS,
  esStandalone,
  instalacionDescartadaReciente,
  pedirInstalacion,
  puedeInstalar,
  suscribirInstalacion,
} from "@/lib/pwa";

/** Invitación a instalar la app: solo en teléfono, como máximo cada 30 días. */
export function InstalarApp() {
  const esMovil = useIsMobile();
  const [, actualizar] = useState(0);
  const [oculta, setOculta] = useState(
    () => esStandalone() || instalacionDescartadaReciente()
  );

  useEffect(() => suscribirInstalacion(() => actualizar((n) => n + 1)), []);

  const ios = esIOS();
  if (!esMovil || oculta || esStandalone() || (!puedeInstalar() && !ios)) {
    return null;
  }

  const cerrar = () => {
    descartarInstalacion();
    setOculta(true);
  };

  return (
    <div className="mx-4 mt-4 flex items-start gap-3 rounded-xl border bg-card p-3">
      <img src="/brand/linkedteam-mark.svg" alt="" className="size-8 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Instala LinkedTeam en tu teléfono</p>
        {ios ? (
          <p className="text-muted-foreground text-xs">
            Toca Compartir <Share className="inline size-3.5 align-text-bottom" />{" "}
            y luego «Agregar a inicio».
          </p>
        ) : (
          <>
            <p className="text-muted-foreground text-xs">
              Ábrela desde tu pantalla de inicio, incluso sin conexión.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={pedirInstalacion}
            >
              Instalar
            </Button>
          </>
        )}
      </div>
      <Button variant="ghost" size="icon-sm" aria-label="Ahora no" onClick={cerrar}>
        <X />
      </Button>
    </div>
  );
}
