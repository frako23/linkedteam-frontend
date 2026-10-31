import { useContext, useState } from "react";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, FormSheet, Fila } from "../form-kit";

const VACIO = {
  name: "",
  birthdate: "",
  email: "",
  cellphone: "",
  amount: "",
  status: "Cliente",
  trust: "Alta",
  notes: "",
  tag: "white",
};

export const CreateClient = () => {
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
    toast.success("Cliente guardado");
  };

  return (
    <>
      <Button onClick={() => setAbierto(true)}>
        <UserPlus /> Nuevo cliente
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Nuevo cliente"
        description="Registra los datos de contacto de tu cliente."
        onSubmit={handleSubmit}
      >
        <Campo
          label="Nombre y apellido"
          name="name"
          required
          placeholder="Nombre del cliente"
          value={cliente.name}
          onChange={handleForm}
          autoFocus
        />
        <Campo
          label="Email"
          name="email"
          type="email"
          placeholder="nombre@correo.com"
          value={cliente.email}
          onChange={handleForm}
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
            label="Fecha de nacimiento"
            name="birthdate"
            type="date"
            value={cliente.birthdate}
            onChange={handleForm}
          />
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
