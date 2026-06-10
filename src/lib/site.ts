// src/lib/site.ts
// Institutional constants kept out of components so copy/config can change in one place.

// Base URL for absolute links in metadata, sitemap and JSON-LD.
// TODO: set NEXT_PUBLIC_SITE_URL to the production domain before launch.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.lefip.org.ar";

// TODO: confirm the services inbox with the client. The source doc used
// servicios@inis.org.ar, but the lab is at Instituto Leloir — treat as placeholder.
export const SERVICES_EMAIL =
  process.env.NEXT_PUBLIC_SERVICES_EMAIL || "servicios@inis.org.ar";

export const ORG = {
  name: "LEFIP",
  longName:
    "Laboratorio de Estructura-Función e Ingeniería de Proteínas",
  parent: "Fundación Instituto Leloir / CONICET",
  address: "Polo Científico Tecnológico, CABA, Argentina",
  // TODO: confirm public ResearchGate / institutional profile URL (phase 2).
  researchGate: "",
};

export const EQUIPMENT = [
  { name: "Bruker microflex LRF", detail: "MALDI-TOF" },
  { name: "Bruker 600 MHz", detail: "NMR" },
  { name: "DynaPro NanoStar II", detail: "DLS" },
  { name: "Jasco J-815", detail: "Dicroísmo Circular" },
];

export const WHY_LEFIP = [
  "Único servicio MALDI-TOF industrial en Argentina.",
  "Plataforma multianalítica integrada (NMR 600 MHz, DLS, CD, MALDI-TOF).",
  "Respaldo científico: trayectoria de investigación y publicaciones.",
  "Informes técnicos detallados con interpretación experta.",
];

export const TRUST_LINE =
  "Respondemos todas las consultas en menos de 48 horas hábiles.";
