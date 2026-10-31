import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { AuthLayout, EnlaceAuth } from "../components/auth/auth-layout";
import { ModalLoader } from "../components/utils/ModalLoader";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/perfil");
    }
  }, [store.token]);

  const entrar = (correo, clave) => {
    actions.setLoader(true);
    actions.login(correo, clave);
  };

  return (
    <AuthLayout
      titulo="Prueba la app"
      descripcion="Elige un perfil de demostración y explora LinkedTeam sin registrarte."
      pie={
        <>
          <p>
            ¿Quieres registrarte? <EnlaceAuth to="/signup">Crea tu cuenta</EnlaceAuth>
          </p>
          <p>
            ¿Ya tienes cuenta? <EnlaceAuth to="/login">Ingresa</EnlaceAuth>
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Button onClick={() => entrar("gerente@correo.com", "gerente")}>
          Probar como gerente
        </Button>
        <Button
          variant="outline"
          onClick={() => entrar("asociado1@correo.com", "asociado1")}
        >
          Probar como asesor
        </Button>
      </div>
      <ModalLoader />
    </AuthLayout>
  );
};
