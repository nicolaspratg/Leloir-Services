// Persistent top navigation with the always-present quote CTA.
import Link from "next/link";
import { areas } from "@/lib/content";
import { ORG } from "@/lib/site";
import QuoteButton from "./QuoteButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
        <Link href="/" className="group flex items-baseline gap-2.5">
          <span className="font-display text-xl font-semibold tracking-tight text-navy">
            {ORG.name}
          </span>
          <span className="hidden label-mono text-ink-faint sm:inline">
            Servicios analíticos
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/servicios/${a.slug}`}
              className="group relative font-mono text-[13px] text-ink-soft transition-colors hover:text-navy"
            >
              {a.code}
              <span
                className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: a.accent }}
              />
            </Link>
          ))}
        </div>

        <div className="ml-auto md:ml-4">
          <QuoteButton className="px-4 py-2" />
        </div>
      </nav>
    </header>
  );
}
