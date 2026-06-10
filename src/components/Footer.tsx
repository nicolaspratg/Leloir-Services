// Institutional footer: brand placeholders, services contact, address.
import Link from "next/link";
import { areas } from "@/lib/content";
import { ORG, SERVICES_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-[#1B3A5B]">{ORG.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {ORG.longName}
            </p>
            <p className="mt-1 text-sm text-slate-500">{ORG.parent}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Servicios
            </p>
            <ul className="mt-3 space-y-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/servicios/${a.slug}`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    {a.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Contacto
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a href={`mailto:${SERVICES_EMAIL}`} className="hover:text-slate-900">
                  {SERVICES_EMAIL}
                </a>
              </li>
              <li>{ORG.address}</li>
              <li>
                <Link href="/contacto" className="hover:text-slate-900">
                  Solicitar cotización
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand / institutional logos — placeholders until assets are supplied. */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Respaldo institucional
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {["LEFIP", "Inst. Leloir", "CONICET"].map((logo) => (
                <div
                  key={logo}
                  className="flex h-12 w-24 items-center justify-center rounded border border-dashed border-slate-300 bg-white text-[11px] text-slate-400"
                >
                  {logo}
                </div>
              ))}
            </div>
            {/* TODO: publications / PubMed section (phase 2). */}
            {/* TODO: ResearchGate / institutional profile link when confirmed. */}
          </div>
        </div>

        <p className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {ORG.name} — {ORG.parent}. Todos los
          análisis incluyen informe técnico interpretado.
        </p>
      </div>
    </footer>
  );
}
