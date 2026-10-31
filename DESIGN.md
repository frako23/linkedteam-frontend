# LinkedTeam — Referencia de estilo

> LinkedTeam — tablero de ventas nítido. Una interfaz neutra y luminosa donde solo dos cosas tienen color: lo que puedes hacer (violeta) y en qué etapa está cada negocio.

**Tema:** claro y oscuro (clase `.dark` en `<html>`)

**Stack de UI:** shadcn/ui (base Radix, estilo `radix-nova`) + Tailwind CSS v4 + lucide-react + Sonner. Bootstrap, react-bootstrap, SweetAlert2 y react-hot-toast salen del proyecto.

Este documento fija el sistema visual del frontend de LinkedTeam (CRM + e-learning para equipos de venta de seguros) sobre shadcn/ui. Los tokens usan los nombres de variables de shadcn (`--background`, `--primary`, `--sidebar`…), así que cualquier componente que se añada con el CLI hereda la marca sin tocarlo. Las clases de Tailwind que aparecen aquí son la forma recomendada de construir cada pieza, no componentes que ya existan.

El lienzo es blanco (zinc casi negro en oscuro), con bordes finos, radios generosos y sombras mínimas. El violeta `#695cfe` es el único color de acción: botón primario, ítem activo, foco, enlaces. El resto del color pertenece a las cinco etapas del embudo (Prospecto, Contactado, Primera Cita, Negociación, Cerrado), que aparecen siempre en el mismo orden como punto de color, insignia suave o serie de gráfico. Geist lleva toda la tipografía con tracking ajustado en los titulares; las cifras van en dígitos tabulares. La app privada vive en un shell de shadcn — sidebar colapsable a íconos y contenido en un panel inset — y la landing usa el mismo sistema con un resplandor violeta y una cuadrícula tenue detrás del héroe.

## Stack de UI

| Necesidad | Librería | Notas |
|-----------|----------|-------|
| Componentes | shadcn/ui, base Radix (`shadcn init -b radix`), estilo `radix-nova` | Desde julio de 2026 shadcn usa Base UI por defecto; se elige Radix porque en esa base el componente de toasts es Sonner (en Base UI es un Toast propio) |
| Estilos | Tailwind CSS v4 vía PostCSS (`@tailwindcss/postcss` + `postcss-loader` en webpack) | Sin `tailwind.config`; los tokens viven en `src/styles/globals.css` |
| Toasts | Sonner (`npx shadcn@latest add sonner`) | Reemplaza a react-hot-toast |
| Confirmaciones y formularios modales | Alert Dialog, Dialog, Sheet | Reemplazan a SweetAlert2 y al `Modal` de react-bootstrap |
| Íconos | lucide-react | Reemplaza a Boxicons y Font Awesome (CDN y kits) |
| Gráficos | Chart de shadcn (Recharts 3) | Reemplaza a Recharts 2 directo y a react-gauge-chart |
| Tablas | Table + Data Table (TanStack Table) | Listado de clientes, pagos, usuarios |
| Kanban | @hello-pangea/dnd (se mantiene) | Actualizar a 18.x para React 19; verificar sus `peerDependencies` al instalar |

**Requisitos:**
- **React 19:** los componentes actuales de shadcn reciben `ref` como prop normal (ya no usan `forwardRef`), y eso solo funciona en React 19. El proyecto está en 18.2.
- **Recharts 3:** el componente Chart de shadcn depende de `recharts@3`, así que `charts.js` y `DashboardSalesGraphic.js` se adaptan al migrar.

## Tokens — Colores

### Tema (variables de shadcn)

| Variable | Claro | Oscuro | Uso |
|----------|-------|--------|-----|
| `--background` | `#ffffff` | `#09090b` | Lienzo de la app y de la landing |
| `--foreground` | `#18181b` | `#fafafa` | Texto principal |
| `--card` / `--card-foreground` | `#ffffff` / `#18181b` | `#111114` / `#fafafa` | Tarjetas, carriles internos, tablas |
| `--popover` / `--popover-foreground` | `#ffffff` / `#18181b` | `#18181b` / `#fafafa` | Menús, popovers, toasts de Sonner, paleta de comandos |
| `--primary` / `--primary-foreground` | `#695cfe` / `#ffffff` | `#695cfe` / `#ffffff` | Única acción principal por vista; blanco encima 4.6:1 |
| `--secondary` / `--secondary-foreground` | `#f4f4f5` / `#18181b` | `#27272a` / `#fafafa` | Botón secundario, insignias neutras |
| `--muted` / `--muted-foreground` | `#f4f4f5` / `#6b6b76` | `#27272a` / `#a1a1aa` | Fondos atenuados (carriles del Kanban), texto secundario. `#6b6b76` da 5.3:1 sobre blanco y 4.8:1 sobre muted |
| `--accent` / `--accent-foreground` | `#f3f2ff` / `#5547e8` | `#1e1b3a` / `#c7c2ff` | Hover de menús, botones ghost y filas; tinte violeta de marca |
| `--destructive` | `#dc2626` | `#ef4444` | Borrar y errores. Blanco sobre `#dc2626`: 4.8:1 |
| `--border` | `#e4e4e7` | `#27272a` | Bordes de 1px de tarjetas, tablas, separadores |
| `--input` | `#e4e4e7` | `#34343b` | Borde de inputs, selects, botón outline |
| `--ring` | `#695cfe` | `#8b82ff` | Anillo de foco (`ring-ring/50`, 3px) |
| `--chart-1` … `--chart-5` | etapas | etapas | Los cinco colores de etapa, en orden (ver abajo) |
| `--sidebar` | `#fafafa` | `#0c0c0f` | Fondo del sidebar y del marco del shell inset |
| `--sidebar-foreground` | `#3f3f46` | `#d4d4d8` | Texto e íconos del sidebar |
| `--sidebar-primary` / `-foreground` | `#695cfe` / `#ffffff` | `#695cfe` / `#ffffff` | Logo y marca de equipo en el encabezado del sidebar |
| `--sidebar-accent` / `-foreground` | `#efeefe` / `#5547e8` | `#1e1b3a` / `#d4d0ff` | Ítem activo y hover del sidebar |
| `--sidebar-border` | `#e4e4e7` | `#27272a` | Bordes internos del sidebar |
| `--sidebar-ring` | `#695cfe` | `#8b82ff` | Foco dentro del sidebar |
| `--radius` | `0.625rem` | — | Radio base (10px); shadcn deriva de él los demás |

En el modo oscuro, el violeta queda por debajo de 4.5:1 como texto sobre `#09090b`, así que los enlaces y el texto violeta usan `--accent-foreground` y el violeta queda para rellenos y foco.

