import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import SetRoleManager from "./setRoleManager";
import SetManager from "./setManager";

export const MainChart = () => {
  const { store, actions } = useContext(Context);
  const [usuarioClave, setUsuarioClave] = useState(null);
  const [nuevaClave, setNuevaClave] = useState("");

  useEffect(() => {
    actions.getTotalUsuarios();
  }, []);

  const cambiarClave = (e) => {
    e.preventDefault();
    if (!nuevaClave) return;
    actions.putUserPassword(nuevaClave, usuarioClave.id);
    toast.success(`Contraseña de ${usuarioClave.name} actualizada`);
    setNuevaClave("");
    setUsuarioClave(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold tracking-tight">Usuarios</h2>
      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Gerente</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {store.totalUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="tabular-nums">{usuario.id}</TableCell>
                <TableCell className="font-medium">
                  {usuario.name} {usuario.lastname}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {usuario.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{usuario.role}</Badge>
                </TableCell>
                <TableCell>
                  {usuario.manager ?? (
                    <SetManager userId={usuario.id} userName={usuario.name} />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {usuario.role == "associated" && (
                      <SetRoleManager
                        userId={usuario.id}
                        userName={usuario.name}
                      />
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUsuarioClave(usuario)}
                    >
                      Resetear contraseña
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        actions.putManager({
                          name: null,
                          id: null,
                          userId: usuario.id,
                        });
                        toast.success("Gerente reseteado");
                      }}
                    >
                      Resetear gerente
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!usuarioClave} onOpenChange={(v) => !v && setUsuarioClave(null)}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={cambiarClave} className="flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle>Nueva contraseña</DialogTitle>
              <DialogDescription>
                Define la nueva contraseña de {usuarioClave?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nueva-clave">Contraseña</Label>
              <Input
                id="nueva-clave"
                value={nuevaClave}
                onChange={(e) => setNuevaClave(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setUsuarioClave(null)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
