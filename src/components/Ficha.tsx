// src/components/Ficha.tsx
// L2 assay sheet renderer. Server component.
// Renders only the fields present on the assay, in the fixed template order.

import Link from "next/link";
import type { Area, Assay } from "@/lib/content";

type SpecRow = { label: string; value?: string };

export default function Ficha({ assay, area }: { assay: Assay; area: Area }) {
  // Fixed template order. Rows with no value are filtered out.
  const rows: SpecRow[] = [
    { label: "Principio", value: assay.principle },
    { label: "¿Para qué sirve?", value: assay.useCase },
    { label: "Equipamiento", value: assay.equipment },
    { label: "Requerimientos de muestra", value: assay.sample },
    { label: "Output / Entregable", value: assay.output },
    { label: "Normas y referencias", value: assay.standards },
    { label: "Tiempo de respuesta", value: assay.turnaround },
  ].filter((r): r is Required<SpecRow> => Boolean(r.value));

  const monoFields = [
    "Requerimientos de muestra",
    "Output / Entregable",
    "Tiempo de respuesta",
  ];

  const quoteHref = `/contacto?area=${area.slug}&assay=${assay.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      {/* Breadcrumb */}
      <nav className="mb-7 flex items-center gap-2 font-mono text-[13px]">
        <Link href="/servicios" className="text-ink-faint hover:text-navy">
          Servicios
        </Link>
        <span className="text-line-strong">/</span>
        <Link
          href={`/servicios/${area.slug}`}
          className="font-medium hover:underline"
          style={{ color: area.accent }}
        >
          {area.code}
        </Link>
      </nav>

      {/* Datasheet header */}
      <span
        className="label-mono"
        style={{ color: area.accent }}
      >
        Ficha técnica
      </span>
      <h1 className="font-display mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-navy sm:text-4xl">
        {assay.name}
      </h1>

      {/* Spec sheet */}
      <dl className="mt-10 overflow-hidden rounded-[3px] border border-line">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid gap-1.5 px-5 py-5 sm:grid-cols-[200px_1fr] sm:gap-6 ${
              i % 2 === 1 ? "bg-paper-2/50" : "bg-paper"
            }`}
          >
            <dt
              className="label-mono text-ink-faint"
              style={{
                borderLeft: `2px solid ${area.accent}`,
                paddingLeft: "0.75rem",
              }}
            >
              {row.label}
            </dt>
            <dd
              className={
                monoFields.includes(row.label)
                  ? "font-mono text-[13px] leading-relaxed text-ink"
                  : "text-[15px] leading-relaxed text-ink"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* CTA — carries area + assay context into the form */}
      <div
        className="mt-10 rounded-[3px] border border-line bg-paper-2/60 p-6"
        style={{ borderTop: `2px solid ${area.accent}` }}
      >
        <p className="text-sm leading-relaxed text-ink-soft">
          El presupuesto se cotiza por proyecto e incluye informe técnico con
          interpretación. Respondemos en menos de 48&nbsp;horas hábiles.
        </p>
        <Link
          href={quoteHref}
          className="group mt-5 inline-flex items-center gap-2 rounded-[3px] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(20,32,46,0.22)]"
          style={{ backgroundColor: area.accent }}
        >
          Solicitar cotización
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
