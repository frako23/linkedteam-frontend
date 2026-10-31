import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import pagoMovil from "../../../../public/pago-movil.jpg";
import binance from "../../../../public/BINANCE.jpg";

const METODOS = [
  { id: "pago-movil", titulo: "Pago móvil", imagen: pagoMovil },
  { id: "binance", titulo: "Binance", imagen: binance },
  { id: "paypal", titulo: "PayPal", detalle: "frako23@gmail.com" },
];

export const PricingCard = () => {
  const [metodoId, setMetodoId] = useState("");
  const metodo = METODOS.find((m) => m.id === metodoId);

  return (
    <Card className="max-w-md">
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="metodo-pago">Método de pago</FieldLabel>
              <Select value={metodoId} onValueChange={setMetodoId}>
                <SelectTrigger id="metodo-pago" className="w-full">
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  {METODOS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {metodo?.imagen && (
              <img
                src={metodo.imagen}
                alt={`Datos para pagar por ${metodo.titulo}`}
                className="w-full rounded-lg border object-contain"
              />
            )}
            {metodo?.detalle && (
              <Field>
                <FieldLabel>Correo de {metodo.titulo}</FieldLabel>
                <p className="text-sm">{metodo.detalle}</p>
              </Field>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
