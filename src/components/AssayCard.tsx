// Assay card for the L1 area page grid. Links to the L2 ficha.
import Link from "next/link";
import type { Assay, Area } from "@/lib/content";

export default function AssayCard({ assay, area }: { assay: Assay; area: Area }) {
  return (
    <Link
      href={`/servicios/${area.slug}/${assay.slug}`}
      className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300"
    >
      <h3 className="text-base font-semibold leading-snug text-slate-900">
        {assay.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {assay.useCase}
      </p>
      <span
        className="mt-4 inline-flex items-center text-sm font-medium group-hover:underline"
        style={{ color: area.accent }}
      >
        Ver ficha →
      </span>
    </Link>
  );
}
