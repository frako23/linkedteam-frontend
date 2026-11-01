// Lógica pura de la cola de cambios pendientes (sin React ni red).
// Reglas en specs/001-pwa-offline-sync/data-model.md.

const ETAPAS_VALIDAS = [
  "Prospecto",
  "Contactado",
  "Primera Cita",
  "Negociación",
  "Cerrado",
];
const TIPOS_CONTACTO = ["llamada", "mensaje", "cita"];
const MOTIVO_BLOQUEADO = "Depende de un negocio que no se pudo guardar.";
const MOTIVO_CLIENTE = "Ese cliente ya no está en tu cartera.";

export const crearCambio = ({
  tipo,
  clienteId,
  datos,
  ahora = new Date(),
  id = crypto.randomUUID(),
}) => ({
  id,
  tipo,
  creadoEn: ahora.toISOString(),
  clienteId,
  datos,
  estado: "pendiente",
  motivo: null,
  avisar: false,
});

export const clasificarRespuesta = (status, tipo) => {
  if (status === 200 || status === 201) return "enviado";
  if (status === 409 && tipo === "etapa") return "superado";
  if (status === 400 || status === 403 || status === 404) return "rechazado";
  if (status === 401 || status === 422) return "sesion";
  return "temporal";
};

export const textoMotivo = (status, cuerpo) => {
  if (status === 403 || status === 404) return MOTIVO_CLIENTE;
  if (typeof cuerpo === "string" && cuerpo) return cuerpo;
  if (cuerpo && typeof cuerpo.msg === "string" && cuerpo.msg) return cuerpo.msg;
  return "No se pudo guardar el cambio.";
};

const cambiar = (pendientes, id, fn) =>
  pendientes.map((c) => (c.id === id ? fn(c) : c));

export const marcarEstado = (pendientes, id, estado, motivo = null) =>
  cambiar(pendientes, id, (c) => ({ ...c, estado, motivo }));

export const quitar = (pendientes, id) => pendientes.filter((c) => c.id !== id);

export const reiniciarEnviando = (pendientes) =>
  pendientes.map((c) => (c.estado === "enviando" ? { ...c, estado: "pendiente" } : c));

const dependeDeNegocio = (cambio) => cambio.tipo !== "negocio" && cambio.clienteId < 0;

// Primer cambio listo para enviar: FIFO, sin rechazados ni bloqueados, y sin
// los que esperan a que se cree su negocio.
export const siguienteParaEnviar = (pendientes) =>
  pendientes.find((c) => {
    if (c.estado !== "pendiente") return false;
    if (dependeDeNegocio(c)) {
      return !pendientes.some((n) => n.tipo === "negocio" && n.clienteId === c.clienteId);
    }
    return true;
  }) || null;

// Bloquea los dependientes de un negocio rechazado y libera los de uno corregido.
export const resolverDependencias = (pendientes) =>
  pendientes.map((c) => {
    if (!dependeDeNegocio(c)) return c;
    const padre = pendientes.find((n) => n.tipo === "negocio" && n.clienteId === c.clienteId);
    if (padre && padre.estado === "rechazado" && c.estado === "pendiente") {
      return { ...c, estado: "bloqueado", motivo: MOTIVO_BLOQUEADO };
    }
    if (padre && padre.estado !== "rechazado" && c.estado === "bloqueado") {
      return { ...c, estado: "pendiente", motivo: null };
    }
    return c;
  });

export const validarInteraccion = (datos) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datos?.date || "")) return "Elige la fecha.";
  if (!TIPOS_CONTACTO.includes(datos.contact_type)) return "Elige el tipo de contacto.";
  if (!datos.comment || !datos.comment.trim()) return "Escribe un comentario.";
  return null;
};

export const validarEtapa = (datos) =>
  ETAPAS_VALIDAS.includes(datos?.status) ? null : "Elige la etapa.";

export const validarNegocio = (datos) => {
  if (!datos?.name || !datos.name.trim()) return "Escribe el nombre del negocio.";
  if (validarEtapa(datos)) return "Elige la etapa.";
  if (!datos.trust) return "Elige el nivel de confianza.";
  return null;
};

export const nuevoIdTemporal = (clientes, pendientes) => {
  const usados = new Set([
    ...clientes.map((c) => c.id),
    ...pendientes.map((c) => c.clienteId),
  ]);
  let id = -Date.now();
  while (usados.has(id)) id -= 1;
  return id;
};

// Agrega un cambio; los movimientos de etapa del mismo negocio se fusionan.
export const agregarCambio = (pendientes, cambio) => {
  if (cambio.tipo !== "etapa") return [...pendientes, cambio];
  const creacion = pendientes.find(
    (c) => c.tipo === "negocio" && c.clienteId === cambio.clienteId && c.estado === "pendiente"
  );
  if (creacion) {
    return cambiar(pendientes, creacion.id, (c) => ({
      ...c,
      datos: { ...c.datos, status: cambio.datos.status },
    }));
  }
  const previo = pendientes.find(
    (c) => c.tipo === "etapa" && c.clienteId === cambio.clienteId && c.estado === "pendiente"
  );
  if (previo) {
    return cambiar(pendientes, previo.id, (c) => ({
      ...c,
      datos: cambio.datos,
      creadoEn: cambio.creadoEn,
    }));
  }
  return [...pendientes, cambio];
};

export const reemplazarIdTemporal = (pendientes, temporal, real) =>
  pendientes.map((c) => (c.clienteId === temporal ? { ...c, clienteId: real } : c));

// Lo que ve el usuario: datos del servidor más los cambios pendientes encima.
export const aplicarPendientes = ({ clientes, actividades }, pendientes) => {
  const clienteOffline = new Set(clientes.map((c) => c.offline_id).filter(Boolean));
  const actividadOffline = new Set(actividades.map((a) => a.offline_id).filter(Boolean));
  let lista = clientes.map((c) => ({ ...c }));
  const nuevasActividades = [];

  for (const p of pendientes) {
    if (p.tipo === "negocio" && !clienteOffline.has(p.id)) {
      lista.push({
        amount: "0",
        tag: "white",
        ...p.datos,
        id: p.clienteId,
        offline_id: p.id,
        pendiente: true,
        estado: p.estado,
      });
    }
  }
  for (const p of pendientes) {
    if (p.tipo === "etapa") {
      lista = lista.map((c) =>
        c.id === p.clienteId
          ? { ...c, status: p.datos.status, pendiente: true, estado: p.estado }
          : c
      );
    } else if (p.tipo === "interaccion" && !actividadOffline.has(p.id)) {
      nuevasActividades.push({
        ...p.datos,
        id: p.id,
        client_id: p.clienteId,
        offline_id: p.id,
        pendiente: true,
        estado: p.estado,
      });
    }
  }
  return {
    clientes: lista,
    actividades: [...actividades.map((a) => ({ ...a })), ...nuevasActividades],
  };
};
