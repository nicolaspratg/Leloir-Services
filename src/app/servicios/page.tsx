import type { Metadata } from "next";
import { areas } from "@/lib/content";
import AreaCard from "@/components/AreaCard";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Áreas de servicio de LEFIP: análisis biofísico, desarrollo analítico regulatorio, anticuerpos monoclonales y MALDI-TOF multi-sector.",
};

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Servicios</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Cuatro áreas de servicio. Cada ensayo se cotiza por proyecto e incluye un
        informe técnico interpretado.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {areas.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>
    </div>
  );
}
