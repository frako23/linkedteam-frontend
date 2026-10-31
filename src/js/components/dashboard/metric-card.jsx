import { Card, CardContent, CardDescription } from "@/components/ui/card";

export function MetricCard({ titulo, valor, detalle, children }) {
  return (
    <Card className="gap-2 py-5">
      <CardContent className="flex flex-col gap-1 px-5">
        <CardDescription>{titulo}</CardDescription>
        <p className="text-3xl font-semibold tracking-tight tabular-nums">
          {valor}
        </p>
        {detalle ? (
          <p className="text-muted-foreground text-sm">{detalle}</p>
        ) : null}
        {children}
      </CardContent>
    </Card>
  );
}
