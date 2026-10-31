import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "@/store/appContext";
import { formatoMonto } from "@/lib/etapas";
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

export const ClientProducts = ({ show, onClose, client }) => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    if (client.id) actions.getAllClienteProductos(client.id);
  }, [client.id]);

  return (
    <Dialog open={show} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Productos de {client.name}</DialogTitle>
          <DialogDescription>
            Pólizas y productos asociados a este cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-auto rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inicio</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead>Notas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {store.allClienteProductos.map((p, index) => (
                <TableRow key={index}>
                  <TableCell className="tabular-nums">{p.date_of_closing}</TableCell>
                  <TableCell>{p.product_type}</TableCell>
                  <TableCell>{p.company}</TableCell>
                  <TableCell>{p.product_name}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatoMonto(p.amount)}
                  </TableCell>
                  <TableCell className="capitalize">{p.payment_recurrence}</TableCell>
                  <TableCell className="whitespace-normal">{p.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ClientProducts.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  client: PropTypes.object,
};
