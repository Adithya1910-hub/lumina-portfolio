# Lumina Portfolio

Personal portfolio site built with TanStack Start, React, and Tailwind CSS. Deployed on Cloudflare Workers.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Deploy (GitHub + Cloudflare)

1. **GitHub** — Push this repo to GitHub (`main` branch).
2. **Cloudflare** — Create a [Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens) with **Workers Scripts: Edit** permission.
3. **GitHub secrets** — In the repo: **Settings → Secrets and variables → Actions**, add:
   - `CLOUDFLARE_API_TOKEN` — your API token
   - `CLOUDFLARE_ACCOUNT_ID` — from [Cloudflare dashboard](https://dash.cloudflare.com/) (right sidebar on any zone/account page)
4. Push to `main` (or run the **Deploy to Cloudflare** workflow manually). The site will be live at `https://lumina-portfolio.<your-subdomain>.workers.dev`.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