### Etapas del embudo

`status` es el valor que se guarda en `Cliente.status` en el backend: renombrarlo deja huérfanos los datos existentes. `key` es el nombre seguro para CSS (el `ChartConfig` de shadcn genera variables `--color-<key>`, y "Primera Cita" no es un nombre válido).

| `status` | `key` | Etiqueta | Color (`--etapa-*`, `--chart-*`) | Texto en claro | Texto en oscuro |
|----------|-------|----------|----------------------------------|----------------|-----------------|
| `Prospecto` | `prospecto` | Prospectos | `#3b82f6` · `--chart-1` | `#1d4ed8` | `#93c5fd` |
| `Contactado` | `contactado` | Contactados | `#f59e0b` · `--chart-2` | `#b45309` | `#fcd34d` |
| `Primera Cita` | `primeraCita` | Primera cita | `#f43f5e` · `--chart-3` | `#be123c` | `#fda4af` |
| `Negociación` | `negociacion` | Negociación | `#06b6d4` · `--chart-4` | `#0e7490` | `#67e8f9` |
| `Cerrado` | `cerrado` | Cierres | `#10b981` · `--chart-5` | `#047857` | `#6ee7b7` |

Son las mismas familias de color que usa hoy la app (azul, ámbar, rojo, cian, verde), afinadas para que convivan con la paleta neutra: el cian neón `#4ff0f5` y los rellenos saturados se reemplazan por tonos 500 con texto 700.

- El orden es fijo en toda la app: de Prospecto a Cerrado, de izquierda a derecha y de arriba abajo.
- Una etapa se muestra de tres formas: un punto de 8px (`size-2 rounded-full bg-etapa-prospecto`), una insignia suave (fondo del color al 10% y texto en su tono de texto) o una serie de gráfico. Nunca como relleno sólido de botones, tarjetas o columnas.
- El color nunca va solo: siempre lo acompaña el nombre de la etapa.
- Primera cita (rosa) y `--destructive` (rojo) se distinguen por la forma: la etapa es siempre punto o insignia con su nombre; lo destructivo es un botón, un ítem de menú o un mensaje de error.

### Marca (solo landing)

| Nombre | Valor | Token | Uso |
|--------|-------|-------|-----|
| Violeta Eléctrico | `#9340ff` | `--brand-electrico` | Resplandor detrás del héroe y degradado del texto destacado del titular. Nunca en texto pequeño ni en controles |

## Tokens — Tipografía

### Geist — Interfaz y titulares · `--font-sans`
- **Sustituto:** ui-sans-serif, system-ui, "Segoe UI", Roboto
- **Pesos:** 400, 500, 600
- **Rol:** Toda la tipografía: navegación, tablas, formularios, tarjetas y titulares. La personalidad sale del peso 600 con tracking negativo en los tamaños grandes, no de una segunda familia. Las cifras (montos, conteos, porcentajes) llevan siempre `tabular-nums`.

### Geist Mono — Datos técnicos · `--font-mono`
- **Sustituto:** ui-monospace, SFMono-Regular, Consolas, monospace
- **Pesos:** 400, 500
- **Rol:** Solo atajos de teclado (Kbd), identificadores y códigos (por ejemplo, número de póliza). No para etiquetas ni montos.

### Escala tipográfica

| Rol | Tamaño / interlineado | Peso | Tracking | Clases |
|-----|-----------------------|------|----------|--------|
| caption | 12px / 16px | 400–500 | 0 | `text-xs` |
| ui | 14px / 20px | 400–500 | 0 | `text-sm` — tamaño base de la app: tablas, formularios, menús, botones |
| body | 16px / 24px | 400 | 0 | `text-base` — texto largo y cuerpo de la landing |
| card-title | 16px / 1 | 600 | 0 | `text-base font-semibold leading-none` |
| section-title | 18px / 28px | 600 | -0.01em | `text-lg font-semibold tracking-tight` |
| page-title | 24px / 32px | 600 | -0.025em | `text-2xl font-semibold tracking-tight` |
| metric | 30px / 36px | 600 | -0.025em | `text-3xl font-semibold tracking-tight tabular-nums` |
| section-heading | 36px → 48px | 600 | -0.025em | `text-4xl md:text-5xl font-semibold tracking-tight text-balance` |
| hero-display | 48px → 72px / 1.05 | 600 | -0.05em | `text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] text-balance` |

Todo en tipo oración. No hay etiquetas en mayúsculas; los rótulos de métricas y etapas usan `text-sm text-muted-foreground`.

## Tokens — Espaciado y formas

**Unidad base:** 4px (la escala de Tailwind: `p-1` = 4px, `p-4` = 16px).

**Densidad:** compacta en el Kanban, las tablas y los menús (`radix-nova` usa botones de 32px); aireada en el tablero y la landing.

### Espaciado de referencia

| Uso | Valor | Clase |
|-----|-------|-------|
| Entre ícono y texto | 8px | `gap-2` |
| Dentro de una tarjeta de negocio | 12px | `p-3`, `gap-3` |
| Gap de cuadrículas de tarjetas | 16px | `gap-4` |
| Padding del contenido de página | 16px → 24px | `p-4 lg:p-6` |
| Entre bloques de una página | 24px | `gap-6` |
| Entre secciones de la landing | 96px → 128px | `py-24 md:py-32` |

### Radios

| Elemento | Radio | Clase |
|----------|-------|-------|
| Botones, inputs, selects, ítems de menú y del sidebar | `--radius` (10px) | `rounded-lg` (lo aplica el componente) |
| Tarjetas, carriles del Kanban, tablas, popovers | `--radius-xl` | `rounded-xl` |
| Dialog, Sheet, paleta de comandos, captura del producto en la landing | `--radius-xl` o mayor | `rounded-xl` / `rounded-2xl` |
| Insignias | como las genera shadcn | `Badge` |
| Puntos de etapa, avatares, anuncio del héroe, contadores sobre íconos | círculo / píldora | `rounded-full` |

### Layout

