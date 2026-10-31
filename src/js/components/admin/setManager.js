import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SetManager({ userId, userName }) {
  const { store, actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);
  const [gerente, setGerente] = useState(null);

  const gerentes = store.totalUsuarios.filter((u) => u.role == "manager");

  const guardar = () => {
    if (!gerente) return;
    actions.putManager({ name: gerente.name, id: gerente.id, userId });
    toast.success(`${gerente.name} es ahora el gerente de ${userName}`);
    setAbierto(false);
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setAbierto(true)}>
        Asignar gerente
      </Button>
      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Asignar gerente a {userName}</DialogTitle>
            <DialogDescription>
              Elige quién supervisará a este asesor.
            </DialogDescription>
          </DialogHeader>
          <Select
            onValueChange={(valor) =>
              setGerente(gerentes.find((g) => String(g.id) === valor))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un gerente" />
            </SelectTrigger>
            <SelectContent>
              {gerentes.map((g) => (
                <SelectItem key={g.id} value={String(g.id)}>
                  {g.name} {g.lastname}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAbierto(false)}>
              Cancelar
            </Button>
            <Button onClick={guardar} disabled={!gerente}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SetManager;

SetManager.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userName: PropTypes.string,
};
