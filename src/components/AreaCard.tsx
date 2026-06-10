// Area card for the L0 home grid. Instrument-panel styling with an accent spine.
import Link from "next/link";
import type { Area } from "@/lib/content";

export default function AreaCard({ area }: { area: Area }) {
  return (
    <Link
      href={`/servicios/${area.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[3px] border border-line bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-line-strong hover:bg-white hover:shadow-[0_10px_30px_-12px_rgba(20,32,46,0.25)]"
    >
      {/* Accent spine, grows on hover. */}
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-100 transition-transform duration-300"
        style={{ backgroundColor: area.accent }}
        aria-hidden
      />
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: area.accent }}
        >
          {area.code}
        </span>
        <span
          className="font-mono text-[11px] tabular-nums text-ink-faint transition-colors"
          aria-hidden
        >
          {area.sectors.length.toString().padStart(2, "0")} sectores
        </span>
      </div>
      <h3 className="font-display mt-3 text-xl font-semibold leading-snug tracking-tight text-navy">
        {area.name}
      </h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
        {area.tagline}
      </p>
      <span
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors"
        style={{ color: area.accent }}
      >
        Ver servicios
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
