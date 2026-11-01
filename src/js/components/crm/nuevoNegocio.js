import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { ETAPAS } from "@/lib/etapas";
import { nuevoIdTemporal } from "@/lib/pendientes";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, CampoSelect, FormSheet, Fila } from "../form-kit";

const VACIO = {
  name: "",
  birthdate: "",
  email: "",
  cellphone: "",
  amount: "0",
  status: "Prospecto",
  trust: "Alta",
  notes: "",
  tag: "white",
};

/**
 * Formulario de nuevo negocio. Con `pendiente` (un negocio rechazado) abre en
 * modo "Corregir", controlado por `open` / `onOpenChange`, sin el botón propio.
 */
export const Nuevonegocio = ({ pendiente, open, onOpenChange }) => {
  const { store, actions } = useContext(Context);
  const [cliente, setCliente] = useState(pendiente ? pendiente.datos : VACIO);
  const [abiertoPropio, setAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const abierto = pendiente ? open : abiertoPropio;
  const cambiarAbierto = pendiente ? onOpenChange : setAbierto;

  useEffect(() => {
    if (pendiente && open) setCliente(pendiente.datos);
  }, [pendiente, open]);

  const handleForm = ({ target }) =>
    setCliente({ ...cliente, [target.name]: target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guardando) return;
    setGuardando(true);

    if (pendiente) {
      await actions.corregirPendiente(pendiente.id, cliente);
      setGuardando(false);
      toast.success("Negocio corregido", {
        description: "Se enviará en unos segundos.",
      });
      cambiarAbierto(false);
      return;
    }

    const temporal = nuevoIdTemporal(store.clientes, store.pendientes);
    const r = await actions.encolarCambio("negocio", temporal, cliente);
    setGuardando(false);

    if (r.estado === "enviado") {
      toast.success("Negocio guardado");
    } else if (r.estado === "guardado") {
      toast.success("Negocio guardado", {
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
    cambiarAbierto(false);
    setCliente(VACIO);
  };

  return (
    <>
      {pendiente ? null : (
        <Button onClick={() => setAbierto(true)}>
          <Plus /> Nuevo negocio
        </Button>
      )}
      <FormSheet
        open={abierto}
        onOpenChange={cambiarAbierto}
        title={pendiente ? "Corregir negocio" : "Nuevo negocio"}
        description={
          pendiente
            ? pendiente.motivo
            : "Registra a tu prospecto y elige en qué etapa empieza."
        }
        onSubmit={handleSubmit}
        guardando={guardando}
      >
        <Campo
          label="Nombre y apellido"
          name="name"
          required
          value={cliente.name}
          onChange={handleForm}
          autoFocus
        />
        <Fila>
          <Campo
            label="Celular"
            name="cellphone"
            type="tel"
            placeholder="04XX-XXXXXXX"
            value={cliente.cellphone}
            onChange={handleForm}
          />
          <Campo
            label="Email"
            name="email"
            type="email"
            placeholder="nombre@correo.com"
            value={cliente.email}
            onChange={handleForm}
          />
        </Fila>
        <Fila>
          <Campo
            label="Fecha de nacimiento"
            name="birthdate"
            type="date"
            value={cliente.birthdate}
            onChange={handleForm}
          />
          <Campo
            label="Monto"
            name="amount"
            type="number"
            min="0"
            value={cliente.amount}
            onChange={handleForm}
          />
        </Fila>
        <Fila>
          <CampoSelect
            label="Etapa"
            name="status"
            required
            value={cliente.status}
            onChange={handleForm}
          >
            {ETAPAS.map((e) => (
              <option key={e.status} value={e.status}>
                {e.status}
              </option>
            ))}
          </CampoSelect>
          <CampoSelect
            label="Nivel de confianza"
            name="trust"
            required
            value={cliente.trust}
            onChange={handleForm}
          >
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </CampoSelect>
        </Fila>
        <CampoArea
          label="Notas"
          name="notes"
          placeholder="Breve descripción: ¿hijos? ¿pareja?"
          value={cliente.notes}
          onChange={handleForm}
        />
      </FormSheet>
    </>
  );
};

Nuevonegocio.propTypes = {
  pendiente: PropTypes.object,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
};
