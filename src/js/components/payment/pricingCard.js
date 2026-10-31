import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import pagoMovil from "../../../../public/pago-movil.jpg";
import zelle from "../../../../public/zelle.jpg";
import binance from "../../../../public/BINANCE.jpg";

const METODOS = [
  { titulo: "Zelle", imagen: zelle, detalle: "frako23@gmail.com" },
  { titulo: "Pago móvil", imagen: pagoMovil },
  { titulo: "Binance", imagen: binance },
];

export const PricingCard = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {METODOS.map((metodo) => (
      <Card key={metodo.titulo}>
        <CardHeader>
          <CardTitle>{metodo.titulo}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <img
            src={metodo.imagen}
            alt={`Datos para donar por ${metodo.titulo}`}
            className="w-full rounded-lg border object-contain"
          />
          {metodo.detalle && (
            <p className="text-muted-foreground text-sm">{metodo.detalle}</p>
          )}
        </CardContent>
      </Card>
    ))}
    <Card className="md:col-span-3">
      <CardContent className="flex flex-col gap-1 text-center">
        <p className="font-medium">PayPal</p>
        <p className="text-muted-foreground text-sm">frako23@gmail.com</p>
      </CardContent>
    </Card>
  </div>
);
