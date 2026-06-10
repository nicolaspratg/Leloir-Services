import Link from "next/link";
import { areas } from "@/lib/content";
import { ORG, SITE_URL, EQUIPMENT, WHY_LEFIP } from "@/lib/site";
import AreaCard from "@/components/AreaCard";
import QuoteButton from "@/components/QuoteButton";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG.name,
    legalName: ORG.longName,
    parentOrganization: {
      "@type": "Organization",
      name: ORG.parent,
    },
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Polo Científico Tecnológico",
      addressLocality: "CABA",
      addressCountry: "AR",
    },
  };

  return (
    <>
      <JsonLd data={organizationLd} />

      {/* Hero — instrument-style navy band with a blueprint grid. */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 grid-blueprint opacity-70" aria-hidden />
        {/* Faint teal instrument glow, top-right. */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #0E7C7B 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <p className="reveal reveal-1 label-mono text-teal-300/90">
            {ORG.parent}
          </p>
          <h1 className="reveal reveal-2 font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Servicios analíticos para la industria biofarmacéutica
          </h1>
          <p className="reveal reveal-3 mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Caracterización de proteínas y biofármacos, desarrollo analítico
            regulatorio, anticuerpos monoclonales y MALDI-TOF multi-sector. Cada
            servicio incluye un informe técnico interpretado.
          </p>
          <div className="reveal reveal-4 mt-9 flex flex-wrap gap-3">
            <QuoteButton accent="#0E7C7B" className="px-6 py-3 text-base" />
            <Link
              href="/servicios"
              className="group inline-flex items-center justify-center gap-2 rounded-[3px] border border-white/25 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver servicios
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          {/* Instrument readout strip. */}
          <dl className="reveal reveal-4 mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-white/15 bg-white/10 sm:grid-cols-4">
            {[
              { k: "Áreas", v: "04" },
              { k: "Ensayos", v: "24" },
              { k: "MALDI-TOF", v: "Único en AR" },
              { k: "Respuesta", v: "< 48 h" },
            ].map((stat) => (
              <div key={stat.k} className="bg-navy px-4 py-4">
                <dt className="label-mono text-white/50">{stat.k}</dt>
                <dd className="mt-1.5 font-mono text-sm font-medium text-white">
                  {stat.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 2×2 area grid */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-ink-faint">01 / Áreas</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-navy">
          Áreas de servicio
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
          Cuatro áreas que cubren desde la caracterización biofísica hasta el
          soporte regulatorio y la producción de anticuerpos.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      {/* ¿Por qué LEFIP? — editorial numbered list */}
      <section className="relative border-y border-line bg-paper-2">
        <div className="absolute inset-0 grid-paper opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-baseline gap-4">
            <span className="label-mono text-ink-faint">02 / Capacidades</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-navy">
            ¿Por qué LEFIP?
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2">
            {WHY_LEFIP.map((point, i) => (
              <div
                key={point}
                className="flex gap-4 bg-paper p-6 transition-colors hover:bg-white"
              >
                <span className="font-mono text-sm font-medium text-navy/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px] leading-relaxed text-ink">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment strip */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-ink-faint">03 / Equipamiento</span>
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display mt-5 text-3xl font-semibold tracking-tight text-navy">
          Plataforma instrumental
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.map((eq) => (
            <div
              key={eq.name}
              className="group rounded-[3px] border border-line bg-paper p-5 transition-colors hover:border-line-strong hover:bg-white"
            >
              <p className="label-mono text-ink-faint">{eq.detail}</p>
              <p className="mt-3 font-mono text-sm font-medium text-ink">
                {eq.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
