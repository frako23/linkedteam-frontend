import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { ClipboardPen } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, CampoSelect, FormSheet } from "../form-kit";

// Fecha de hoy en la zona del usuario, como YYYY-MM-DD.
const hoy = () => new Date().toLocaleDateString("en-CA");
const vacio = () => ({ date: hoy(), contact_type: "", comment: "" });

export const RegisterActivity = ({ id }) => {
  const { actions } = useContext(Context);
  const [activity, setActivity] = useState(vacio);
  const [abierto, setAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const handleActivity = ({ target }) =>
    setActivity({ ...activity, [target.name]: target.value });

  const abrir = () => {
    setActivity(vacio());
    setAbierto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guardando) return;
    setGuardando(true);
    const r = await actions.encolarCambio("interaccion", id, activity);
    setGuardando(false);

    if (r.estado === "enviado") {
      toast.success("Actividad registrada");
    } else if (r.estado === "guardado") {
      toast.success("Interacción guardada", {
        description: "Se enviará cuando vuelvas a tener conexión.",
      });
    } else if (r.estado === "rechazado") {
      toast.error("No se pudo guardar", { description: r.motivo });
    } else if (r.estado === "invalido") {
      toast.error(r.motivo);
      return;
    } else {
      // Sin espacio en el teléfono: el formulario sigue abierto con lo escrito.
      return;
    }
    setActivity(vacio());
    setAbierto(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Registrar actividad"
        title="Registrar actividad"
        onClick={abrir}
      >
        <ClipboardPen />
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Registrar actividad"
        description="Anota la llamada, el mensaje o la cita."
        onSubmit={handleSubmit}
        guardando={guardando}
      >
        <Campo
          label="Fecha"
          name="date"
          type="date"
          required
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
          required
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
