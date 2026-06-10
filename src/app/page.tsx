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

      {/* Hero — dark instrument-style band (neutral placeholder, no photo asset yet) */}
      <section className="bg-[#1B3A5B] text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-300">
            {ORG.parent}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
            Servicios analíticos para la industria biofarmacéutica
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Caracterización de proteínas y biofármacos, desarrollo analítico
            regulatorio, anticuerpos monoclonales y MALDI-TOF multi-sector. Cada
            servicio incluye un informe técnico interpretado.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton accent="#0E7C7B" className="px-6 py-3 text-base" />
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* 2×2 area grid */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Áreas de servicio</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Cuatro áreas que cubren desde la caracterización biofísica hasta el
          soporte regulatorio y la producción de anticuerpos.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {areas.map((area) => (
            <AreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      {/* ¿Por qué LEFIP? */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">¿Por qué LEFIP?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_LEFIP.map((point) => (
              <div
                key={point}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <p className="text-sm leading-relaxed text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment strip */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-semibold text-slate-900">Equipamiento</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT.map((eq) => (
            <div
              key={eq.name}
              className="rounded-lg border border-slate-200 p-5"
            >
              <p className="font-mono text-sm font-semibold text-slate-900">
                {eq.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {eq.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
