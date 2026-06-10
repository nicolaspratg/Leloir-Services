import { NextResponse } from "next/server";
import { getArea, getAssay } from "@/lib/content";

// Lead capture endpoint. Sends the quote request by email via Resend's HTTP API
// (no SDK dependency). If RESEND_API_KEY is not configured, the lead is logged
// server-side and the request still succeeds, so the form never breaks.
//
// Same-day no-backend alternative: point QuoteForm's fetch at a Formspree
// endpoint instead of this route (see README).

type Lead = {
  nombre?: string;
  empresa?: string;
  cargo?: string;
  email?: string;
  telefono?: string;
  area?: string;
  ensayo?: string;
  muestra?: string;
  cantidad?: string;
  urgencia?: string;
  comentarios?: string;
};

// TODO: confirm the services inbox with the client (placeholder from source doc).
const TO = process.env.SERVICES_EMAIL || process.env.NEXT_PUBLIC_SERVICES_EMAIL;
// TODO: set RESEND_FROM to a verified sender on your Resend domain.
const FROM = process.env.RESEND_FROM || "LEFIP <onboarding@resend.dev>";

function label(area?: string, assay?: string) {
  const a = area ? getArea(area) : undefined;
  const s = area && assay ? getAssay(area, assay) : undefined;
  return {
    areaLabel: a ? `${a.code} — ${a.name}` : area || "—",
    assayLabel: s ? s.name : assay || "—",
  };
}

export async function POST(request: Request) {
  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Server-side validation of required fields.
  if (!lead.nombre || !lead.empresa || !lead.email || !lead.area) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios." },
      { status: 422 },
    );
  }

  const { areaLabel, assayLabel } = label(lead.area, lead.ensayo);

  const lines = [
    `Nombre: ${lead.nombre}`,
    `Empresa / institución: ${lead.empresa}`,
    `Cargo: ${lead.cargo || "—"}`,
    `E-mail: ${lead.email}`,
    `Teléfono: ${lead.telefono || "—"}`,
    `Área: ${areaLabel}`,
    `Ensayo de interés: ${assayLabel}`,
    `Urgencia: ${lead.urgencia || "estándar"}`,
    `Cantidad aproximada: ${lead.cantidad || "—"}`,
    "",
    "Descripción de la muestra:",
    lead.muestra || "—",
    "",
    "Comentarios:",
    lead.comentarios || "—",
  ];
  const text = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || !TO) {
    // No delivery configured — keep the lead visible in server logs and succeed.
    console.warn(
      "[quote] RESEND_API_KEY or SERVICES_EMAIL not set — lead logged only:\n" +
        text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: lead.email,
        subject: `Cotización — ${areaLabel} (${lead.empresa})`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[quote] Resend error:", res.status, detail);
      return NextResponse.json(
        { error: "No se pudo enviar la consulta." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[quote] send failed:", err);
    return NextResponse.json(
      { error: "No se pudo enviar la consulta." },
      { status: 500 },
    );
  }
}
