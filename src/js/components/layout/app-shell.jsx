import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "@/store/appContext";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EstadoConexion } from "@/components/offline/estado-conexion";
import { InstalarApp } from "@/components/offline/instalar-app";
import { ListaPendientes } from "@/components/offline/lista-pendientes";

const RUTAS_PUBLICAS = ["/", "/login", "/signup", "/demo", "/app"];

export function AppShell({ children }) {
  const { store } = useContext(Context);
  const { pathname } = useLocation();

  if (RUTAS_PUBLICAS.includes(pathname)) return children;

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate">
                    {store.header || "LinkedTeam"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <EstadoConexion />
          </header>
          <InstalarApp />
          <div className="min-w-0 flex-1">{children}</div>
          <ListaPendientes />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
