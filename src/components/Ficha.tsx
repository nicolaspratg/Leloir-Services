// src/components/Ficha.tsx
// L2 assay sheet renderer. Server component.
// Renders only the fields present on the assay, in the fixed template order.
// NOTE: adjust the import path below if your scaffold doesn't use the "@/" alias.

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

  const quoteHref = `/contacto?area=${area.slug}&assay=${assay.slug}`;

  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      {/* Eyebrow: area context */}
      <nav className="mb-6 text-sm">
        <Link href="/servicios" className="text-slate-500 hover:text-slate-700">
          Servicios
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <Link
          href={`/servicios/${area.slug}`}
          className="font-medium hover:underline"
          style={{ color: area.accent }}
        >
          {area.code}
        </Link>
      </nav>

      {/* Title — only the h1 may hide on small screens elsewhere; here it stays */}
      <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
        {assay.name}
      </h1>

      {/* Spec sheet */}
      <dl className="mt-8 divide-y divide-slate-100 border-y border-slate-100">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6"
          >
            <dt
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
              style={{ borderLeft: `3px solid ${area.accent}`, paddingLeft: "0.625rem" }}
            >
              {row.label}
            </dt>
            <dd
              className={
                // Technical, data-like fields render in mono for a spec-sheet feel.
                ["Requerimientos de muestra", "Output / Entregable", "Tiempo de respuesta"].includes(
                  row.label,
                )
                  ? "font-mono text-sm leading-relaxed text-slate-700"
                  : "text-[15px] leading-relaxed text-slate-700"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* CTA — carries area + assay context into the form */}
      <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          El presupuesto se cotiza por proyecto e incluye informe técnico con
          interpretación. Respondemos en menos de 48&nbsp;horas hábiles.
        </p>
        <Link
          href={quoteHref}
          className="mt-4 inline-flex items-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: area.accent }}
        >
          Solicitar cotización
        </Link>
      </div>
    </article>
  );
}
