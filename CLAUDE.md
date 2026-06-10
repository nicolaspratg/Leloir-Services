@AGENTS.md

# CLAUDE.md — LEFIP Services Site

Project memory for Claude. Read this first. The original build plan lives in the brief folder one level up: `../steps_1.md`.

## What this is

A services landing page for **LEFIP** (Laboratorio de Estructura-Función e Ingeniería de Proteínas, Fundación Instituto Leloir / CONICET). Its single job: funnel industry clients to a personalized quote request. Four service areas — BioAnalytix, RegAnalytics, MAbFactory, SpectroID — across a 3-layer navigation (Home → Area → Assay sheet → Quote form).

## Stack & commands

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.
- `npm run dev` — local dev · `npm run build` — production build · `npm run lint`.
- Deploy: Vercel. Env (see `.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SERVICES_EMAIL`, plus `RESEND_API_KEY` + `RESEND_FROM` (or `NEXT_PUBLIC_FORMSPREE_ID` for the no-backend path).
- **Next 16 note:** `params` and `searchParams` are async (Promises) — `await` them. Type pages with the global `PageProps<'/route'>` helper. See `AGENTS.md`.

## Non-negotiables

- **No prices** anywhere on the public site. Quote is always personalized.
- **No auth, no login, no database.** Leads go to an inbox via the quote form.
- **Spanish-first.** All visible copy in Spanish. Keep strings in the data/content layer (`content.ts` / `site.ts`) so English can be added later — do NOT set up i18n routing now.
- **Copy tone: neutral, factual, technical.** No marketing fluff, no superlatives. The science speaks for itself.

## Content model — `src/lib/content.ts` is the source of truth

The 4 areas and ~24 assays are typed data. All pages render from 3 templates.
- **To add or edit a service, edit `content.ts` — never the templates.** Adding an assay object makes its L2 page, sitemap entry, and form dropdown option appear automatically.
- Each area has a `slug`, `code` (brand name), `name`, `tagline`, `description`, `sectors[]`, and an `accent` hex. MAbFactory also carries a `process[]` (STAN-FIL timeline).
- Each assay carries the ficha fields; optional fields are simply omitted.
- Institutional copy/config (services email, address, equipment, "¿Por qué LEFIP?", trust line, base URL) lives in `src/lib/site.ts`.

## Templates & components

- `app/page.tsx` — L0 home (hero, 2×2 area grid, "¿Por qué LEFIP?", equipment strip).
- `app/servicios/page.tsx` — area index.
- `app/servicios/[area]/page.tsx` — L1; renders `ProcessTimeline` when `area.process` exists.
- `app/servicios/[area]/[assay]/page.tsx` — L2; renders `<Ficha>` + `Service` JSON-LD.
- `app/contacto/page.tsx` — L3; renders `<QuoteForm>`, passing `defaultArea`/`defaultAssay` from `searchParams`.
- `app/api/quote/route.ts` — lead capture (Resend HTTP API).
- L1 and L2 use `generateStaticParams` driven by `content.ts`. Navbar/Footer are persistent in the root layout.

## Conventions

- **Ficha field order is fixed:** Nombre → Principio → ¿Para qué sirve? → Equipamiento → Requerimientos de muestra → Output → Normas y referencias → Tiempo de respuesta → CTA. Render only fields that have a value.
- **One accent color per area** (from `area.accent`); keep the rest of the palette quiet. Base navy `#1B3A5B` for nav/headings.
- Data-like ficha values (sample requirements, output, turnaround) render in monospace.
- **Only `h1` may hide on small screens.** All other text stays visible at every breakpoint.
- Persistent "Solicitar cotización" CTA in the navbar.
- Active-voice, sentence-case UI copy. A button's label matches its result ("Solicitar cotización" → "Consulta enviada").

## Quote form behavior

- Fields: nombre, empresa, cargo, email, teléfono, área (select), ensayo de interés (dependent select), descripción de la muestra, cantidad, urgencia, comentarios. Required: nombre, empresa, email, área.
- When reached from an L2 sheet (`?area=…&assay=…`), pre-fill and lock the area + assay.
- Posts to `/api/quote` → Resend HTTP API. If `RESEND_API_KEY` is unset, the lead is logged server-side and the request still succeeds (form never breaks). For a same-day no-backend launch, repoint the fetch at Formspree.
- Show the trust line above the form: "Respondemos todas las consultas en menos de 48 horas hábiles."

## SEO (keep it intact)

Per-page `metadata`; JSON-LD `Organization` on home and `Service` on each L2; `sitemap.ts` + `robots.ts` generated from `content.ts`. Target keywords: "servicios MALDI-TOF Argentina", "caracterización biofármacos Argentina", "anticuerpos monoclonales servicio CRO Argentina", "validación analítica biofármacos".

## Confirm with the client before relying on these

- **Services inbox:** the source doc used `servicios@inis.org.ar`, but the lab is at Instituto Leloir — placeholder in `NEXT_PUBLIC_SERVICES_EMAIL` (`TODO` in `site.ts`).
- **Branded area names** (BioAnalytix, etc.): confirm whether they should be visible to pharma/regulatory clients or kept as internal labels.
- **Production domain** for `NEXT_PUBLIC_SITE_URL`; **publications/PubMed** + ResearchGate link (phase 2).

## Out of scope (don't build; note in README)

English version · formal "Request Form" / order form · blog / technical notes · CMS · testimonials · directory listings · any price display.
