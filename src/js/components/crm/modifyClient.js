import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { ETAPAS } from "@/lib/etapas";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, CampoSelect, FormSheet, Fila } from "../form-kit";

export const ModifyClient = ({ prospecto }) => {
  const { actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);
  const [cliente, setCliente] = useState({
    name: prospecto.name,
    birthdate: prospecto.birthdate,
    email: prospecto.email,
    cellphone: prospecto.cellphone,
    amount: prospecto.amount,
    trust: prospecto.trust,
    tag: prospecto.tag,
    status: prospecto.status,
    notes: prospecto.notes,
  });

  const handleForm = ({ target }) =>
    setCliente({ ...cliente, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.putClientes(cliente, prospecto.id);
    setAbierto(false);
    toast.success("Negocio actualizado");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={`Editar a ${prospecto.name}`}
        title="Editar"
        onClick={() => setAbierto(true)}
      >
        <Pencil />
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title={prospecto.name}
        description="Edita los datos del negocio."
        onSubmit={handleSubmit}
      >
        <Campo
          label="Nombre y apellido"
          name="name"
          value={cliente.name}
          onChange={handleForm}
        />
        <Fila>
          <Campo
            label="Celular"
            name="cellphone"
            type="tel"
            value={cliente.cellphone}
            onChange={handleForm}
          />
          <Campo
            label="Email"
            name="email"
            type="email"
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
            value={cliente.amount}
            onChange={handleForm}
          />
        </Fila>
        <Fila>
          <CampoSelect
            label="Etapa"
            name="status"
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

ModifyClient.propTypes = {
  prospecto: PropTypes.object,
};
