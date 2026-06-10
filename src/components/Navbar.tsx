// Persistent top navigation with the always-present quote CTA.
import Link from "next/link";
import { areas } from "@/lib/content";
import { ORG } from "@/lib/site";
import QuoteButton from "./QuoteButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-[#1B3A5B]">
            {ORG.name}
          </span>
          <span className="hidden text-xs text-slate-500 sm:inline">
            Servicios analíticos
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={`/servicios/${a.slug}`}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {a.code}
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
