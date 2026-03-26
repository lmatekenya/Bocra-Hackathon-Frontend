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
NEXT_PUBLIC_API_URL=http://localhost:8083
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
  - `NEXT_PUBLIC_API_URL`
  - optional: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- Deploy target is classic Firebase Hosting (`bocra-web`), not Firebase App Hosting.

## Documentation
See `docs/README.md` for:
- problem findings
- architecture/security summary
- deployment runbook
- screencast script
