import { useContext, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, FormSheet, Fila } from "../form-kit";

export const EditClient = ({ name, birthdate, cellphone, email, id }) => {
  const { actions } = useContext(Context);
  const inicial = {
    name,
    birthdate,
    email,
    cellphone,
    amount: "",
    status: "Cliente",
    trust: "Alta",
    notes: "",
    tag: "",
  };
  const [cliente, setCliente] = useState(inicial);
  const [abierto, setAbierto] = useState(false);

  const handleForm = ({ target }) =>
    setCliente({ ...cliente, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.putClientes(cliente, id);
    setAbierto(false);
    toast.success("Cliente actualizado");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Editar cliente"
        title="Editar cliente"
        onClick={() => setAbierto(true)}
      >
        <Pencil />
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Editar cliente"
        onSubmit={handleSubmit}
      >
        <Campo
          label="Nombre y apellido"
          name="name"
          required
          value={cliente.name}
          onChange={handleForm}
        />
        <Campo
          label="Email"
          name="email"
          type="email"
          value={cliente.email}
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
            label="Fecha de nacimiento"
            name="birthdate"
            type="date"
            value={cliente.birthdate}
            onChange={handleForm}
          />
        </Fila>
      </FormSheet>
    </>
  );
};