- **Sidebar:** anchos por defecto del componente Sidebar de shadcn (16rem abierto, 3rem en modo ícono); en móvil se convierte en Sheet.
- **Encabezado de página:** 48–56px dentro del panel inset.
- **Contenido:** fluido en el tablero, el embudo y las tablas; `max-w-3xl` en formularios largos y páginas de lectura.
- **Landing:** contenedor `max-w-6xl mx-auto px-6`.
- **Breakpoints:** los de Tailwind — `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536px.

## Componentes

### Shell de la app
**Rol:** estructura de toda página privada; reemplaza a `Navbar` y `TopBar`.

`SidebarProvider` + `Sidebar` con `variant="inset"` y `collapsible="icon"` + `SidebarInset`. El fondo exterior es `--sidebar` y el contenido vive en un panel `bg-background` con `rounded-xl` y sombra mínima, separado del borde. Encabezado del sidebar: logo en un cuadrado `size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground`, "LinkedTeam" en `text-sm font-semibold` y el rol del usuario (Gerente / Asesor) en `text-xs text-muted-foreground`. Grupos con `SidebarGroupLabel`:
- **Ventas:** Tablero, Embudo, Clientes, Tareas.
- **Formación:** Cursos disponibles, Cursos para tu equipo (solo gerentes), Videos tutoriales.
- **Pie:** Donaciones, Reportar errores y el menú del usuario (avatar, nombre, correo; abre un `DropdownMenu` con Perfil, Tema y Cerrar sesión).

Cada ítem es un `SidebarMenuButton` con ícono lucide de 16px, `isActive` según la ruta y `tooltip` con su nombre para el modo ícono. El conteo de cursos disponibles es un `SidebarMenuBadge`.

### Encabezado de página
**Rol:** barra superior dentro del panel inset.

Fila de 48–56px con borde inferior `border-b`: `SidebarTrigger`, un `Separator` vertical y un `Breadcrumb` ("Ventas › Embudo de ventas", alimentado por `store.header`). A la derecha: un botón de búsqueda con aspecto de input ("Buscar…" + `Kbd` "Ctrl K") que abre la paleta de comandos, y el selector de tema. Debajo, cada página abre con su título `text-2xl font-semibold tracking-tight`, una descripción `text-muted-foreground` opcional y sus acciones alineadas a la derecha.

### Paleta de comandos
**Rol:** navegación y búsqueda rápida (Ctrl K / ⌘K).

`CommandDialog` con grupos "Ir a" (las páginas del sidebar), "Clientes" (búsqueda por nombre sobre `store.clientes`; abre la ficha) y "Acciones" (Nuevo negocio, Importar desde Excel, Registrar meta). Cada ítem lleva ícono lucide de 16px y, si tiene atajo, un `CommandShortcut`.

### Botones
**Rol:** acciones, con las variantes de `Button` de shadcn.

- `default` (violeta): la acción principal, una por vista o por diálogo ("Nuevo negocio", "Guardar", "Registrar meta").
- `outline`: acciones de apoyo — exportar, importar, filtros, "Cancelar".
- `secondary`: alternativas suaves dentro de tarjetas.
- `ghost`: acciones en filas, tarjetas y barras de herramientas.
- `destructive`: solo para confirmar un borrado dentro de un Alert Dialog.
- `link`: enlaces en línea.

Tamaños: `default` (32px) en la app, `sm` en barras de herramientas densas, `lg` o `h-10 px-5` en la landing, `icon` / `icon-sm` para botones de ícono, que siempre llevan `aria-label`. Botón ocupado: `Spinner` + texto ("Guardando…") y `disabled`.

### Insignia de etapa
**Rol:** mostrar la etapa de un negocio en tablas, fichas y listas.

`Badge` con `variant="outline"`, sin borde y con tinte: `border-transparent bg-etapa-prospecto/10 text-etapa-prospecto-texto`, más un punto `size-1.5 rounded-full bg-etapa-prospecto` delante del nombre. Las clases salen del mapa `ETAPAS` (ver **Inicio rápido**); nunca se construyen con template strings, porque Tailwind no las detectaría.

### Tarjetas de etapa
**Rol:** los cinco totales del embudo en `/perfil` (hoy `Box`).

Cuadrícula de 5 tarjetas `Card` (`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`). Cada una: descripción con punto de etapa y nombre en `text-sm text-muted-foreground`, el conteo como `text-3xl font-semibold tabular-nums tracking-tight` y, al pie, el monto acumulado en `text-sm text-muted-foreground tabular-nums`. Debajo de la cuadrícula, una barra horizontal apilada de 8px y `rounded-full` con la proporción de negocios por etapa en sus cinco colores.

### Tarjeta de métrica
**Rol:** meta de ventas, total vendido, por lograr, tasa de conversión, venta promedio.

`Card` con `CardDescription` (nombre de la métrica), `CardTitle` como cifra `text-3xl font-semibold tabular-nums`, y en la esquina un `Badge variant="outline"` con la variación si existe. La meta lleva un `Progress` de 8px en violeta y la línea "62 % de tu meta" en `text-sm text-muted-foreground`. Sin meta, la tarjeta muestra el texto "Aún no tienes una meta" y un botón `outline` "Registrar meta" que abre un Dialog (reemplaza al prompt de SweetAlert2).

### Gráficos
**Rol:** ventas en el tiempo, distribución del embudo, avance de la meta.

`ChartContainer` + `ChartTooltip` / `ChartTooltipContent` de shadcn dentro de una `Card` con título y descripción. Por etapa: `chartConfigEtapas` (colores `--chart-1…5`). Una sola serie: `var(--primary)`. Áreas con degradado vertical del color al 30% → 0%, líneas de 2px y barras con radio superior de 4px. Cuadrícula solo horizontal (`vertical={false}`), sin líneas de eje, ticks en `text-xs text-muted-foreground`. El medidor de `fuelChart.js` pasa a un `RadialBarChart` con pista `--muted` y arco violeta, con el porcentaje centrado en `text-3xl font-semibold tabular-nums`.

### Carril del Kanban
**Rol:** la columna de una etapa en el embudo (`kanban.js` y `kanbanAsociado.js`: un cambio va en ambos).

Columna `w-72 shrink-0 rounded-xl bg-muted/50 p-2` con un encabezado `px-2 py-1.5`: punto de etapa, nombre en `text-sm font-medium`, conteo en `Badge variant="secondary"` y el monto a la derecha en `text-sm text-muted-foreground tabular-nums`. Las tarjetas se apilan con `gap-2` en un `ScrollArea` con altura propia. Con una tarjeta encima (`snapshot.isDraggingOver`), el carril pasa a `bg-accent` con `ring-1 ring-primary/30`. El tablero completo es una fila con scroll horizontal (`flex gap-4 overflow-x-auto pb-4`); los carriles nunca se apilan.

### Tarjeta de negocio
**Rol:** un cliente dentro del embudo (hoy `TarjetaCliente`).

`rounded-lg border bg-card p-3 shadow-xs`, con `cursor-grab` y `hover:border-primary/40`. Primera fila: nombre en `text-sm font-medium` y, a la derecha, un botón `ghost` `icon-sm` con `MoreHorizontal` que abre un `DropdownMenu` (Editar, Registrar actividad, separador, Eliminar en `variant="destructive"`). Debajo, el monto en `text-base font-semibold tabular-nums` y una línea `text-xs text-muted-foreground` con "34 años · Confianza alta". Al pie, la actividad: íconos `Phone`, `MessageSquare` y `CalendarDays` de 14px con su conteo al lado en `text-xs tabular-nums`; los conteos en cero se muestran atenuados (`opacity-50`). Al arrastrar: `shadow-lg ring-2 ring-primary/30 rotate-1`, sin bajar la opacidad.

### Tabla de clientes
**Rol:** `/clients`, pagos y usuarios.

Data Table de shadcn (TanStack Table) dentro de un contenedor `rounded-xl border`. Barra de herramientas encima: búsqueda con `InputGroup` (ícono `Search`), filtro de etapa como `DropdownMenu` con casillas, filtro de monto con un `Slider` de dos manijas en un `Popover`, visibilidad de columnas, botones `outline` Exportar / Importar y "Nuevo cliente" en `default`. Columnas: nombre con correo debajo en `text-muted-foreground`, insignia de etapa, monto alineado a la derecha y `tabular-nums`, confianza, último contacto y menú de acciones. Encabezados en `text-muted-foreground font-medium`; filas con hover `bg-muted/50` y clic para abrir la ficha. Paginación al pie con "Filas por página".

### Ficha de cliente
**Rol:** detalle, edición y actividad de un cliente (hoy `ClientsDetail`, `modifyClient`, `RegisterActivity`).

`Sheet` desde la derecha, `sm:max-w-lg`. Encabezado: nombre `text-lg font-semibold`, insignia de etapa y monto. `Tabs`: Resumen (datos en lista de dos columnas `text-sm`), Actividad (línea de tiempo con ícono por tipo, fecha relativa y nota) y Productos. Pie fijo con "Registrar actividad" (`default`) y "Editar" (`outline`).

### Formularios
**Rol:** crear y editar clientes, actividades, cursos, metas; acceso; reporte de errores.

Componentes `Field`, `FieldLabel`, `FieldDescription` y `FieldError` con `Input`, `Textarea`, `Select` y Date Picker (`Calendar` en `Popover`). Etiqueta encima, error debajo en `text-destructive`, campos agrupados con `gap-4`; dos columnas en `sm:` cuando los campos son cortos. Contraseña: `InputGroup` con un botón de ojo (`Eye` / `EyeOff`) dentro del campo. Los formularios de creación y edición van en Sheet; las preguntas de un solo dato (la meta de ventas), en Dialog.

### Diálogos
**Rol:** confirmaciones y tareas cortas.

`Dialog` para formularios cortos: título `text-lg font-semibold`, descripción `text-muted-foreground`, acciones abajo a la derecha (`outline` "Cancelar", luego la principal). `Alert Dialog` para todo lo irreversible: título como pregunta ("¿Eliminar a Ana Pérez?"), descripción "Esta acción no se puede deshacer." y la confirmación en variante `destructive` con el verbo ("Eliminar"), nunca "Sí".

### Toasts (Sonner)
**Rol:** confirmar lo que acaba de pasar.

`<Toaster position="bottom-right" />` una sola vez en `layout.js`. El componente generado por shadcn ya toma `--popover`, `--border` y `--radius`, y sigue el tema. Uso:
- `toast.success("Cliente guardado")` tras crear o editar.
- `toast.error("No se pudo guardar el cliente", { description: "Revisa tu conexión e inténtalo de nuevo." })` ante fallos.
- `toast.promise(...)` para importar Excel y otras esperas largas.
- `action` solo si el backend permite deshacer.

Una frase corta en tipo oración, sin emojis y sin "¡Éxito!".

### Estados vacíos y de carga
**Rol:** sin clientes, sin cursos, sin tareas; datos en camino.

Componente `Empty`: ícono lucide en `EmptyMedia variant="icon"`, título, una línea de descripción y como máximo una acción ("Crea tu primer negocio"). Reemplaza a las imágenes `nohayvideos.jpg` y similares. Carga: `Skeleton` con la forma final (tarjetas, filas de tabla, carriles); `Spinner` solo dentro de botones y de diálogos ocupados (reemplaza a `ModalLoader`).

### Selector de tema
**Rol:** claro, oscuro o sistema.

`DropdownMenu` con `Sun`, `Moon` y `Monitor`, en el menú del usuario y en el encabezado de la landing. El valor se guarda en `localStorage` (clave `theme`) y aplica la clase `.dark` en `<html>`. El valor inicial es "sistema".

### Acceso
**Rol:** `/login` y `/signup`.

Dos columnas en `lg:`. A la izquierda, el formulario centrado `max-w-sm`: logo, título `text-2xl font-semibold tracking-tight`, descripción, campos y botón `default` a ancho completo, con el enlace para cambiar entre acceso y registro debajo. A la derecha, un panel `bg-muted` con la captura del tablero y una cita breve. En móvil, solo el formulario.

### Encabezado de la landing
**Rol:** navegación de `/`.

`sticky top-0 z-50 border-b bg-background/80 backdrop-blur`, 64px. Logo y "LinkedTeam" en `font-semibold` a la izquierda; enlaces en `text-sm text-muted-foreground hover:text-foreground` al centro; selector de tema, "Ingresa" (`ghost`) y "Regístrate" (`default`) a la derecha. En móvil, los enlaces van en un `Sheet` desde un botón `Menu`.

### Héroe de la landing
**Rol:** apertura de `/`; reemplaza al carrusel de Swiper.

Sección centrada con `hero-glow` y `bg-cuadricula` detrás (ver **Inicio rápido**). Arriba, una píldora `Badge variant="outline" className="rounded-full"` con "CRM + formación para equipos de seguros". Titular `hero-display` con la palabra clave en un degradado de texto de `--primary` a `--brand-electrico` (`bg-clip-text text-transparent`); subtítulo `text-lg text-muted-foreground max-w-2xl text-balance`. Botones `lg`: "Prueba la app" (`default`) e "Ingresa" (`outline`). Debajo, la captura del tablero en un marco `rounded-2xl border bg-card p-2 shadow-2xl`, que asoma sobre la sección siguiente.

### Capacidades (bento)
**Rol:** "¿Qué podrás hacer en LinkedTeam?" — los seis módulos.

Cuadrícula `grid gap-4 md:grid-cols-3`, con dos celdas que ocupan dos columnas (CRM y tablero) para romper la repetición. Cada celda es una `Card` con un cuadrado de ícono `size-10 rounded-lg bg-primary/10 text-primary`, título `text-base font-semibold`, descripción `text-sm text-muted-foreground` y el enlace "Ver video" (`link` con `ArrowRight`), que abre el video en un Dialog. Las celdas anchas incluyen un recorte de la captura del módulo.

### Cierre y pie de la landing
**Rol:** última llamada a la acción y contacto.

Banda final con la clase `dark` (usa los tokens oscuros sin cambiar el tema de la página), `rounded-2xl` dentro del contenedor, con `hero-glow`: titular `section-heading`, una línea y el botón "Crea tu cuenta". Pie en `border-t` con logo, correo de contacto (`linkedteam2023@gmail.com`), enlaces y crédito en `text-sm text-muted-foreground`.

### Tarjeta de curso o video
**Rol:** catálogo de cursos y videos tutoriales.

`Card` con `overflow-hidden` y sin padding superior: miniatura `AspectRatio` 16:9 con un botón de play `size-12 rounded-full bg-background/80 backdrop-blur` centrado, que crece levemente en hover (`group-hover:scale-105`). Cuerpo: título `font-medium line-clamp-2` y metadatos `text-sm text-muted-foreground`. Cuadrícula `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`. El reproductor (`react-player`) vive en un Dialog grande o en su página, con `rounded-xl overflow-hidden`.

## Movimiento

- Transiciones de color, fondo y borde: `transition-colors` (150ms).
- Entradas y salidas de Dialog, Sheet, Popover y DropdownMenu: las animaciones de `tw-animate-css` que traen los componentes; no se añaden otras.
- Hover de tarjetas: solo cambia el borde o la sombra (`hover:shadow-sm`), sin desplazar ni escalar. La excepción es el ícono de play.
- Al arrastrar en el Kanban, la librería mueve la tarjeta; el estilo solo agrega sombra, anillo y `rotate-1`.
- Con `prefers-reduced-motion`, sin animaciones de entrada ni rotación (`motion-reduce:`).

## Qué sí / Qué no

### Sí
- Construye con componentes de shadcn y las variables de tema; añade los que falten con `npx shadcn@latest add`.
- Usa `--primary` para la acción principal de cada vista y nada más.
- Muestra las etapas como punto, insignia suave o serie, siempre en su orden y con su nombre.
- Toma clases y colores de etapa del mapa `ETAPAS`.
- Separa con `border` y superficies (`bg-muted/50`, `bg-card`) antes que con sombras.
- Escribe cifras con `tabular-nums`.
- Comprueba cada pantalla en claro y en oscuro.
- Confirma lo irreversible con Alert Dialog y comunica el resultado con Sonner.

### No
- No uses clases de Bootstrap (`d-flex`, `btn btn-primary`, `p-4` de Bootstrap, `data-bs-*`) ni componentes de react-bootstrap.
- No uses colores hex escritos en el JSX ni `style={{ background: ... }}`; usa tokens.
- No rellenes columnas, botones ni tarjetas con colores de etapa.
- No uses `--brand-electrico` fuera del resplandor y el degradado del héroe.
- No pongas sombras grandes salvo en la captura del producto, los diálogos y la tarjeta arrastrada.
- No escribas etiquetas en mayúsculas ni titulares con `text-shadow`.
- No uses SweetAlert2, `window.confirm` ni react-hot-toast.
- No mezcles familias de íconos: solo lucide.
- No construyas clases con template strings (`` `bg-etapa-${x}` ``).

## Superficies

| Nivel | Claro | Oscuro | Propósito |
|-------|-------|--------|-----------|
| Marco | `--sidebar` `#fafafa` | `#0c0c0f` | Sidebar y marco del shell inset |
| 0 | `--background` `#ffffff` | `#09090b` | Panel de contenido, landing |
| 1 | `--muted` al 50% | `#27272a` al 50% | Carriles del Kanban, encabezados de tabla, zonas de herramientas |
| 2 | `--card` `#ffffff` + `border` | `#111114` + `border` | Tarjetas, tablas, tarjetas de negocio |
| 3 | `--popover` + sombra | `#18181b` + sombra | Menús, popovers, toasts, Dialog, Sheet |
| Estado | `--accent` `#f3f2ff` | `#1e1b3a` | Hover, ítem activo, carril receptor |

