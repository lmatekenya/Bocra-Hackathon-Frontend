# BOCRA Hackathon Frontend

Modernized BOCRA portal frontend built with Next.js and prepared for Firebase Hosting static deployment.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
```

Set backend URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://bocra-hackathon-backend-production.up.railway.app
NEXT_PUBLIC_SITE_URL=https://bocra-web.web.app
```

## Production build
```bash
npm run build
```

Static output is generated in `out/` for Firebase Hosting.

## Deployment automation
- Firebase workflow: `.github/workflows/firebase-deploy.yml`
- Hosting config: `firebase.json`
- GitHub Action secrets required:
  - `FIREBASE_SERVICE_ACCOUNT_BOCRA_WEB` (or `FIREBASE_SERVICE_ACCOUNT`)
  - optional: `NEXT_PUBLIC_API_URL` (defaults to `https://bocra-hackathon-backend-production.up.railway.app`)
  - optional: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Deploy target is classic Firebase Hosting (`bocra-web`), not Firebase App Hosting.
- Optional automation script: `scripts/set-github-secrets.ps1` (requires `gh auth login` first).

## Chatbot assistant
- A BOCRA Assistant chatbot is now available as a floating widget across the site.
- It answers general questions and links users to official BOCRA pages.
- Security controls include:
  - input length limits
  - client-side rate limiting
  - strict link sanitization to trusted domains/internal routes

## Documentation
See `docs/README.md` for:
- problem findings
- architecture/security summary
- deployment runbook
- screencast script
