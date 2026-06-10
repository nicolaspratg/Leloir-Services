import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description:
    "Solicitá una cotización personalizada de los servicios analíticos de LEFIP. Respondemos en menos de 48 horas hábiles.",
};

export default async function ContactoPage(
  props: PageProps<"/contacto">,
) {
  const sp = await props.searchParams;
  const area = typeof sp.area === "string" ? sp.area : "";
  const assay = typeof sp.assay === "string" ? sp.assay : "";

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
      <span className="label-mono text-ink-faint">Contacto</span>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
        Solicitar cotización
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
        Contanos sobre tu proyecto. El presupuesto se cotiza por proyecto e
        incluye informe técnico con interpretación.
      </p>
      <div className="mt-10">
        <QuoteForm defaultArea={area} defaultAssay={assay} />
      </div>
    </div>
  );
}
