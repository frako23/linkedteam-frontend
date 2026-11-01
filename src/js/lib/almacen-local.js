import { get, set, update, del } from "idb-keyval";

const VACIA = { clientes: [], actividades: [], actualizadoEn: null };

const intentar = async (fn) => {
  try {
    return { ok: true, valor: await fn() };
  } catch (error) {
    console.error("No se pudo usar el almacenamiento del teléfono", error);
    return { ok: false, valor: null };
  }
};

export const leerCache = async (userId) => {
  const r = await intentar(() => get(`cache:${userId}`));
  return { ok: r.ok, valor: r.valor || { ...VACIA } };
};

export const guardarCache = (userId, parcial) =>
  intentar(() =>
    update(`cache:${userId}`, (actual) => ({
      ...VACIA,
      ...(actual || {}),
      ...parcial,
      actualizadoEn: new Date().toISOString(),
    }))
  );

export const leerPendientes = async (userId) => {
  const r = await intentar(() => get(`pendientes:${userId}`));
  return { ok: r.ok, valor: r.valor || [] };
};

// Lee y escribe en una sola transacción. fn recibe la lista y devuelve la nueva.
export const actualizarPendientes = (userId, fn) =>
  intentar(async () => {
    let resultado = [];
    await update(`pendientes:${userId}`, (actual) => {
      resultado = fn(actual || []);
      return resultado;
    });
    return resultado;
  });

export const borrarCache = (userId) => intentar(() => del(`cache:${userId}`));

export const borrarDatosUsuario = (userId) =>
  intentar(async () => {
    await del(`cache:${userId}`);
    await del(`pendientes:${userId}`);
  });

export const pedirPersistencia = () =>
  intentar(() => navigator.storage?.persist?.());
