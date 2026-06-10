// Sector chips for the L1 area pages.
export default function Sectors({
  sectors,
  accent = "#1B3A5B",
}: {
  sectors: string[];
  accent?: string;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {sectors.map((s) => (
        <li
          key={s}
          className="rounded-[3px] border px-3 py-1 font-mono text-[11px] tracking-tight text-ink-soft"
          style={{ borderColor: `${accent}33`, backgroundColor: `${accent}0D` }}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
