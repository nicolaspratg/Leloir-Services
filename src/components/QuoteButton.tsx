// Persistent primary CTA. Defaults to the navy brand color; an area page can
// pass its accent to tint the button to match the section.
import Link from "next/link";

export default function QuoteButton({
  href = "/contacto",
  accent = "#1B3A5B",
  className = "",
  children = "Solicitar cotización",
}: {
  href?: string;
  accent?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-[3px] px-5 py-2.5 text-sm font-semibold tracking-tight text-white shadow-[0_1px_2px_rgba(20,32,46,0.18)] transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(20,32,46,0.22)] ${className}`}
      style={{ backgroundColor: accent }}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
