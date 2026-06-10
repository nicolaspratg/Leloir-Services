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
    <ol className="relative border-l border-slate-200 pl-6">
      {stages.map((stage) => (
        <li key={stage.n} className="mb-8 last:mb-0">
          <span
            className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accent }}
          >
            {stage.n}
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h3 className="text-base font-semibold text-slate-900">
              {stage.module}
            </h3>
            <span className="font-mono text-xs text-slate-500">
              {stage.weeks} semanas
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {stage.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