## Elevación

La profundidad sale del borde de 1px y del cambio de superficie. Las sombras, de Tailwind:
- `shadow-xs` en tarjetas de negocio e inputs.
- `shadow-sm` en hover.
- `shadow-md` en menús y popovers.
- `shadow-lg` en Dialog, Sheet, toasts y la tarjeta arrastrada.
- `shadow-2xl` solo en la captura del producto de la landing.

En oscuro las sombras casi no se ven; ahí la separación la hacen `--border` y el contraste de superficies.

## Íconos e imágenes

**Íconos:** solo lucide-react, con el trazo por defecto.
- **Tamaños:** 16px (`size-4`) en botones, menús y sidebar; 14px en metadatos de tarjeta; 20px en cuadrados de ícono; 24–32px en estados vacíos.
- **Color:** `currentColor`. Heredan el texto del contenedor; nunca se colorean por etapa (para eso está el punto).
- **Equivalencias:** Tablero `LayoutDashboard`, Embudo `Filter`, Clientes `Users`, Tareas `ListTodo`, Cursos `GraduationCap`, Cursos para tu equipo `Presentation`, Videos `CirclePlay`, Donaciones `HandCoins`, Reportar errores `Bug`, Salir `LogOut`.

**Imágenes:** la app privada no lleva fotos; solo datos, íconos y avatares (iniciales en `Avatar` cuando no hay foto). La landing usa capturas reales del producto (`src/img/Landing/`) en marcos `rounded-xl border`, sin maquetas de dispositivo. Las fotos de stock del carrusel actual (`src/img/1–4.webp`) salen; si se usa una foto, va solo en el panel derecho de la pantalla de acceso. El logo es la marca de nodos (ver **Logo**): `text-foreground` sobre claro y blanco sobre oscuro (SVG con `fill="currentColor"`).

