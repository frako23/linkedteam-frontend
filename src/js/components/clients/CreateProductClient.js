import { useContext, useEffect, useState } from "react";
import { FolderPlus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Campo, CampoArea, CampoSelect, FormSheet, Fila } from "../form-kit";

const VACIO = {
  amount: "",
  date_of_closing: "",
  payment_recurrence: "",
  notes: "",
};

function CreateProductClient({ clientId }) {
  const { store, actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);
  const [clienteProducto, setClienteProducto] = useState(VACIO);
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    actions.getProducts();
  }, []);

  const handleForm = ({ target }) =>
    setClienteProducto({ ...clienteProducto, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto) return;
    actions.postClienteProductos(clienteProducto, clientId, producto.id);
    setClienteProducto(VACIO);
    setAbierto(false);
    toast.success("Producto asignado al cliente");
    actions.getProducts();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Asignar producto al cliente"
        title="Asignar producto"
        onClick={() => setAbierto(true)}
      >
        <FolderPlus />
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Asignar producto"
        onSubmit={handleSubmit}
      >
        <CampoSelect
          label="Producto"
          name="product_name"
          required
          value={producto?.product_name || ""}
          onChange={({ target }) =>
            setProducto(
              store.productos.find((p) => p.product_name == target.value) ||
                null
            )
          }
        >
          <option value="">
            {store.productos.length ? "Selecciona un producto" : "No hay productos guardados"}
          </option>
          {store.productos.map((p) => (
            <option key={p.id} value={p.product_name}>
              {p.product_name}
            </option>
          ))}
        </CampoSelect>
        <Fila>
          <Campo
            label="Fecha de cierre"
            name="date_of_closing"
            type="date"
            required
            value={clienteProducto.date_of_closing}
            onChange={handleForm}
          />
          <Campo
            label="Monto"
            name="amount"
            type="number"
            placeholder="5000"
            required
            value={clienteProducto.amount}
            onChange={handleForm}
          />
        </Fila>
        <CampoSelect
          label="Frecuencia de pago"
          name="payment_recurrence"
          required
          value={clienteProducto.payment_recurrence}
          onChange={handleForm}
        >
          <option value="">Selecciona una frecuencia</option>
          <option value="mensual">Mensual</option>
          <option value="trimestral">Trimestral</option>
          <option value="semestral">Semestral</option>
          <option value="anual">Anual</option>
        </CampoSelect>
        <CampoArea
          label="Descripción"
          name="notes"
          maxLength="1000"
          value={clienteProducto.notes}
          onChange={handleForm}
        />
      </FormSheet>
    </>
  );
}

export default CreateProductClient;
