// Service worker e instalación de la app (specs/001-pwa-offline-sync, research R1 y R10).

const CLAVE_DESCARTADO = "instalar.descartadoEn";
const DIAS_SIN_INVITAR = 30;

let eventoInstalacion = null;
const suscriptores = new Set();
const avisar = () => suscriptores.forEach((fn) => fn());

// El service worker solo existe en el build de producción.
export const registrarServiceWorker = () => {
  if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => console.error("No se pudo registrar el service worker", error));
  });
};

export const capturarInstalacion = () => {
  window.addEventListener("beforeinstallprompt", (evento) => {
    evento.preventDefault();
    eventoInstalacion = evento;
    avisar();
  });
  window.addEventListener("appinstalled", () => {
    eventoInstalacion = null;
    avisar();
  });
};

export const suscribirInstalacion = (fn) => {
  suscriptores.add(fn);
  return () => suscriptores.delete(fn);
};

export const puedeInstalar = () => eventoInstalacion !== null;

export const pedirInstalacion = async () => {
  if (!eventoInstalacion) return;
  await eventoInstalacion.prompt();
  eventoInstalacion = null;
  avisar();
};

export const esStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

export const esIOS = () =>
  /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export const instalacionDescartadaReciente = () => {
  try {
    const guardado = localStorage.getItem(CLAVE_DESCARTADO);
    if (!guardado) return false;
    const dias = (Date.now() - new Date(guardado).getTime()) / (1000 * 60 * 60 * 24);
    return dias < DIAS_SIN_INVITAR;
  } catch (error) {
    return false;
  }
};

export const descartarInstalacion = () => {
  try {
    localStorage.setItem(CLAVE_DESCARTADO, new Date().toISOString());
  } catch (error) {
    // Sin localStorage la invitación puede volver a aparecer; no es grave.
  }
};