## Logo

Tres nodos unidos por un trazo forman una L: la inicial de LinkedTeam y un equipo enlazado (gerente, asesor y cliente). Los nodos son los mismos puntos con que la interfaz marca las etapas. La marca es de una sola tinta: hereda `currentColor` y nunca lleva colores de etapa.

| Pieza | Dónde | Uso |
|-------|-------|-----|
| Marca | `<Logo />` en `src/js/components/logo.jsx`; `public/brand/linkedteam-mark.svg` | Dentro de la app, siempre el componente; el tamaño va en `className` (`size-5`, `size-6`) |
| Ícono de app | `public/brand/linkedteam-icon.svg` y `linkedteam-icon-512.png` | Cuadro violeta `#695cfe` con la marca en blanco: avatar en redes y accesos directos. El PNG va sin esquinas redondeadas porque cada plataforma aplica su máscara |
| Logotipo | `public/brand/linkedteam-logo.svg` (fondo claro) y `linkedteam-logo-dark.svg` (fondo oscuro) | Marca + "LinkedTeam" en Geist SemiBold vectorizado, para documentos, correos y presentaciones fuera de la app |
| Favicon | `favicon.ico` (16, 32 y 48px) y `public/apple-touch-icon.png` (180px) | `HtmlWebpackPlugin` inyecta el `.ico`. Las versiones de 16 y 32px están ajustadas a píxel |

