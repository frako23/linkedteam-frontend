import { useContext } from "react";
import { Context } from "@/store/appContext";
import { Spinner } from "@/components/ui/spinner";

/** Velo de carga a pantalla completa mientras `store.loader` esté activo. */
export const ModalLoader = () => {
  const { store } = useContext(Context);
  if (!store.loader) return null;
  return (
    <div
      role="status"
      className="bg-background/70 fixed inset-0 z-50 flex items-center justify-center gap-2 backdrop-blur-sm"
    >
      <Spinner className="size-5" />
      <span className="text-sm font-medium">Cargando…</span>
    </div>
  );
};
