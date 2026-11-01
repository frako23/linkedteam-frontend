# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

SPA en React 18 de LinkedTeam: CRM + plataforma e-learning para equipos de venta de seguros (gerentes y asesores). Consume la API Flask del repo `../LinKedteam-backend`. Parte de la plantilla de 4Geeks Academy: patrón flux con Context y webpack configurado a mano (no es Create React App ni Vite).

## Comandos

```bash
npm install
npm run start     # webpack-dev-server en :3000, con HMR y historyApiFallback
npm run build     # build de producción → public/bundle.js (+ chunks) y public/sw.js, junto a los assets estáticos de public/
npm test          # node --test sobre lib/pendientes.js (la cola sin conexión); requiere Node ≥ 22
```

- El service worker (`public/sw.js`, generado por Workbox en `webpack.prod.js`) solo existe en el build de producción; `npm run start` no lo registra. `public/sw.js` y los chunks que genera el build no se versionan: no los incluyas en un commit. Para probar sin conexión: `npm run build` y servir `public/` con respaldo de SPA (`npx serve -s public -l 4173`).

- Node ≥ 20 (`engines`).
- No hay tests ni script de lint. La configuración de ESLint (`eslint.config.mjs` y `.eslintrc`) es inválida (`allowImportExportEverywhere` no es una regla, `indent: "on"` no es una severidad), así que `npx eslint` falla hasta corregirla.
- Las variables de entorno las incrusta `dotenv-webpack` en el bundle **en tiempo de build** (`process.env.X`); cambiarlas exige reiniciar el dev server o reconstruir. Con `safe: true`, toda variable listada en `.env.example` debe existir en `.env` o en el entorno, o el build falla.
- `BACKEND_URL` debe incluir el sufijo `/api` (ej. `http://localhost:3001/api`). `BASENAME` es el basename del router.
- Deploy en Vercel: `vercel.json` reescribe a `/` toda ruta sin punto (fallback de SPA).

## Arquitectura

