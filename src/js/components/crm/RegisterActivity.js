import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ClipboardPen } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, CampoSelect, FormSheet } from "../form-kit";

const VACIO = { date: "", contact_type: "", comment: "" };

export const RegisterActivity = ({ id }) => {
  const { store, actions } = useContext(Context);
  const [activity, setActivity] = useState(VACIO);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getClientActivity(id);
    }
  }, [store.token]);

  const handleActivity = ({ target }) =>
    setActivity({ ...activity, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postClientActivity(activity, id);
    setActivity(VACIO);
    setAbierto(false);
    toast.success("Actividad registrada");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Registrar actividad"
        title="Registrar actividad"
        onClick={() => setAbierto(true)}
      >
        <ClipboardPen />
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Registrar actividad"
        description="Anota la llamada, el mensaje o la cita."
        onSubmit={handleSubmit}
      >
        <Campo
          label="Fecha"
          name="date"
          type="date"
          value={activity.date}
          onChange={handleActivity}
          autoFocus
        />
        <CampoSelect
          label="Tipo de contacto"
          name="contact_type"
          required
          value={activity.contact_type}
          onChange={handleActivity}
        >
          <option value="">Selecciona el tipo de contacto</option>
          <option value="llamada">Llamada</option>
          <option value="mensaje">Mensaje o correo</option>
          <option value="cita">Cita</option>
        </CampoSelect>
        <CampoArea
          label="Comentarios"
          name="comment"
          placeholder="El cliente..."
          value={activity.comment}
          onChange={handleActivity}
        />
      </FormSheet>
    </>
  );
};

RegisterActivity.propTypes = {
  id: PropTypes.number,
};