- **Sidebar:** `Logo` `size-5` dentro del cuadro `size-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground`. Dentro de la app, es el único lugar donde la marca va sobre violeta.
- **Landing y acceso:** `Logo` `size-6` en el color del texto y "LinkedTeam" en `font-semibold`, separados con `gap-2`.
- **Construcción:** retícula de 24, nodos de radio 3 y trazo de 2.5. La L se desplaza 0.75 hacia arriba y a la derecha para verse centrada. En el logotipo, la línea base del texto cae en el eje del pie de la L.
- **Tamaño mínimo:** 16px la marca y 20px de alto el logotipo. Por debajo, usa el ícono de app.
- **Área de respeto:** el diámetro de un nodo alrededor del logotipo y del ícono.
- **No:** recolorear la marca ni sus nodos, separar los nodos del trazo, rotar o reflejar la L, ni añadirle sombras, contornos o degradados.

## Layout

La app privada es el shell inset de shadcn: sidebar a la izquierda, encabezado de página con breadcrumb y búsqueda, y contenido con `p-4 lg:p-6` y `gap-6` entre bloques.
- **Tablero (`/perfil`):** título y acción "Registrar meta"; las cinco tarjetas de etapa con su barra de distribución; la cuadrícula de métricas (`sm:grid-cols-2 xl:grid-cols-4`); dos gráficos lado a lado en `lg:` (ventas en el tiempo y embudo); el resumen de tareas en una tarjeta con lista.
- **Embudo (`/salesFunnel`, `/associatesalesfunnel`):** barra de herramientas (búsqueda, filtros, Exportar / Importar, "Nuevo negocio") y el tablero de cinco carriles con scroll horizontal. El gerente cambia entre su embudo y el de un asesor con un `Select` en la barra, no con un botón suelto.
- **Clientes, tareas y cursos:** barra de herramientas arriba y Data Table o cuadrícula de tarjetas debajo.

La landing (`/`) es una sola columna `max-w-6xl`: encabezado sticky con blur, héroe con captura, bento de capacidades, banda oscura de cierre y pie. Las secciones se separan con espacio (`py-24 md:py-32`), no con fondos alternos.

## Tono y microcopy

- Español con tuteo y verbos en imperativo: "Registra tu meta", "Prueba la app", "Nuevo negocio".
- Tipo oración en todo: botones, títulos, menús, etiquetas.
- Botones con verbo + objeto cuando el contexto no basta ("Guardar cliente", "Eliminar").
- Los nombres de etapa son siempre los de la tabla de etapas.
- Montos con un único helper basado en `Intl.NumberFormat`: símbolo `$` delante, separador de miles, sin decimales en tarjetas y tablas.
- Errores que digan qué pasó y qué hacer: "No se pudo importar el archivo. Revisa que use la plantilla de LinkedTeam."

## Migración

### Reemplazos

| Hoy | Pasa a |
|-----|--------|
| Bootstrap 5.1.3 (CSS y JS por CDN en `template.html`), `bootstrap` y `react-bootstrap` en `package.json`, atributos `data-bs-*` | Tailwind v4 + componentes de shadcn |
| `Navbar` + `TopBar` (`navbar.css`) | Shell de la app (Sidebar inset + encabezado de página) |
| `react-hot-toast` | Sonner |
| SweetAlert2 (confirmaciones y el prompt de la meta) | Alert Dialog y Dialog |
| `Modal` de react-bootstrap | Dialog (formularios cortos) o Sheet (crear y editar) |
| Boxicons (CDN), Font Awesome (CSS v5, dos kits y `@fortawesome/*` sin usar) | lucide-react |
| Swiper en la landing | Héroe estático con captura |
| `react-gauge-chart` | Chart radial de shadcn |
| Recharts 2 directo | Chart de shadcn (Recharts 3) |
| `ModalLoader` | Spinner / Skeleton |
| Imágenes de estado vacío (`nohayvideos.jpg`) | Componente Empty |
| Logo de la portátil con gráfico (`4geeks.ico`, `logoNavBar.png`) | Marca de nodos: `Logo`, `favicon.ico` y `public/brand/` |
| `@mui/material`, `@emotion/*`, `@tremor/react` (instalados, sin imports) | Desinstalar |
| Chart.js 2.9.4 por CDN (sin uso en `src`) | Quitar de `template.html` |
| `src/styles/*.css` | Clases de Tailwind en los componentes; los archivos se borran a medida que su pantalla migra |

### Antes de empezar

Estas reglas globales rompen Tailwind en cualquier pantalla, porque `home.css` y las demás hojas se cargan al inicio para toda la app:
- `html { font-size: 80% }` y `70%` (`home.css`): Tailwind mide en `rem`, así que encogerían todo el sistema en tablets y móviles.
- `* { outline: none }` (`home.css`): borra el foco; shadcn usa `outline-ring/50` y anillos.
- `table, td, th` con bordes negros y `.row` (`perfil.css`); `.container { width: 90% }` (`dashboard.css`); `section { padding: 1rem 10% }` y `body { background-color }` (`home.css`).
- `.active { color: #695cfe }` (`navbar.css`): chocaría con el `NavLink` de react-router, que añade la clase `active`.

### Orden

La migración va en una rama y se publica completa. No conviene mezclar Bootstrap y Tailwind en producción: las utilidades de Bootstrap 5 llevan `!important` y pisan las de Tailwind con el mismo nombre y otro valor (`.p-4` es 1.5rem en Bootstrap y 1rem en Tailwind; `.gap-3`, `.border`, `.rounded`, `.shadow` también chocan).

1. **Base:** React 19, Tailwind v4 + PostCSS, alias `@`, `components.json`, `globals.css` con los tokens, fuentes, ThemeProvider y Toaster. Quitar las reglas globales de arriba.
2. **Shell:** Sidebar, encabezado de página, paleta de comandos.
3. **Tablero (`/perfil`):** tarjetas de etapa, métricas, gráficos, tareas.
4. **Embudo:** `kanban.js` y `kanbanAsociado.js` (y sus `sortCRM*`) a la vez; tarjeta de negocio y ficha en Sheet.
5. **Clientes:** Data Table y ficha.
6. **Resto de páginas privadas:** tareas, cursos, videos, donaciones, reporte de errores, administración.
7. **Acceso y landing.**
8. **Limpieza:** quitar los CDN de `template.html`, desinstalar las librerías reemplazadas y borrar `src/styles/` salvo `globals.css`.

