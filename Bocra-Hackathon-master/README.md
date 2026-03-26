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

## Documentation
See `docs/README.md` for:
- problem findings
- architecture/security summary
- deployment runbook
- screencast script
