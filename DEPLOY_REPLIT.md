# Deploy on Replit

1. Create a GitHub repository and copy the contents of this folder into the repository root.
2. In Replit, create a new app from GitHub and select the repository.
3. Replit should detect `package.json`. If prompted for a run command, use:
   `npm run dev -- --hostname 0.0.0.0`
4. Add the secrets you want from `.env.example` in Replit Secrets.
5. Confirm the site renders in Preview.
6. Run the measurement benchmarks:
   `npm run test:measurement`
7. For deployment, the included `.replit` file uses:
   - build: `npm install && npm run build`
   - run: `npm run start`
8. After deployment is healthy, attach `copperheadoil.com` in Replit and update DNS as Replit instructs.

## Minimum secrets for a useful launch

The public site, calculators, TradingView ticker, GDELT news, Federal Register feed and Crossref technology feed work without paid API keys.

Add these when ready:

- `OPENAI_API_KEY` for real Contract Intelligence analysis
- `RESEND_API_KEY` for the contact form to email `info@copperheadoil.com`
- Supabase secrets before storing real producer accounts, contracts or confidential operating data

## Do not accept confidential producer data yet

The current account dashboard intentionally uses browser storage so the preview works immediately. Before real customers use accounts, connect Supabase, enable Row Level Security, configure private file storage and protect `/admin`.
