import { useState } from "react";
import PropTypes from "prop-types";
import { Eye } from "lucide-react";
import { formatoMonto } from "@/lib/etapas";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const DATOS = (c) => [
  ["Etapa", c.status],
  ["Monto", formatoMonto(c.amount)],
  ["Confianza", c.trust],
  ["Celular", c.cellphone],
  ["Email", c.email],
  ["Nacimiento", c.birthdate],
];

export const ManagerDetailedClient = ({ prospecto }) => {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Ver detalle de ${prospecto.name}`}
        title="Ver detalle"
        onClick={() => setAbierto(true)}
      >
        <Eye />
      </Button>
      <Sheet open={abierto} onOpenChange={setAbierto}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{prospecto.name}</SheetTitle>
            <SheetDescription>Detalle del negocio de tu asesor.</SheetDescription>
          </SheetHeader>
          <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3 px-4 text-sm">
            {DATOS(prospecto).map(([clave, valor]) => (
              <div key={clave} className="contents">
                <dt className="text-muted-foreground">{clave}</dt>
                <dd className="font-medium">{valor || "—"}</dd>
              </div>
            ))}
            <dt className="text-muted-foreground">Notas</dt>
            <dd className="whitespace-pre-wrap">{prospecto.notes || "—"}</dd>
          </dl>
        </SheetContent>
      </Sheet>
    </>
  );
};

ManagerDetailedClient.propTypes = {
  prospecto: PropTypes.object,
};
