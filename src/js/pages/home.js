import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  Filter,
  GraduationCap,
  LayoutDashboard,
  ListTodo,
  Mail,
  Menu,
  Monitor,
  Moon,
  Sun,
  Table2,
} from "lucide-react";
import { ETAPAS } from "@/lib/etapas";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { VideoModal } from "../components/home/VideoModal";
import logo from "../../img/logoNavBar.png";

const CAPACIDADES = [
  {
    icono: GraduationCap,
    titulo: "Plataforma de formación",
    texto: "Carga contenido de alto valor para tu equipo de trabajo.",
    video: "6L098JYVed8",
    ancha: false,
  },
  {
    icono: Filter,
    titulo: "CRM con embudo de ventas",
    texto:
      "Guarda cada prospecto y usa el embudo para darle un seguimiento efectivo, de la primera llamada al cierre.",
    video: "QDPIif_bPx4",
    ancha: true,
  },
  {
    icono: Table2,
    titulo: "Registro de interacciones",
    texto: "Guarda todas las llamadas, mensajes y citas con tus prospectos.",
    video: "xrOD3gi7_WA",
    ancha: false,
  },
  {
    icono: LayoutDashboard,
    titulo: "Tablero de visualización",
    texto:
      "Indicadores del embudo, de gestión de ventas y resumen de tareas pendientes en un solo lugar.",
    video: "C1URivfYhDY",
    ancha: true,
  },
  {
    icono: Eye,
    titulo: "Actividad de tus asociados",
    texto:
      "Supervisa a tu fuerza de ventas y aumenta la productividad y el rendimiento de tu equipo.",
    video: "LD5cNftpKAU",
    ancha: false,
  },
  {
    icono: ListTodo,
    titulo: "Tareas pendientes",
    texto: "Anota las tareas clave y trabájalas con el método Kanban.",
    video: "mGI-JOQL6uM",
    ancha: true,
  },
];

const MUESTRA = [
  { etapa: ETAPAS[0], nombres: ["María Pérez", "Luis Gómez"], monto: "$1.200" },
  { etapa: ETAPAS[1], nombres: ["Ana Ruiz"], monto: "$800" },
  { etapa: ETAPAS[2], nombres: ["Carlos Díaz", "Sofía Mora"], monto: "$3.400" },
  { etapa: ETAPAS[3], nombres: ["Jorge León"], monto: "$5.000" },
  { etapa: ETAPAS[4], nombres: ["Elena Soto"], monto: "$2.100" },
];

function SelectorTema() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cambiar tema">
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon /> Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor /> Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MuestraEmbudo() {
  return (
    <div className="bg-card mx-auto w-full max-w-5xl rounded-2xl border p-2 shadow-2xl">
      <div className="bg-background overflow-hidden rounded-xl border p-3">
        <div className="flex gap-3 overflow-x-auto">
          {MUESTRA.map(({ etapa, nombres, monto }) => (
            <div
              key={etapa.status}
              className="bg-muted/50 flex w-48 shrink-0 flex-col gap-2 rounded-xl p-2 text-left"
            >
              <div className="flex items-center gap-2 px-1 text-xs font-medium">
                <span className={`size-2 rounded-full ${etapa.dot}`} />
                {etapa.label}
                <span className="text-muted-foreground ml-auto tabular-nums">
                  {monto}
                </span>
              </div>
              {nombres.map((nombre) => (
                <div
                  key={nombre}
                  className="bg-card flex flex-col gap-1 rounded-lg border p-2 text-xs shadow-xs"
                >
                  <span className="font-medium">{nombre}</span>
                  <span className="text-muted-foreground">Confianza alta</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Home = () => {
  const [menu, setMenu] = useState(false);
  const [video, setVideo] = useState({ title: "", url: "", abierto: false });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) navigate("/perfil");
  }, []);

  const enlaces = (
    <>
      <a href="#capacidades" onClick={() => setMenu(false)}>
        ¿Qué podrás hacer?
      </a>
      <Link to="/demo">Prueba la app</Link>
    </>
  );

  return (
    <div className="bg-background text-foreground min-h-svh">
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src={logo} alt="" className="size-8 object-contain" />
            LinkedTeam
          </Link>
          <nav className="text-muted-foreground hover:[&>a]:text-foreground hidden items-center gap-6 text-sm md:flex [&>a]:transition-colors">
            {enlaces}
          </nav>
          <div className="flex items-center gap-1">
            <SelectorTema />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/login">Ingresa</Link>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/signup">Regístrate</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menú"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>LinkedTeam</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4 [&>a]:rounded-lg [&>a]:px-3 [&>a]:py-3 [&>a]:text-sm [&>a]:font-medium [&>a:hover]:bg-accent">
            {enlaces}
            <Link to="/login">Ingresa</Link>
            <Link to="/signup">Regístrate</Link>
          </nav>
        </SheetContent>
      </Sheet>

      <main>
        <section className="hero-glow relative overflow-hidden">
          <div className="bg-cuadricula absolute inset-0 -z-0" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pt-20 pb-16 text-center md:pt-28">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              CRM + formación para equipos de seguros
            </Badge>
            <h1 className="max-w-4xl text-5xl leading-[1.05] font-semibold tracking-tighter text-balance md:text-7xl">
              Sácale el máximo potencial a{" "}
              <span className="from-primary to-brand-electrico bg-gradient-to-r bg-clip-text text-transparent">
                tu equipo de ventas
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg text-balance">
              Haz seguimiento efectivo de tus prospectos y los de tu equipo,
              registra cada interacción y forma a tus asesores, todo en un solo
              lugar.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-10 px-5">
                <Link to="/demo">
                  Prueba la app <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-10 px-5">
                <Link to="/login">Ingresa</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto max-w-6xl px-6 pb-20">
            <MuestraEmbudo />
          </div>
        </section>

        <section id="capacidades" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              ¿Qué podrás hacer en LinkedTeam?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Seis módulos que trabajan juntos: de la primera llamada al cierre,
              y de la formación al desempeño de tu equipo.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {CAPACIDADES.map((c) => (
              <Card
                key={c.titulo}
                className={`gap-3 p-6 ${c.ancha ? "md:col-span-2" : ""}`}
              >
                <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                  <c.icono className="size-5" />
                </div>
                <h3 className="text-base font-semibold">{c.titulo}</h3>
                <p className="text-muted-foreground text-sm">{c.texto}</p>
                <Button
                  variant="link"
                  className="mt-auto w-fit px-0"
                  onClick={() =>
                    setVideo({ title: c.titulo, url: c.video, abierto: true })
                  }
                >
                  Ver video <ArrowRight />
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
          <div className="dark bg-background text-foreground hero-glow relative overflow-hidden rounded-2xl border p-10 text-center md:p-16">
            <div className="relative flex flex-col items-center gap-4">
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
                Nunca olvides una tarea ni un prospecto
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Crea tu cuenta y empieza a ordenar tu embudo hoy mismo.
              </p>
              <Button asChild size="lg" className="h-10 px-5">
                <Link to="/signup">Crea tu cuenta</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm sm:flex-row">
          <a
            href="mailto:linkedteam2023@gmail.com"
            className="hover:text-foreground flex items-center gap-2"
          >
            <Mail className="size-4" /> linkedteam2023@gmail.com
          </a>
          <p>
            Creado por{" "}
            <a
              href="https://frako-dev.vercel.app/"
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              frakoDev
            </a>
          </p>
        </div>
      </footer>

      <VideoModal
        title={video.title}
        url={video.url}
        show={video.abierto}
        onHide={() => setVideo({ ...video, abierto: false })}
      />
    </div>
  );
};
