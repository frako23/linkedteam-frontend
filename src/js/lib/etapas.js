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

export const formatoMonto = (valor) =>
  `$${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(
    Number(valor) || 0
  )}`;
