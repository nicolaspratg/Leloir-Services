// MAbFactory STAN-FIL process timeline. Renders area.process stages in order.
import type { ProcessStage } from "@/lib/content";

export default function ProcessTimeline({
  stages,
  accent = "#E07A3F",
}: {
  stages: ProcessStage[];
  accent?: string;
}) {
  return (
    <ol className="relative pl-8">
      {/* Vertical rail. */}
      <span
        className="absolute left-[11px] top-1 bottom-1 w-px"
        style={{ backgroundColor: `${accent}40` }}
        aria-hidden
      />
      {stages.map((stage) => (
        <li key={stage.n} className="relative mb-9 last:mb-0">
          <span
            className="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-semibold text-white ring-4 ring-paper"
            style={{ backgroundColor: accent }}
          >
            {stage.n}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-base font-semibold tracking-tight text-navy">
              {stage.module}
            </h3>
            <span
              className="rounded-[3px] px-1.5 py-0.5 font-mono text-[11px] font-medium"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              {stage.weeks} semanas
            </span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {stage.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
