import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { areas, getArea, getAssaysByArea } from "@/lib/content";
import Sectors from "@/components/Sectors";
import AssayCard from "@/components/AssayCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import QuoteButton from "@/components/QuoteButton";

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/servicios/[area]">,
): Promise<Metadata> {
  const { area: areaSlug } = await props.params;
  const area = getArea(areaSlug);
  if (!area) return {};
  return {
    title: `${area.code} — ${area.name}`,
    description: area.tagline,
  };
}

export default async function AreaPage(props: PageProps<"/servicios/[area]">) {
  const { area: areaSlug } = await props.params;
  const area = getArea(areaSlug);
  if (!area) notFound();

  const assays = getAssaysByArea(area.slug);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/servicios" className="text-slate-500 hover:text-slate-700">
          Servicios
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="font-medium" style={{ color: area.accent }}>
          {area.code}
        </span>
      </nav>

      {/* Intro */}
      <span
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: area.accent }}
      >
        {area.code}
      </span>
      <h1 className="mt-1 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
        {area.name}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
        {area.description}
      </p>

      {/* Sectors */}
      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Sectores
        </p>
        <Sectors sectors={area.sectors} accent={area.accent} />
      </div>

      {/* MAbFactory STAN-FIL process */}
      {area.process && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-slate-900">
            Proceso STAN-FIL
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Flujo completo desde la inmunización hasta el control de calidad
            final. Cada módulo puede contratarse de forma independiente.
          </p>
          <div className="mt-8">
            <ProcessTimeline stages={area.process} accent={area.accent} />
          </div>
        </section>
      )}

      {/* Assay grid */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">Ensayos</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {assays.map((assay) => (
            <AssayCard key={assay.slug} assay={assay} area={area} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          ¿No encontrás el ensayo exacto que necesitás? Contanos sobre tu
          proyecto y armamos una propuesta a medida.
        </p>
        <div className="mt-4">
          <QuoteButton
            href={`/contacto?area=${area.slug}`}
            accent={area.accent}
          />
        </div>
      </div>
    </div>
  );
}
