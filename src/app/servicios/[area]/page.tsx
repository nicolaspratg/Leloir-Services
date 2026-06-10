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
      <nav className="mb-7 flex items-center gap-2 font-mono text-[13px]">
        <Link href="/servicios" className="text-ink-faint hover:text-navy">
          Servicios
        </Link>
        <span className="text-line-strong">/</span>
        <span className="font-medium" style={{ color: area.accent }}>
          {area.code}
        </span>
      </nav>

      {/* Intro */}
      <span
        className="label-mono"
        style={{ color: area.accent }}
      >
        {area.code}
      </span>
      <h1 className="font-display mt-3 text-3xl font-semibold leading-[1.08] tracking-tight text-navy sm:text-5xl">
        {area.name}
      </h1>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink">
        {area.description}
      </p>

      {/* Sectors */}
      <div className="mt-7">
        <p className="label-mono mb-2.5 text-ink-faint">Sectores</p>
        <Sectors sectors={area.sectors} accent={area.accent} />
      </div>

      {/* MAbFactory STAN-FIL process */}
      {area.process && (
        <section className="mt-14 border-t border-line pt-12">
          <div className="flex items-baseline gap-4">
            <span className="label-mono text-ink-faint">Proceso</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-navy">
            STAN-FIL
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            Flujo completo desde la inmunización hasta el control de calidad
            final. Cada módulo puede contratarse de forma independiente.
          </p>
          <div className="mt-9">
            <ProcessTimeline stages={area.process} accent={area.accent} />
          </div>
        </section>
      )}

      {/* Assay grid */}
      <section className="mt-14 border-t border-line pt-12">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-ink-faint">
            Ensayos · {assays.length.toString().padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {assays.map((assay) => (
            <AssayCard key={assay.slug} assay={assay} area={area} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div
        className="mt-12 rounded-[3px] border border-line bg-paper-2/60 p-6"
        style={{ borderTop: `2px solid ${area.accent}` }}
      >
        <p className="text-sm leading-relaxed text-ink-soft">
          ¿No encontrás el ensayo exacto que necesitás? Contanos sobre tu
          proyecto y armamos una propuesta a medida.
        </p>
        <div className="mt-5">
          <QuoteButton
            href={`/contacto?area=${area.slug}`}
            accent={area.accent}
          />
        </div>
      </div>
    </div>
  );
}
