# CopperheadOil.com

Production-oriented Next.js build for Copperhead Oil Field Services. The visual system follows the approved Copperhead design: original logo, black and charcoal shell, metallic silver and warm white workspaces, copper and gold precision accents, cinematic oilfield imagery, and equal attention to desktop and mobile.

## What is included

- Full public corporate site
- M.A.R.G.I.N. framework
- Capabilities and service pages
- AI & Automation positioning and use cases
- Producer Desk
- Working Measurement Workbench
  - observed API + sample temperature correction to API @ 60 F
  - corrected API @ 60 F input path
  - LACT indicated volume, meter factor, CTL, optional CPL, GSV and NSV
  - field temperature estimation ranges and sensitivity
  - truck scale weight to standard volume
  - ticket comparison
- Contract Intelligence upload interface
  - OpenAI Responses API when `OPENAI_API_KEY` is configured
  - safe preview analysis when no key is present
- Copperhead Intelligence
  - TradingView energy ticker
  - GDELT live news discovery
  - Federal Register items
  - Crossref technology research
  - dedicated state pages
- Producer onboarding and browser-based demo Operating Profile
- Producer Dashboard with lease entry
- Contact form with optional Resend email delivery to `info@copperheadoil.com`
- Production PostgreSQL/Supabase schema
- Privacy, terms and technical disclaimer pages
- Replit deployment configuration

## Run locally or in Replit

```bash
npm install
npm run dev -- --hostname 0.0.0.0
```

Open the Replit web preview.

## Replit deployment

The included `.replit` file builds with `npm install && npm run build` and starts the standalone Next.js server with `npm run start`.

Set the deployment domain to `copperheadoil.com` after DNS is pointed to Replit.

## Secrets

Copy `.env.example` to Replit Secrets. The site renders without any secrets, but these enable production integrations:

- `OPENAI_API_KEY`: real Contract Intelligence document analysis
- `OPENAI_MODEL`: defaults to `gpt-5`
- `RESEND_API_KEY`: contact form email delivery
- `CONTACT_TO_EMAIL`: defaults to `info@copperheadoil.com`
- `EIA_API_KEY`: reserved for official EIA charts and structured market data expansion
- `CONGRESS_API_KEY`: reserved for federal legislation tracking
- `OPENSTATES_API_KEY`: reserved for normalized state legislation tracking
- `REGULATIONS_GOV_API_KEY`: reserved for federal docket and comment-period tracking
- Supabase values: production user accounts, tenant-isolated operating profiles, contracts, calculations and alerts

## Important production step: Supabase

The preview account experience intentionally stores a producer profile in the browser so the project works immediately in Replit without a database. Before accepting real producer data:

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Add Supabase secrets.
4. Replace the localStorage demo adapter with authenticated database reads and writes.
5. Enable Row Level Security and organization membership policies.
6. Configure private Storage buckets for contracts and producer documents.
7. Add audit logging, retention jobs and signed file URLs.

The database schema is already structured around Organization -> Field -> Lease -> Well / Facility -> Measurement Point.

## Measurement engine

Core math is in `lib/measurement.ts` so it can be tested independently from the interface.

The validated workflows include the benchmark values discussed during design. The public tool labels missing or estimated data instead of silently inventing values. Pressure correction is applied only when a CPL is supplied. Exact final custody-transfer settlement remains subject to the controlling contract, equipment configuration and applicable standards.

## Contract Intelligence

When `OPENAI_API_KEY` is set, `/api/contract-analyze` sends the uploaded file directly to the OpenAI Responses API as an input file and requests structured technical and commercial issue spotting. The model is instructed not to make legal conclusions.

The preview does not persist uploaded contracts. Production Contract Vault persistence should only be enabled after private object storage and organization-level permissions are configured.

## Live intelligence

`/api/intelligence` uses sources that can function without paid data subscriptions:

- GDELT Project for broad news discovery
- Federal Register API for federal rules and notices
- Crossref for technology and research metadata
- Official regulator links on each state page
- TradingView ticker for visual market quotes

Add EIA, Congress.gov, Open States and Regulations.gov keys to expand the structured feeds.

## Brand

Do not redraw or replace the Copperhead logo. The original supplied logo is in `public/brand/copperhead-logo-original.png`.

The transparent-background derivative keeps the supplied artwork intact and is used against the approved dark header.

See `IMAGE_CREDITS.md` for non-Copperhead imagery.

## Content style

Copperhead public copy should avoid generic AI writing habits. In particular:

- no em dashes
- avoid repetitive three-part constructions
- avoid generic AI vocabulary and inflated claims
- prefer specific petroleum operations language
- keep technical uncertainty visible
- use official source links for regulation and legislation

## Next production milestones

1. Connect Supabase Auth and persistence.
2. Add Contract Vault storage and retention jobs.
3. Add full EIA market cards and charts.
4. Add Congress.gov and Open States legislative trackers.
5. Add admin review workflow for Copperhead Intelligence summaries.
6. Add batch CSV measurement reconciliation.
7. Add saved tank / LACT / lease defaults from producer accounts.
8. Replace remote stock/public imagery with Copperhead-owned photography.
