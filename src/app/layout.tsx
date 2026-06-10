import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, ORG } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
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
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
