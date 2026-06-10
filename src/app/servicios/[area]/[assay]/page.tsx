import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { assays, getArea, getAssay } from "@/lib/content";
import { ORG, SITE_URL } from "@/lib/site";
import Ficha from "@/components/Ficha";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return assays.map((a) => ({ area: a.areaSlug, assay: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/servicios/[area]/[assay]">,
): Promise<Metadata> {
  const { area: areaSlug, assay: assaySlug } = await props.params;
  const assay = getAssay(areaSlug, assaySlug);
  if (!assay) return {};
  return {
    title: assay.name,
    description: assay.useCase,
  };
}

export default async function AssayPage(
  props: PageProps<"/servicios/[area]/[assay]">,
) {
  const { area: areaSlug, assay: assaySlug } = await props.params;
  const area = getArea(areaSlug);
  const assay = getAssay(areaSlug, assaySlug);
  if (!area || !assay) notFound();

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: assay.name,
    description: assay.useCase,
    serviceType: area.name,
    url: `${SITE_URL}/servicios/${area.slug}/${assay.slug}`,
    provider: {
      "@type": "Organization",
      name: ORG.name,
      parentOrganization: { "@type": "Organization", name: ORG.parent },
    },
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <Ficha assay={assay} area={area} />
    </>
  );
}
