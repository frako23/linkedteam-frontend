import { useContext, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { ETAPAS } from "@/lib/etapas";
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

export const Nuevonegocio = () => {
  const { actions } = useContext(Context);
  const [cliente, setCliente] = useState(VACIO);
  const [abierto, setAbierto] = useState(false);

  const handleForm = ({ target }) =>
    setCliente({ ...cliente, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postClientes(cliente);
    setAbierto(false);
    setCliente(VACIO);
    toast.success("Negocio guardado");
  };

  return (
    <>
      <Button onClick={() => setAbierto(true)}>
        <Plus /> Nuevo negocio
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Nuevo negocio"
        description="Registra a tu prospecto y elige en qué etapa empieza."
        onSubmit={handleSubmit}
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
