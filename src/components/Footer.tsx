// Institutional footer: brand placeholders, services contact, address.
import Link from "next/link";
import { areas } from "@/lib/content";
import { ORG, SERVICES_EMAIL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-navy">
              {ORG.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {ORG.longName}
            </p>
            <p className="mt-1 text-sm text-ink-faint">{ORG.parent}</p>
          </div>

          <div>
            <p className="label-mono text-ink-faint">Servicios</p>
            <ul className="mt-4 space-y-2.5">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/servicios/${a.slug}`}
                    className="font-mono text-[13px] text-ink-soft transition-colors hover:text-navy"
                  >
                    {a.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-mono text-ink-faint">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${SERVICES_EMAIL}`}
                  className="transition-colors hover:text-navy"
                >
                  {SERVICES_EMAIL}
                </a>
              </li>
              <li>{ORG.address}</li>
              <li>
                <Link
                  href="/contacto"
                  className="transition-colors hover:text-navy"
                >
                  Solicitar cotización
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand / institutional logos — placeholders until assets are supplied. */}
          <div>
            <p className="label-mono text-ink-faint">Respaldo institucional</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {["LEFIP", "Inst. Leloir", "CONICET"].map((logo) => (
                <div
                  key={logo}
                  className="flex h-12 w-24 items-center justify-center rounded-[3px] border border-dashed border-line-strong bg-paper font-mono text-[11px] text-ink-faint"
                >
                  {logo}
                </div>
              ))}
            </div>
            {/* TODO: publications / PubMed section (phase 2). */}
            {/* TODO: ResearchGate / institutional profile link when confirmed. */}
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 font-mono text-[11px] leading-relaxed text-ink-faint">
          © {new Date().getFullYear()} {ORG.name} — {ORG.parent}. Todos los
          análisis incluyen informe técnico interpretado.
        </p>
      </div>
    </footer>
  );
}
