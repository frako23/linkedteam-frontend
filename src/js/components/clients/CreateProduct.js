import { useContext, useEffect, useState } from "react";
import { PackagePlus } from "lucide-react";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Campo, CampoArea, FormSheet, Fila } from "../form-kit";

const VACIO = {
  company: "",
  product_name: "",
  product_type: "",
  product_description: "",
};

function CreateProduct() {
  const { store, actions } = useContext(Context);
  const [abierto, setAbierto] = useState(false);
  const [products, setProducts] = useState(VACIO);

  useEffect(() => {
    actions.getProducts();
  }, []);

  const handleForm = ({ target }) =>
    setProducts({ ...products, [target.name]: target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.postProducts(products);
    setProducts(VACIO);
    setAbierto(false);
    toast.success("Producto registrado");
    actions.getProducts();
  };

  return (
    <>
      <Button variant="outline" onClick={() => setAbierto(true)}>
        <PackagePlus /> Nuevo producto
      </Button>
      <FormSheet
        open={abierto}
        onOpenChange={setAbierto}
        title="Crea tu producto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <Label>Productos cargados</Label>
          <div className="flex flex-wrap gap-2">
            {store.productos.length > 0 ? (
              store.productos.map((producto) => (
                <Badge key={producto.id} variant="secondary">
                  {producto.product_name}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                Aún no tienes productos cargados
              </p>
            )}
          </div>
        </div>
        <Campo
          label="Empresa"
          name="company"
          required
          value={products.company}
          onChange={handleForm}
        />
        <Fila>
          <Campo
            label="Nombre de la póliza"
            name="product_name"
            required
            value={products.product_name}
            onChange={handleForm}
          />
          <Campo
            label="Tipo de póliza"
            name="product_type"
            required
            value={products.product_type}
            onChange={handleForm}
          />
        </Fila>
        <CampoArea
          label="Descripción"
          name="product_description"
          value={products.product_description}
          onChange={handleForm}
        />
      </FormSheet>
    </>
  );
}

export default CreateProduct;
