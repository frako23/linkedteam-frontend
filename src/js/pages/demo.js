import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, UserRound } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { EnlaceAuth } from "../components/auth/auth-layout";
import { ModalLoader } from "../components/utils/ModalLoader";

// Usuarios creados por `python seed.py` en el backend (corretaje de seguros de vida y salud).
const DOMINIO = "@corredoramedina.test";
const CLAVE = "Demo1234!";

const GRUPOS = [
  {
    rol: "Gerente",
    icono: Briefcase,
    descripcion:
      "Monitorea el desempeño de su equipo, revisa el embudo de cada asesor y asigna cursos en video.",
    perfiles: [
      {
        usuario: "carolina",
        nombre: "Carolina Méndez",
        detalle: "Equipo de 4 asesores · meta USD 60.000 · 6 clientes propios",
      },
      {
        usuario: "rafael",
        nombre: "Rafael Ortega",
        detalle: "Equipo de 2 asesores · meta USD 40.000 · 6 clientes propios",
      },
    ],
  },
  {
    rol: "Asesor",
    icono: UserRound,
    descripcion:
      "Gestiona sus prospectos en el embudo de ventas, registra actividades, tareas y las pólizas de vida y salud que cierra.",
    perfiles: [
      {
        usuario: "valentina",
        nombre: "Valentina Rojas",
        detalle: "Equipo de Carolina · 14 clientes, alto nivel de cierres",
      },
      {
        usuario: "andres",
        nombre: "Andrés Salazar",
        detalle: "Equipo de Carolina · 12 clientes, rendimiento medio",
      },
      {
        usuario: "mariana",
        nombre: "Mariana Pérez",
        detalle: "Equipo de Carolina · 10 clientes, rendimiento medio",
      },
      {
        usuario: "diego",
        nombre: "Diego Fuentes",
        detalle: "Equipo de Carolina · asesor nuevo, primer cierre reciente",
      },
      {
        usuario: "lucia",
        nombre: "Lucía Herrera",
        detalle: "Equipo de Rafael · 12 clientes, alto nivel de cierres",
      },
      {
        usuario: "javier",
        nombre: "Javier Campos",
        detalle: "Equipo de Rafael · 9 clientes, rendimiento medio",
      },
    ],
  },
];

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      navigate("/perfil");
    }
  }, [store.token]);

  const entrar = (usuario) => {
    actions.setLoader(true);
    actions.login(`${usuario}${DOMINIO}`, CLAVE);
  };

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 p-6 md:p-10">
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Logo className="size-6" />
        LinkedTeam
      </Link>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Prueba la app</h1>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Explora LinkedTeam con los datos de una corredora de seguros de vida
          y salud. Elige un perfil y entra con un clic: cada rol ve una parte
          distinta de la plataforma.
        </p>
      </div>

      {GRUPOS.map(({ rol, icono: Icono, descripcion, perfiles }) => (
        <section key={rol} className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md">
              <Icono className="size-4" />
            </div>
            <div>
              <h2 className="font-semibold">{rol}</h2>
              <p className="text-muted-foreground text-sm">{descripcion}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {perfiles.map((perfil) => (
              <Card key={perfil.usuario}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    {perfil.nombre}
                    <Badge variant="secondary">{rol}</Badge>
                  </CardTitle>
                  <CardDescription>{perfil.detalle}</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs">
                  <p className="break-all">
                    {perfil.usuario}
                    {DOMINIO}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={rol === "Asesor" ? "outline" : "default"}
                    onClick={() => entrar(perfil.usuario)}
                  >
                    Entrar como {perfil.nombre.split(" ")[0]}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <p className="text-muted-foreground text-xs">
        Contraseña de todos los perfiles: <code>{CLAVE}</code>. Si no
        funcionan, carga los datos en el backend con <code>python seed.py</code>.
      </p>

      <div className="text-muted-foreground flex flex-col gap-1 text-sm">
        <p>
          ¿Quieres registrarte? <EnlaceAuth to="/signup">Crea tu cuenta</EnlaceAuth>
        </p>
        <p>
          ¿Ya tienes cuenta? <EnlaceAuth to="/login">Ingresa</EnlaceAuth>
        </p>
      </div>
      <ModalLoader />
    </div>
  );
};
