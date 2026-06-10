// Area card for the L0 home grid. Accent top-border in the area color.
import Link from "next/link";
import type { Area } from "@/lib/content";

export default function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/servicios/${area.slug}`}
      className="group flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      style={{ borderTop: `3px solid ${area.accent}` }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: area.accent }}
      >
        {area.code}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">{area.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {area.tagline}
      </p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-slate-700 group-hover:underline">
        Ver servicios →
      </span>
    </Link>
  );
}
