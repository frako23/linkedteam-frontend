import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function SetRoleManager({ userId, userName }) {
  const { actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setAbierto(true)}>
        Hacer gerente
      </Button>
      <AlertDialog open={abierto} onOpenChange={setAbierto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Asignar rol de gerente a {userName}?</AlertDialogTitle>
            <AlertDialogDescription>
              Podrá ver el embudo de sus asesores y publicar cursos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                actions.selectRole({ userId, role: "manager" });
                toast.success(`${userName} ahora es gerente`);
              }}
            >
              Asignar rol
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SetRoleManager;

SetRoleManager.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userName: PropTypes.string,
};