- `src/js/index.js` → `layout.js`: un `BrowserRouter` con todas las rutas, envuelto por `injectContext` (`store/appContext.js`). `TopBar`, `Navbar` y `Footer` se renderizan en todas las páginas.
- Estado global (patrón flux de 4Geeks): `store/flux.js` exporta `getState({ getStore, getActions, setStore })`, que devuelve `{ store, actions }`; los componentes usan `const { store, actions } = useContext(Context)`. `setStore` hace un merge superficial. **Todas las llamadas HTTP están como actions en `flux.js`** (`fetch(\`${process.env.BACKEND_URL}/...\`)` con `Authorization: Bearer ${store.token}`); los componentes no hacen `fetch` directo. Un endpoint nuevo lleva su action ahí y su valor inicial en `store`.
- Sesión: `login` guarda el JWT en `localStorage.token`; `getUsuario` guarda `usuario.id`, `usuario.role`, `usuario.name`, etc. en localStorage, y `syncTokenFromSessionStore` (se llama una vez desde `appContext`) rehidrata el token. La navegación por rol (`components/layout/app-sidebar.jsx`, `pages/perfil.js`) lee `localStorage.getItem("usuario.role")`, no el store. No hay rutas protegidas: las páginas privadas no redirigen al login si no hay sesión.
- `/perfil` es el dashboard: `AdminPannel` para `admin` y `NewUserPannel` para el resto.
- El CRM comparte el tablero: `components/crm/kanban-board.jsx` lo usa `kanban.js` (embudo propio, `/salesFunnel`) y `kanbanAsociado.js` (el gerente viendo el embudo de un asesor, `/associatesalesfunnel`). `sortCRM.js` recibe `id` para filtrar sobre los negocios del asesor. Los filtros de `flux.js` siguen en pares (`filterByAmount` / `filterByAmountAsociados`, etc.).
- Las columnas del Kanban son strings que se guardan tal cual en `Cliente.status` del backend: `Prospecto`, `Contactado`, `Primera Cita`, `Negociación`, `Cerrado`. Renombrarlas deja huérfanos los datos existentes.
- Excel: `crm/importFromExcel.js` (`xlsx` + `sheet_to_json`; plantilla en `public/LinkedTeam-new-template.xlsx`) y `crm/exportToExcel.js`.
- UI: shadcn/ui (base Radix, estilo `radix-nova`) + Tailwind CSS v4 + lucide-react. Los componentes de shadcn viven en `src/js/components/ui/` (generados con `npx shadcn@latest add`), los tokens en `src/styles/globals.css` y el sistema visual completo en `DESIGN.md`. Toasts con Sonner (`import { toast } from "sonner"`), confirmaciones con `AlertDialog`, formularios en `Sheet` mediante `components/form-kit.jsx`. Alias `@` = `src/js`. Las etapas del embudo y `formatoMonto` salen de `lib/etapas.js`. Los nombres mezclan español e inglés (`getClientes`, `postTareas`, `getProducts`).
- **Trabajo sin conexión (PWA)**: solo el embudo propio (`/salesFunnel`) funciona sin red; el resto de rutas privadas va envuelto en `components/offline/requiere-conexion.jsx`. Registrar una interacción, crear un negocio y mover de etapa pasan **siempre** por la cola: `actions.encolarCambio(tipo, clienteId, datos)` guarda el cambio en IndexedDB (`lib/almacen-local.js`, claves `cache:<userId>` y `pendientes:<userId>`), lo muestra al instante y `actions.sincronizar()` lo envía en orden (al encolar, al abrir la app, en `online`, al volver a primer plano y cada 30 s) a los mismos endpoints de siempre con `offline_id` / `changed_at`. La lógica pura de la cola vive en `lib/pendientes.js` (con pruebas en `tests/`). `store.cartera` guarda lo que dijo el servidor y `store.clientes` / `store.clientActivity` son `cartera` + pendientes (`aplicarPendientes`); los negocios creados sin conexión tienen id negativo hasta enviarse. `store.conexion` combina `navigator.onLine` con el resultado de las peticiones. `logout` borra del teléfono la cartera y los pendientes del usuario. La app instalada abre en `/app` (`pages/inicioApp.js`); `lib/pwa.js` registra el service worker y gestiona la invitación a instalar. Detalle y decisiones en `specs/001-pwa-offline-sync/`.
- Contenido fijo: `src/js/data/tutorialVideosData.js` (tutoriales de YouTube hardcodeados). `/bugs` envía un formulario a Formspree. `/pricing` es la página de suscripción (formulario con método de pago).

## Problemas conocidos de la PWA

- **HTTPS en producción**: el service worker y la instalación solo funcionan en HTTPS (o `localhost`), y una página HTTPS no puede llamar a una API HTTP. Hasta que `BACKEND_URL` de producción sea HTTPS (hoy `http://159.198.66.169:5000/api`), la PWA no funciona en los teléfonos.
- **iPhone sin instalar**: Safari borra los datos de un sitio que no se abre en 7 días. Una app agregada a la pantalla de inicio no los pierde, y por eso se invita a instalar. Un asesor que no la instale y deje 7 días sin abrir podría perder cambios pendientes.
- **Chunks del build**: webpack genera chunks de librerías (por ejemplo `react-player`) con ids numéricos sin hash, y el service worker usa `skipWaiting`. Una pestaña abierta durante un despliegue puede pedir un chunk que ya cambió; se corrige al recargar.
- Las páginas privadas siguen sin redirigir al login sin sesión; solo la app instalada lo hace al arrancar desde `/app`.

## Desfases con el backend

Algunas actions de `flux.js` llaman rutas que en el backend están comentadas o no existen: `agencies`, `agency`, `own_agencies`, `company`, `user_company`, `comments`, `responses` y `approvepayments`. Antes de reutilizar una action, confirmar que su ruta existe en `../LinKedteam-backend/api/routes.py`.