## Guía para agentes

Referencia rápida de colores (claro / oscuro):
- Primary: `#695cfe` / `#695cfe` — acción principal, ítem activo, foco
- Accent: `#f3f2ff` (texto `#5547e8`) / `#1e1b3a` (texto `#c7c2ff`) — hover, activo, enlaces en oscuro
- Background: `#ffffff` / `#09090b`
- Card: `#ffffff` / `#111114`
- Muted: `#f4f4f5` (texto `#6b6b76`) / `#27272a` (texto `#a1a1aa`)
- Border: `#e4e4e7` / `#27272a`
- Destructive: `#dc2626` / `#ef4444`
- Sidebar: `#fafafa` / `#0c0c0f`
- Etapas: Prospecto `#3b82f6`, Contactado `#f59e0b`, Primera Cita `#f43f5e`, Negociación `#06b6d4`, Cerrado `#10b981`
- Marca (solo landing): Violeta Eléctrico `#9340ff`

Prompts de ejemplo:

Crea el resumen del embudo para `/perfil` con componentes de shadcn: cinco `Card` en `grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5`, cada una con el punto de etapa (`size-2 rounded-full` con la clase `dot` de `ETAPAS`) y su nombre en `text-sm text-muted-foreground`, el conteo en `text-3xl font-semibold tabular-nums tracking-tight` y el monto en `text-sm text-muted-foreground tabular-nums`; debajo, una barra apilada de 8px `rounded-full` con la proporción por etapa. Debe verse bien en claro y oscuro.

Crea un carril del Kanban para "Negociación": columna `w-72 shrink-0 rounded-xl bg-muted/50 p-2`; encabezado con punto `bg-etapa-negociacion`, nombre en `text-sm font-medium`, `Badge variant="secondary"` con el conteo y monto a la derecha; tarjetas `rounded-lg border bg-card p-3 shadow-xs` separadas con `gap-2`, cada una con nombre, menú `MoreHorizontal`, monto en `font-semibold tabular-nums` y fila de actividad con íconos lucide de 14px; al arrastrar encima, `bg-accent ring-1 ring-primary/30`.

Crea la tarjeta "Meta de ventas": `Card` con `CardDescription` "Meta de ventas", cifra en `text-3xl font-semibold tabular-nums`, `Progress` violeta y la línea "62 % de tu meta" en `text-sm text-muted-foreground`; si no hay meta, el texto "Aún no tienes una meta" y un botón `outline` "Registrar meta" que abre un `Dialog` con un `Field` numérico y el botón "Guardar meta". Al guardar, `toast.success("Meta actualizada")` con Sonner.

Crea el borrado de un cliente: ítem "Eliminar" con `variant="destructive"` en el `DropdownMenu` de la tarjeta, que abre un `AlertDialog` con el título "¿Eliminar a {nombre}?", la descripción "Esta acción no se puede deshacer.", "Cancelar" y "Eliminar" en variante destructive; al confirmar, llama a `actions.deleteCliente(id)` y muestra `toast.success("{nombre} fue eliminado")`.

Crea el héroe de la landing: sección centrada con las utilidades `hero-glow` y `bg-cuadricula`, píldora `Badge variant="outline" className="rounded-full"`, titular `text-5xl md:text-7xl font-semibold tracking-tighter text-balance` con "tu equipo de ventas" en degradado de `--primary` a `--brand-electrico`, subtítulo `text-lg text-muted-foreground`, botones `lg` "Prueba la app" y "Ingresa" (`outline`), y la captura del tablero en `rounded-2xl border bg-card p-2 shadow-2xl`.

## Marcas similares

- **Linear** — neutros casi monocromos con un único acento violeta, tipografía con tracking ajustado y sidebar compacto colapsable.
- **Attio** — CRM moderno con tablas densas, vistas de embudo y etiquetas de estado en tintes suaves.
- **Pipedrive** — el embudo por etapas como eje, con tarjetas de negocio arrastrables y montos por columna.
- **Vercel** — Geist, superficies limpias en claro y oscuro, y héroes con resplandor y cuadrícula tenue.

## Inicio rápido

### 1. Dependencias

```bash
npm install react@19 react-dom@19
npm install tailwindcss @tailwindcss/postcss postcss postcss-loader
npm install shadcn class-variance-authority cn lucide-react tw-animate-css
```

### 2. Webpack, Babel y alias

`webpack.common.js`: añadir `postcss-loader` a la regla de CSS, `.jsx` a las extensiones (shadcn con `tsx: false` genera `.jsx`) y el alias `@`:

```js
{
  test: /\.(css|scss)$/,
  use: ["style-loader", "css-loader", "postcss-loader"],
},
// ...
resolve: {
  extensions: [".js", ".jsx"],
  alias: { "@": path.resolve(__dirname, "src/js") },
},
```

`postcss.config.js` en la raíz:

```js
module.exports = {
  plugins: { "@tailwindcss/postcss": {} },
};
```

