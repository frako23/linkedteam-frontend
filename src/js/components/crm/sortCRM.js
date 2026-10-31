import { useContext, useState } from "react";
import { Search, X } from "lucide-react";
import { Context } from "@/store/appContext";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONTOS = [
  { valor: "300-1499", etiqueta: "$300 a $1.499", rango: [300, 1499] },
  { valor: "1500-3999", etiqueta: "$1.500 a $3.999", rango: [1500, 3499] },
  { valor: "4000-9999", etiqueta: "$4.000 a $9.999", rango: [4000, 9999] },
  { valor: "10000-50000", etiqueta: "Más de $10.000", rango: [10000, 50000] },
];

const EDADES = [
  { valor: "0-18", etiqueta: "0 a 18 años", rango: [0, 18] },
  { valor: "19-29", etiqueta: "19 a 29 años", rango: [19, 29] },
  { valor: "30-39", etiqueta: "30 a 39 años", rango: [30, 39] },
  { valor: "40-54", etiqueta: "40 a 54 años", rango: [40, 54] },
  { valor: "55-69", etiqueta: "55 a 69 años", rango: [55, 69] },
  { valor: "70-120", etiqueta: "Más de 70 años", rango: [70, 120] },
];

const CONFIANZA = ["Alta", "Media", "Baja"];

/** Búsqueda y filtros del embudo. Con `id` actúa sobre los negocios de un asesor. */
export default function SortCRM({ id }) {
  const { actions } = useContext(Context);
  const [nombre, setNombre] = useState("");
  const [filtro, setFiltro] = useState({ monto: "", edad: "", confianza: "" });
  const asesor = id !== undefined;

  const recargar = () => (asesor ? actions.getUserClients(id) : actions.getClientes());

  const reiniciar = () => {
    recargar();
    setNombre("");
    setFiltro({ monto: "", edad: "", confianza: "" });
  };

  const buscar = (valor) => {
    if (valor === "") recargar();
    setNombre(valor);
    if (asesor) actions.findByNameAsociados(valor);
    else actions.findByName(valor);
  };

  const hayFiltros = nombre || filtro.monto || filtro.edad || filtro.confianza;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <InputGroup className="w-full sm:w-64">
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          value={nombre}
          onChange={(e) => buscar(e.target.value)}
          placeholder="Buscar cliente"
          aria-label="Buscar cliente"
        />
      </InputGroup>

      <Select
        value={filtro.monto}
        onValueChange={(v) => {
          const { rango } = MONTOS.find((m) => m.valor === v);
          asesor
            ? actions.filterByAmountAsociados(...rango)
            : actions.filterByAmount(...rango);
          setFiltro({ ...filtro, monto: v });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Monto" />
        </SelectTrigger>
        <SelectContent>
          {MONTOS.map((m) => (
            <SelectItem key={m.valor} value={m.valor}>
              {m.etiqueta}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filtro.edad}
        onValueChange={(v) => {
          const { rango } = EDADES.find((e) => e.valor === v);
          asesor
            ? actions.filterByAgeAsociados(...rango)
            : actions.filterByAge(...rango);
          setFiltro({ ...filtro, edad: v });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Edad" />
        </SelectTrigger>
        <SelectContent>
          {EDADES.map((e) => (
            <SelectItem key={e.valor} value={e.valor}>
              {e.etiqueta}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filtro.confianza}
        onValueChange={(v) => {
          asesor
            ? actions.filterByTrustAsociados(v)
            : actions.filterByTrust(v);
          setFiltro({ ...filtro, confianza: v });
        }}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Confianza" />
        </SelectTrigger>
        <SelectContent>
          {CONFIANZA.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hayFiltros ? (
        <Button variant="ghost" size="sm" onClick={reiniciar}>
          <X /> Reiniciar
        </Button>
      ) : null}
    </div>
  );
}
