// Assay card for the L1 area page grid. Links to the L2 ficha.
import Link from "next/link";
import type { Assay, Area } from "@/lib/content";

export default function AssayCard({ assay, area }: { assay: Assay; area: Area }) {
  return (
    <Link
      href={`/servicios/${area.slug}/${assay.slug}`}
      className="group flex h-full flex-col rounded-[3px] border border-line bg-paper p-5 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-white hover:shadow-[0_10px_28px_-14px_rgba(20,32,46,0.22)]"
    >
      <h3 className="text-base font-semibold leading-snug tracking-tight text-navy">
        {assay.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {assay.useCase}
      </p>
      <span
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: area.accent }}
      >
        Ver ficha
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
