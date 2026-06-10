import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, ORG } from "@/lib/site";

// Editorial display serif for headings.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Engineered technical sans for body copy.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Instrument-readout monospace for data, labels and indices.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} — Servicios analíticos para biofármacos`,
    template: `%s · ${ORG.name}`,
  },
  description:
    "Servicios analíticos para la industria biofarmacéutica: caracterización de biofármacos, MALDI-TOF, RMN, validación analítica y anticuerpos monoclonales. LEFIP, Fundación Instituto Leloir / CONICET.",
  keywords: [
    "servicios MALDI-TOF Argentina",
    "caracterización biofármacos Argentina",
    "anticuerpos monoclonales servicio CRO Argentina",
    "validación analítica biofármacos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
