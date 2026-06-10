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
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Solicitar cotización
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Contanos sobre tu proyecto. El presupuesto se cotiza por proyecto e
        incluye informe técnico con interpretación.
      </p>
      <div className="mt-8">
        <QuoteForm defaultArea={area} defaultAssay={assay} />
      </div>
    </div>
  );
}
