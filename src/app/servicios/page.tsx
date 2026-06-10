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
    <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <span className="label-mono text-ink-faint">Catálogo de servicios</span>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
        Servicios
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        Cuatro áreas de servicio. Cada ensayo se cotiza por proyecto e incluye un
        informe técnico interpretado.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {areas.map((area) => (
          <AreaCard key={area.slug} area={area} />
        ))}
      </div>
    </div>
  );
}
