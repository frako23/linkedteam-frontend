import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export function ActivityDialog({ open, onClose, actividad = [] }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Interacciones</DialogTitle>
          <DialogDescription>
            Llamadas, mensajes y citas registradas con este cliente.
          </DialogDescription>
        </DialogHeader>
        {actividad.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Sin interacciones</EmptyTitle>
              <EmptyDescription>
                Registra una actividad desde la tarjeta del cliente.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="max-h-96 overflow-y-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-28">Fecha</TableHead>
                  <TableHead className="w-32">Tipo</TableHead>
                  <TableHead>Comentario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actividad.map((act) => (
                  <TableRow key={act.id}>
                    <TableCell className="tabular-nums">{act.date}</TableCell>
                    <TableCell className="capitalize">
                      <span className="flex flex-wrap items-center gap-1.5">
                        {act.contact_type}
                        {act.pendiente ? (
                          <Badge variant="secondary" className="normal-case">
                            <Clock className="size-3" />
                            {act.estado === "rechazado"
                              ? "No se pudo enviar"
                              : "Pendiente"}
                          </Badge>
                        ) : null}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      {act.comment}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
