import test from "node:test";
import assert from "node:assert/strict";
import {
  crearCambio,
  clasificarRespuesta,
  textoMotivo,
  siguienteParaEnviar,
  marcarEstado,
  quitar,
  reiniciarEnviando,
  validarInteraccion,
  validarNegocio,
  validarEtapa,
  nuevoIdTemporal,
  agregarCambio,
  reemplazarIdTemporal,
  resolverDependencias,
  aplicarPendientes,
} from "../src/js/lib/pendientes.js";

const interaccion = (clienteId, id) =>
  crearCambio({
    tipo: "interaccion",
    clienteId,
    id,
    datos: { date: "2026-11-01", contact_type: "cita", comment: "Hola" },
  });
const negocio = (clienteId, id, status = "Prospecto") =>
  crearCambio({
    tipo: "negocio",
    clienteId,
    id,
    datos: { name: "Luis Gómez", status, trust: "Alta" },
  });
const etapa = (clienteId, id, status, ahora) =>
  crearCambio({
    tipo: "etapa",
    clienteId,
    id,
    ahora,
    datos: { status, nombre: "Ana" },
  });

test("crearCambio arma el cambio pendiente", () => {
  const c = interaccion(5, "abc");
  assert.equal(c.id, "abc");
  assert.equal(c.estado, "pendiente");
  assert.equal(c.avisar, false);
  assert.equal(c.motivo, null);
  assert.ok(!Number.isNaN(Date.parse(c.creadoEn)));
  assert.match(
    crearCambio({ tipo: "etapa", clienteId: 1, datos: {} }).id,
    /^[0-9a-f-]{36}$/
  );
});

test("clasificarRespuesta sigue la tabla de research R3", () => {
  assert.equal(clasificarRespuesta(200, "interaccion"), "enviado");
  assert.equal(clasificarRespuesta(201, "negocio"), "enviado");
  assert.equal(clasificarRespuesta(409, "etapa"), "superado");
  for (const s of [400, 403, 404])
    assert.equal(clasificarRespuesta(s, "interaccion"), "rechazado");
  for (const s of [401, 422])
    assert.equal(clasificarRespuesta(s, "etapa"), "sesion");
  for (const s of [0, 500, 503, 429])
    assert.equal(clasificarRespuesta(s, "interaccion"), "temporal");
});

test("textoMotivo devuelve texto listo para mostrar", () => {
  assert.equal(textoMotivo(400, "Elige la etapa."), "Elige la etapa.");
  assert.equal(textoMotivo(400, { msg: "Algo" }), "Algo");
  assert.equal(
    textoMotivo(403, { msg: "x" }),
    "Ese cliente ya no está en tu cartera."
  );
  assert.equal(
    textoMotivo(404, null),
    "Ese cliente ya no está en tu cartera."
  );
  assert.equal(textoMotivo(400, null), "No se pudo guardar el cambio.");
});

test("siguienteParaEnviar respeta FIFO y salta rechazados y bloqueados", () => {
  let lista = [interaccion(1, "a"), interaccion(2, "b"), interaccion(3, "c")];
  assert.equal(siguienteParaEnviar(lista).id, "a");
  lista = marcarEstado(lista, "a", "rechazado", "m");
  lista = marcarEstado(lista, "b", "bloqueado", "m");
  assert.equal(siguienteParaEnviar(lista).id, "c");
  assert.equal(siguienteParaEnviar(quitar(lista, "c")), null);
});

test("reiniciarEnviando devuelve enviando a pendiente", () => {
  const lista = marcarEstado(
    [interaccion(1, "a"), interaccion(2, "b")],
    "a",
    "enviando"
  );
  assert.deepEqual(
    reiniciarEnviando(lista).map((c) => c.estado),
    ["pendiente", "pendiente"]
  );
});

test("validarInteraccion usa las reglas del servidor", () => {
  const ok = { date: "2026-11-01", contact_type: "llamada", comment: "x" };
  assert.equal(validarInteraccion(ok), null);
  assert.equal(validarInteraccion({ ...ok, date: "01/11/2026" }), "Elige la fecha.");
  assert.equal(validarInteraccion({ ...ok, date: "" }), "Elige la fecha.");
  assert.equal(
    validarInteraccion({ ...ok, contact_type: "fax" }),
    "Elige el tipo de contacto."
  );
  assert.equal(validarInteraccion({ ...ok, comment: "  " }), "Escribe un comentario.");
});

test("validarNegocio y validarEtapa", () => {
  const ok = { name: "Luis", status: "Prospecto", trust: "Alta" };
  assert.equal(validarNegocio(ok), null);
  assert.equal(validarNegocio({ ...ok, name: "" }), "Escribe el nombre del negocio.");
  assert.equal(validarNegocio({ ...ok, status: "Ganado" }), "Elige la etapa.");
  assert.equal(validarNegocio({ ...ok, trust: "" }), "Elige el nivel de confianza.");
  assert.equal(validarEtapa({ status: "Cerrado" }), null);
  assert.equal(validarEtapa({ status: "Cliente" }), "Elige la etapa.");
});

test("nuevoIdTemporal es negativo y no choca", () => {
  const id = nuevoIdTemporal([{ id: 4 }], []);
  assert.ok(id < 0);
  const otro = nuevoIdTemporal([{ id }], [negocio(id - 1, "n")]);
  assert.ok(otro < 0 && otro !== id && otro !== id - 1);
});