`jsconfig.json` en la raíz (el CLI de shadcn lee el alias de aquí):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/js/*"] }
  }
}
```

En la configuración de Babel de `package.json`, el runtime automático de JSX, para que los componentes generados no necesiten `import React`:

```json
["@babel/preset-react", { "runtime": "automatic" }]
```

### 3. `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "radix-nova",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

Componentes de partida:

```bash
npx shadcn@latest add sidebar breadcrumb separator button badge card chart progress table dropdown-menu dialog alert-dialog sheet tabs field input input-group textarea select calendar popover slider scroll-area skeleton spinner empty command kbd avatar tooltip aspect-ratio sonner
```

### 4. `src/styles/globals.css`

Parte del `globals.css` de la guía de instalación manual de shadcn (imports, `@custom-variant dark`, `@theme inline` y `@layer base`). Se importa primero en `src/js/index.js` (`import "../styles/globals.css";`). Reemplaza sus valores de `:root` y `.dark` por los de LinkedTeam y añade el resto de este bloque:

```css
:root {
  --radius: 0.625rem;
  --background: #ffffff;
  --foreground: #18181b;
  --card: #ffffff;
  --card-foreground: #18181b;
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --primary: #695cfe;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #6b6b76;
  --accent: #f3f2ff;
  --accent-foreground: #5547e8;
  --destructive: #dc2626;
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #695cfe;
  --chart-1: var(--etapa-prospecto);
  --chart-2: var(--etapa-contactado);
  --chart-3: var(--etapa-primera-cita);
  --chart-4: var(--etapa-negociacion);
  --chart-5: var(--etapa-cerrado);
  --sidebar: #fafafa;
  --sidebar-foreground: #3f3f46;
  --sidebar-primary: #695cfe;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #efeefe;
  --sidebar-accent-foreground: #5547e8;
  --sidebar-border: #e4e4e7;
  --sidebar-ring: #695cfe;

  /* Etapas del embudo (clave = Cliente.status) */
  --etapa-prospecto: #3b82f6;
  --etapa-prospecto-texto: #1d4ed8;
  --etapa-contactado: #f59e0b;
  --etapa-contactado-texto: #b45309;
  --etapa-primera-cita: #f43f5e;
  --etapa-primera-cita-texto: #be123c;
  --etapa-negociacion: #06b6d4;
  --etapa-negociacion-texto: #0e7490;
  --etapa-cerrado: #10b981;
  --etapa-cerrado-texto: #047857;

  /* Marca, solo landing */
  --brand-electrico: #9340ff;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
  --card: #111114;
  --card-foreground: #fafafa;
  --popover: #18181b;
  --popover-foreground: #fafafa;
  --primary: #695cfe;
  --primary-foreground: #ffffff;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #1e1b3a;
  --accent-foreground: #c7c2ff;
  --destructive: #ef4444;
  --border: #27272a;
  --input: #34343b;
  --ring: #8b82ff;
  --sidebar: #0c0c0f;
  --sidebar-foreground: #d4d4d8;
  --sidebar-primary: #695cfe;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #1e1b3a;
  --sidebar-accent-foreground: #d4d0ff;
  --sidebar-border: #27272a;
  --sidebar-ring: #8b82ff;

  --etapa-prospecto-texto: #93c5fd;
  --etapa-contactado-texto: #fcd34d;
  --etapa-primera-cita-texto: #fda4af;
  --etapa-negociacion-texto: #67e8f9;
  --etapa-cerrado-texto: #6ee7b7;
}

/* Si el globals.css de shadcn ya define --font-sans o --font-mono, reemplázalos por estos. */
@theme inline {
  --font-sans: "Geist", ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, Consolas, monospace;

  --color-etapa-prospecto: var(--etapa-prospecto);
  --color-etapa-prospecto-texto: var(--etapa-prospecto-texto);
  --color-etapa-contactado: var(--etapa-contactado);
  --color-etapa-contactado-texto: var(--etapa-contactado-texto);
  --color-etapa-primera-cita: var(--etapa-primera-cita);
  --color-etapa-primera-cita-texto: var(--etapa-primera-cita-texto);
  --color-etapa-negociacion: var(--etapa-negociacion);
  --color-etapa-negociacion-texto: var(--etapa-negociacion-texto);
  --color-etapa-cerrado: var(--etapa-cerrado);
  --color-etapa-cerrado-texto: var(--etapa-cerrado-texto);
  --color-brand-electrico: var(--brand-electrico);
}

/* Resplandor violeta detrás del héroe y de la banda de cierre */
@utility hero-glow {
  background-image: radial-gradient(
    60% 50% at 50% 0%,
    color-mix(in oklab, var(--brand-electrico) 22%, transparent),
    transparent 70%
  );
}

/* Cuadrícula tenue que se desvanece hacia abajo */
@utility bg-cuadricula {
  background-image:
    linear-gradient(to right, var(--border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--border) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at top, black 30%, transparent 70%);
}
```

### 5. Fuentes (`template.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

### 6. Mapa de etapas (`src/js/lib/etapas.js`)

```js
// status = valor de Cliente.status en el backend (no renombrar).
// key = nombre seguro para CSS: ChartConfig genera --color-<key>.
// Las clases van completas para que Tailwind las detecte; no armarlas con template strings.
export const ETAPAS = [
  {
    status: "Prospecto",
    key: "prospecto",
    label: "Prospectos",
    chart: "var(--chart-1)",
    dot: "bg-etapa-prospecto",
    badge: "bg-etapa-prospecto/10 text-etapa-prospecto-texto",
  },
  {
    status: "Contactado",
    key: "contactado",
    label: "Contactados",
    chart: "var(--chart-2)",
    dot: "bg-etapa-contactado",
    badge: "bg-etapa-contactado/10 text-etapa-contactado-texto",
  },
  {
    status: "Primera Cita",
    key: "primeraCita",
    label: "Primera cita",
    chart: "var(--chart-3)",
    dot: "bg-etapa-primera-cita",
    badge: "bg-etapa-primera-cita/10 text-etapa-primera-cita-texto",
  },
  {
    status: "Negociación",
    key: "negociacion",
    label: "Negociación",
    chart: "var(--chart-4)",
    dot: "bg-etapa-negociacion",
    badge: "bg-etapa-negociacion/10 text-etapa-negociacion-texto",
  },
  {
    status: "Cerrado",
    key: "cerrado",
    label: "Cierres",
    chart: "var(--chart-5)",
    dot: "bg-etapa-cerrado",
    badge: "bg-etapa-cerrado/10 text-etapa-cerrado-texto",
  },
];

export const chartConfigEtapas = Object.fromEntries(
  ETAPAS.map((etapa) => [etapa.key, { label: etapa.label, color: etapa.chart }])
);
```

### 7. Tema y Toaster

`src/js/components/theme-provider.jsx`:

```jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "system", setTheme: () => {} });

export function ThemeProvider({ children, storageKey = "theme" }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem(storageKey) || "system"
  );

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme]);

  const setTheme = (next) => {
    localStorage.setItem(storageKey, next);
    setThemeState(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

El `src/js/components/ui/sonner.jsx` que genera shadcn importa `useTheme` de `next-themes`. Cámbialo por `import { useTheme } from "@/components/theme-provider";` y desinstala `next-themes`.

En `layout.js`, `ThemeProvider` envuelve el `BrowserRouter` y el `Toaster` de Sonner reemplaza al de react-hot-toast:

```jsx
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

<ThemeProvider>
  <BrowserRouter basename={basename}>
    {/* rutas */}
    <Toaster position="bottom-right" />
  </BrowserRouter>
</ThemeProvider>
```

Uso de los toasts:

```js
import { toast } from "sonner";

toast.success("Cliente guardado");

toast.error("No se pudo guardar el cliente", {
  description: "Revisa tu conexión e inténtalo de nuevo.",
});

// Requiere que la action de flux.js devuelva la promesa del fetch.
toast.promise(actions.importarClientes(archivo), {
  loading: "Importando clientes…",
  success: (total) => `${total} clientes importados`,
  error: "No se pudo importar el archivo",
});
```
