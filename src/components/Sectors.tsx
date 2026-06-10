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
          className="rounded-full border px-3 py-1 text-xs font-medium text-slate-700"
          style={{ borderColor: `${accent}40`, backgroundColor: `${accent}0D` }}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
