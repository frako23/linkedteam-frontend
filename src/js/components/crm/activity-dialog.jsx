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
                {actividad.map((act, index) => (
                  <TableRow key={index}>
                    <TableCell className="tabular-nums">{act.date}</TableCell>
                    <TableCell className="capitalize">
                      {act.contact_type}
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
