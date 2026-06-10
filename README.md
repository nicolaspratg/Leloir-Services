# LEFIP — Sitio de servicios

Landing de servicios para **LEFIP** (Laboratorio de Estructura-Función e
Ingeniería de Proteínas, Fundación Instituto Leloir / CONICET). Su único objetivo
es derivar clientes de la industria a una solicitud de cotización personalizada.

Cuatro áreas de servicio — **BioAnalytix, RegAnalytics, MAbFactory, SpectroID** —
sobre una navegación de 3 niveles: Home → Área → Ficha de ensayo → Formulario.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS.

```bash
npm run dev     # desarrollo local (http://localhost:3000)
npm run build   # build de producción
npm run start   # servir el build
npm run lint    # ESLint
```

## Editar el contenido (sin tocar componentes)

`src/lib/content.ts` es la **única fuente de verdad**. Las 4 áreas y los ~24
ensayos son datos tipados; las páginas se generan desde 3 plantillas.

- **Agregar un ensayo:** añadí un objeto al array `assays` con su `areaSlug`.
  Su página L2, su entrada en el sitemap y su opción en el formulario aparecen
  automáticamente.
- **Agregar/editar un área:** editá el array `areas`. Cada área tiene `slug`,
  `code` (nombre de marca), `name`, `tagline`, `description`, `sectors[]` y un
  `accent` (color hex). MAbFactory además lleva `process[]` (timeline STAN-FIL).
- **Campos de la ficha opcionales** (equipamiento, muestra, normas, tiempo de
  respuesta): si no tienen valor, simplemente se omiten; la ficha solo renderiza
  los campos presentes, en orden fijo.

Textos institucionales (email, dirección, equipamiento, "¿Por qué LEFIP?") están
en `src/lib/site.ts`.

## Configuración (variables de entorno)

Copiá `.env.example` a `.env.local` y completá:

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base para metadata, sitemap y JSON-LD. |
| `NEXT_PUBLIC_SERVICES_EMAIL` | Inbox que recibe las cotizaciones. **TODO: confirmar** — el doc usaba `servicios@inis.org.ar` pero el lab está en Instituto Leloir. |
| `RESEND_API_KEY` + `RESEND_FROM` | Envío de email desde `/api/quote` vía Resend (requiere dominio verificado). |
| `NEXT_PUBLIC_FORMSPREE_ID` | Solo si usás el fallback sin backend (ver abajo). |

### Entrega de leads

El formulario hace `POST` a `/api/quote`, que envía el email vía la API HTTP de
Resend. **Si no hay `RESEND_API_KEY` configurada, el lead se registra en los logs
del servidor y la solicitud igual responde OK** (el formulario nunca se rompe),
pero no se entrega por email hasta configurar Resend.

**Fallback sin backend (mismo día):** si el DNS del dominio aún no está listo,
podés apuntar el `fetch` de `src/components/QuoteForm.tsx` a un endpoint de
[Formspree](https://formspree.io) en lugar de `/api/quote`. Funciona con export
estático y no requiere backend.

## Deploy

Recomendado: [Vercel](https://vercel.com). Importá el repo, cargá las variables
de entorno y deploy. El route handler `/api/quote` funciona en Vercel sin
configuración extra.

## Fuera de alcance (MVP)

Versión en inglés · formulario formal de pedido/orden · blog / notas técnicas ·
CMS · testimonios · listados de directorios · **mostrar precios** (la cotización
es siempre personalizada).

## Pendientes a confirmar con el cliente

- **Inbox de servicios:** placeholder `servicios@inis.org.ar` (ver `site.ts`).
- **Nombres de marca de las áreas** (BioAnalytix, etc.): confirmar si son visibles
  para clientes pharma/regulatorios o son etiquetas internas.
- **Sección de publicaciones / PubMed** y link a ResearchGate (fase 2).
