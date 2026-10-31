import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout, CampoClave, EnlaceAuth } from "../components/auth/auth-layout";
import { ModalLoader } from "../components/utils/ModalLoader";

export const SignUp = () => {
  const { actions } = useContext(Context);
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [verClave, setVerClave] = useState(false);
  const navigate = useNavigate();

  const cambiar = ({ target }) =>
    setForm({ ...form, [target.name]: target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, confirmPassword } = form;
    if (password !== confirmPassword) {
      toast.error("La contraseña y su confirmación no coinciden");
      return;
    }
    actions.setLoader(true);
    const response = await actions.signup(name, lastname, email, password);
    if (response) {
      toast.success(`Te registraste correctamente, ${name}`);
      const ingreso = await actions.login(email, password);
      if (ingreso) navigate("/perfil");
    }
  };

  return (
    <AuthLayout
      titulo="Crea tu cuenta"
      descripcion="Empieza a organizar tus ventas y a formar a tu equipo."
      pie={
        <>
          <p>
            ¿Ya tienes cuenta? <EnlaceAuth to="/login">Ingresa</EnlaceAuth>
          </p>
          <p>
            ¿Quieres probar la app? <EnlaceAuth to="/demo">Entra a la demo</EnlaceAuth>
          </p>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Tu nombre"
              value={form.name}
              onChange={cambiar}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastname">Apellido</Label>
            <Input
              id="lastname"
              name="lastname"
              required
              placeholder="Tu apellido"
              value={form.lastname}
              onChange={cambiar}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tucorreo@correo.com"
            value={form.email}
            onChange={cambiar}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <CampoClave
            id="password"
            name="password"
            required
            value={form.password}
            visible={verClave}
            onToggle={() => setVerClave(!verClave)}
            onChange={cambiar}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirmPassword">Confirma tu contraseña</Label>
          <CampoClave
            id="confirmPassword"
            name="confirmPassword"
            required
            value={form.confirmPassword}
            visible={verClave}
            onToggle={() => setVerClave(!verClave)}
            onChange={cambiar}
          />
        </div>
        <Button type="submit" className="w-full">
          Crear cuenta
        </Button>
      </form>
      <ModalLoader />
    </AuthLayout>
  );
};
