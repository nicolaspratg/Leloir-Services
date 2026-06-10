// src/components/QuoteForm.tsx
// L3 lead capture form. Client component.
// Pre-fills + locks the assay-of-interest when arriving from an L2 sheet
// (pass defaultArea / defaultAssay from the page via searchParams).
// NOTE: adjust the import path below if your scaffold doesn't use the "@/" alias.

"use client";

import { useMemo, useState } from "react";
import { areas, getAssaysByArea } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm({
  defaultArea = "",
  defaultAssay = "",
}: {
  defaultArea?: string;
  defaultAssay?: string;
}) {
  // If we arrived from a specific assay sheet, lock that selection.
  const lockedFromAssay = Boolean(defaultArea && defaultAssay);

  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    cargo: "",
    email: "",
    telefono: "",
    area: defaultArea,
    ensayo: defaultAssay,
    muestra: "",
    cantidad: "",
    urgencia: "estandar",
    comentarios: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  // Assay dropdown depends on the chosen area.
  const assayOptions = useMemo(
    () => (form.area ? getAssaysByArea(form.area) : []),
    [form.area],
  );

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => {
      // Changing the area resets the assay selection.
      if (key === "area") return { ...f, area: value, ensayo: "" };
      return { ...f, [key]: value };
    });
  }

  const required = form.nombre && form.empresa && form.email && form.area;

  async function handleSubmit() {
    if (!required) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      // Posts to a Next route handler (Resend) — see steps.md §3.
      // For a no-backend launch, point this at a Formspree endpoint instead.
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="reveal rounded-[3px] border border-line bg-paper-2/60 p-7"
        style={{ borderTop: "2px solid #0E7C7B" }}
      >
        <span className="label-mono text-[#0E7C7B]">Consulta enviada</span>
        <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight text-navy">
          Recibimos tu solicitud
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Respondemos en menos de 48&nbsp;horas hábiles.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-[3px] border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/15 disabled:bg-paper-2 disabled:text-ink-faint";
  const label = "label-mono mb-1.5 block text-ink-faint";

  return (
    <div className="space-y-5">
      <p className="rounded-[3px] border-l-2 border-navy bg-paper-2/60 px-3.5 py-2.5 text-sm text-ink-soft">
        Respondemos todas las consultas en menos de 48&nbsp;horas hábiles.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Nombre*</label>
          <input className={field} value={form.nombre} onChange={(e) => update("nombre", e.target.value)} />
        </div>
        <div>
          <label className={label}>Empresa / institución*</label>
          <input className={field} value={form.empresa} onChange={(e) => update("empresa", e.target.value)} />
        </div>
        <div>
          <label className={label}>Cargo</label>
          <input className={field} value={form.cargo} onChange={(e) => update("cargo", e.target.value)} />
        </div>
        <div>
          <label className={label}>E-mail*</label>
          <input type="email" className={field} value={form.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <label className={label}>Teléfono</label>
          <input className={field} value={form.telefono} onChange={(e) => update("telefono", e.target.value)} />
        </div>
        <div>
          <label className={label}>Urgencia</label>
          <select className={field} value={form.urgencia} onChange={(e) => update("urgencia", e.target.value)}>
            <option value="estandar">Estándar</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Área de servicio*</label>
          <select
            className={field}
            value={form.area}
            disabled={lockedFromAssay}
            onChange={(e) => update("area", e.target.value)}
          >
            <option value="">Seleccionar…</option>
            {areas.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.code} — {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Ensayo de interés</label>
          <select
            className={field}
            value={form.ensayo}
            disabled={lockedFromAssay || !form.area}
            onChange={(e) => update("ensayo", e.target.value)}
          >
            <option value="">{form.area ? "Seleccionar…" : "Elegí un área primero"}</option>
            {assayOptions.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Descripción de la muestra</label>
        <textarea
          rows={3}
          className={field}
          value={form.muestra}
          onChange={(e) => update("muestra", e.target.value)}
          placeholder="Tipo de muestra, matriz, condiciones de envío…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Cantidad aproximada</label>
          <input className={field} value={form.cantidad} onChange={(e) => update("cantidad", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={label}>Comentarios</label>
        <textarea
          rows={3}
          className={field}
          value={form.comentarios}
          onChange={(e) => update("comentarios", e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="rounded-[3px] border-l-2 border-red-500 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          {required
            ? "No pudimos enviar la consulta. Probá de nuevo o escribinos al e-mail de servicios."
            : "Completá los campos obligatorios (*) antes de enviar."}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-2 rounded-[3px] bg-navy px-6 py-3 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(20,32,46,0.18)] transition-all hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(20,32,46,0.22)] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
      >
        {status === "submitting" ? "Enviando…" : "Solicitar cotización"}
        {status !== "submitting" && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        )}
      </button>
    </div>
  );
}
