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
      className={`inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: accent }}
    >
      {children}
    </Link>
  );
}