test("agregarCambio fusiona movimientos de etapa", () => {
  // 1. dentro de la creación pendiente
  let lista = agregarCambio([], negocio(-5, "n1", "Prospecto"));
  lista = agregarCambio(lista, etapa(-5, "e1", "Contactado"));
  lista = agregarCambio(lista, etapa(-5, "e2", "Primera Cita"));
  assert.equal(lista.length, 1);
  assert.equal(lista[0].datos.status, "Primera Cita");
  // 2. reemplaza el cambio de etapa pendiente en su lugar
  lista = [interaccion(7, "i1")];
  lista = agregarCambio(
    lista,
    etapa(7, "e1", "Contactado", new Date("2026-11-01T10:00:00Z"))
  );
  lista = agregarCambio(lista, interaccion(8, "i2"));
  lista = agregarCambio(
    lista,
    etapa(7, "e2", "Negociación", new Date("2026-11-01T11:00:00Z"))
  );
  assert.equal(lista.length, 3);
  assert.equal(lista[1].tipo, "etapa");
  assert.equal(lista[1].id, "e1");
  assert.equal(lista[1].datos.status, "Negociación");
  assert.equal(lista[1].creadoEn, "2026-11-01T11:00:00.000Z");
  // 3. si no hay nada que fusionar, se agrega al final
  lista = agregarCambio(lista, etapa(9, "e3", "Cerrado"));
  assert.equal(lista.at(-1).id, "e3");
  // un cambio que ya se está enviando no se fusiona
  lista = marcarEstado([etapa(7, "e1", "Contactado")], "e1", "enviando");
  assert.equal(agregarCambio(lista, etapa(7, "e2", "Cerrado")).length, 2);
});

test("reemplazarIdTemporal cambia clienteId en los pendientes restantes", () => {
  const lista = [
    interaccion(-5, "i1"),
    interaccion(3, "i2"),
    etapa(-5, "e1", "Cerrado"),
  ];
  assert.deepEqual(
    reemplazarIdTemporal(lista, -5, 99).map((c) => c.clienteId),
    [99, 3, 99]
  );
});

test("las dependencias esperan al negocio y se bloquean si se rechaza", () => {
  let lista = [negocio(-5, "n"), interaccion(-5, "i"), interaccion(2, "otra")];
  assert.equal(siguienteParaEnviar(lista).id, "n");
  // mientras el negocio se envía, su dependiente no sale
  const enviando = marcarEstado(lista, "n", "enviando");
  assert.equal(siguienteParaEnviar(enviando).id, "otra");
  // negocio rechazado → dependiente bloqueado
  lista = resolverDependencias(
    marcarEstado(lista, "n", "rechazado", "Elige la etapa.")
  );
  const dep = lista.find((c) => c.id === "i");
  assert.equal(dep.estado, "bloqueado");
  assert.equal(dep.motivo, "Depende de un negocio que no se pudo guardar.");
  assert.equal(siguienteParaEnviar(lista).id, "otra");
  // al corregir el negocio, el dependiente vuelve a pendiente
  lista = resolverDependencias(marcarEstado(lista, "n", "pendiente", null));
  assert.equal(lista.find((c) => c.id === "i").estado, "pendiente");
  assert.equal(lista.find((c) => c.id === "i").motivo, null);
});

test("aplicarPendientes superpone interacciones, negocios y etapas", () => {
  const cartera = {
    clientes: [{ id: 1, name: "Ana", status: "Prospecto", offline_id: null }],
    actividades: [{ id: 10, client_id: 1, contact_type: "cita" }],
  };
  const pendientes = [
    interaccion(1, "i1"),
    negocio(-5, "n1", "Contactado"),
    interaccion(-5, "i2"),
    etapa(1, "e1", "Negociación"),
  ];
  const r = aplicarPendientes(cartera, pendientes);
  assert.equal(r.clientes.length, 2);
  const ana = r.clientes.find((c) => c.id === 1);
  assert.equal(ana.status, "Negociación");
  assert.equal(ana.pendiente, true);
  const nuevo = r.clientes.find((c) => c.id === -5);
  assert.equal(nuevo.name, "Luis Gómez");
  assert.equal(nuevo.pendiente, true);
  assert.equal(nuevo.estado, "pendiente");
  assert.equal(r.actividades.length, 3);
  const act = r.actividades.find((a) => a.id === "i1");
  assert.equal(act.client_id, 1);
  assert.equal(act.pendiente, true);
  assert.equal(act.contact_type, "cita");
  // no muta la cartera
  assert.equal(cartera.clientes[0].status, "Prospecto");
  assert.equal(cartera.actividades.length, 1);
});

test("aplicarPendientes no duplica lo que el servidor ya guardó", () => {
  const cartera = {
    clientes: [
      { id: 50, name: "Luis Gómez", status: "Prospecto", offline_id: "n1" },
    ],
    actividades: [{ id: 70, client_id: 50, offline_id: "i1" }],
  };
  const r = aplicarPendientes(cartera, [
    negocio(-5, "n1"),
    interaccion(50, "i1"),
  ]);
  assert.equal(r.clientes.length, 1);
  assert.equal(r.actividades.length, 1);
  assert.equal(r.clientes[0].pendiente, undefined);
});
