import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Context } from "@/store/appContext";
import { tokenVigente } from "@/lib/sesion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout, CampoClave, EnlaceAuth } from "../components/auth/auth-layout";
import { ModalLoader } from "../components/utils/ModalLoader";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verClave, setVerClave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenVigente(store.token) && !store.sesionVencida) {
      navigate("/perfil");
    }
  }, [store.token, store.sesionVencida]);

  const ingresar = (e) => {
    e.preventDefault();
    if (store.conexion === false) {
      toast.error("Sin conexión. Necesitas internet para iniciar sesión.");
      return;
    }
    actions.setLoader(true);
    actions.login(email, password);
  };

  return (
    <AuthLayout
      titulo="Ingresa a tu cuenta"
      descripcion="Escribe tu correo y tu contraseña para continuar."
      pie={
        <>
          <p>
            ¿No tienes cuenta? <EnlaceAuth to="/signup">Regístrate</EnlaceAuth>
          </p>
          <p>
            ¿Quieres probar la app? <EnlaceAuth to="/demo">Entra a la demo</EnlaceAuth>
          </p>
        </>
      }
    >
      <form onSubmit={ingresar} className="flex flex-col gap-4">
        {store.conexion === false ? (
          <p className="text-destructive text-sm">
            Sin conexión. Necesitas internet para iniciar sesión.
          </p>
        ) : null}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="tucorreo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <CampoClave
            id="password"
            required
            value={password}
            visible={verClave}
            onToggle={() => setVerClave(!verClave)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Ingresar
        </Button>
      </form>
      <ModalLoader />
    </AuthLayout>
  );
};
