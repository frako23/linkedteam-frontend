import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bug,
  ChevronsUpDown,
  CirclePlay,
  GraduationCap,
  HandCoins,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Monitor,
  Moon,
  Presentation,
  Filter,
  Sun,
  Users,
} from "lucide-react";
import { Context } from "@/store/appContext";
import { useTheme } from "@/components/theme-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const iniciales = (nombre = "", apellido = "") =>
  `${nombre[0] || ""}${apellido[0] || ""}`.toUpperCase() || "LT";

export function AppSidebar() {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const role = localStorage.getItem("usuario.role");
  const nombre = localStorage.getItem("usuario.name") || "";
  const apellido = localStorage.getItem("usuario.lastname") || "";
  const correo = localStorage.getItem("usuario.email") || "";

  useEffect(() => {
    if (store.usuario.manager_id) {
      actions.getCourses(store.usuario.manager_id);
    }
  }, [store.usuario.manager_id]);

  const ventas = [
    { titulo: "Tablero de control", url: "/perfil", icono: LayoutDashboard },
    { titulo: "Embudo de ventas", url: "/salesFunnel", icono: Filter },
    { titulo: "Clientes", url: "/clients", icono: Users },
    { titulo: "Tareas pendientes", url: "/todo", icono: ListTodo },
  ];

  const formacion = [
    ...(store.courses.length > 0
      ? [
          {
            titulo: "Cursos disponibles",
            url: "/courses",
            icono: GraduationCap,
            conteo: store.courses.length,
          },
        ]
      : []),
    ...(role === "manager"
      ? [
          {
            titulo: "Cursos para tu equipo",
            url: "/OwnAgencyCourses",
            icono: Presentation,
          },
        ]
      : []),
    { titulo: "Videos tutoriales", url: "/tutorialVideos", icono: CirclePlay },
  ];

  const apoyo = [
    { titulo: "Suscripción", url: "/pricing", icono: HandCoins },
    { titulo: "Reportar errores", url: "/bugs", icono: Bug },
  ];

  const grupo = (etiqueta, items) => (
    <SidebarGroup>
      <SidebarGroupLabel>{etiqueta}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                tooltip={item.titulo}
                isActive={pathname.toLowerCase() === item.url.toLowerCase()}
              >
                <Link to={item.url}>
                  <item.icono />
                  <span>{item.titulo}</span>
                </Link>
              </SidebarMenuButton>
              {item.conteo ? (
                <SidebarMenuBadge>{item.conteo}</SidebarMenuBadge>
              ) : null}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  const [confirmarSalida, setConfirmarSalida] = useState(false);

  const salir = () => {
    actions.logout();
    navigate("/");
  };

  // Antes de salir se intenta enviar lo pendiente; si algo queda, se pide confirmar.
  const cerrarSesion = async () => {
    if (store.pendientes.length > 0 && store.conexion !== false) {
      const aviso = toast.loading("Enviando tus cambios…");
      await actions.sincronizar();
      toast.dismiss(aviso);
    }
    if (store.pendientes.length > 0) {
      setConfirmarSalida(true);
      return;
    }
    salir();
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/perfil">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">LinkedTeam</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {role === "manager"
                      ? "Gerente"
                      : role === "admin"
                        ? "Administrador"
                        : "Asesor"}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {grupo("Ventas", ventas)}
        {grupo("Formación", formacion)}
        {grupo("Más", apoyo)}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {iniciales(nombre, apellido)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {nombre} {apellido}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {correo}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
                  Tema
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun /> Claro {theme === "light" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon /> Oscuro {theme === "dark" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor /> Sistema {theme === "system" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={cerrarSesion}>
                  <LogOut /> Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
      <AlertDialog open={confirmarSalida} onOpenChange={setConfirmarSalida}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión sin enviar tus cambios?</AlertDialogTitle>
            <AlertDialogDescription>
              Tienes {store.pendientes.length}{" "}
              {store.pendientes.length === 1 ? "cambio" : "cambios"} sin enviar. Si
              cierras sesión, se borrarán de este teléfono.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={salir}>
              Cerrar sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
