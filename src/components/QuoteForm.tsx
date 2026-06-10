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
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-lg font-semibold text-emerald-900">Consulta enviada</h2>
        <p className="mt-1 text-sm text-emerald-800">
          Recibimos tu solicitud. Respondemos en menos de 48&nbsp;horas hábiles.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-400";
  const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600">
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
        <p className="text-sm text-red-600">
          {required
            ? "No pudimos enviar la consulta. Probá de nuevo o escribinos al e-mail de servicios."
            : "Completá los campos obligatorios (*) antes de enviar."}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-md bg-[#1B3A5B] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando…" : "Solicitar cotización"}
      </button>
    </div>
  );
}
