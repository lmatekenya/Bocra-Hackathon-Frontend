# Deployment Runbook (Firebase + Railway)

## A) Frontend (this repository) -> Firebase Hosting

### 1. Required files already configured
- `next.config.mjs` uses static export (`output: "export"`).
- `firebase.json` points Hosting `public` to `out`.
- `.github/workflows/firebase-deploy.yml` builds and deploys on push to `main`.

### 2. GitHub secrets to add
- `FIREBASE_SERVICE_ACCOUNT_BOCRA_WEB` (preferred) or `FIREBASE_SERVICE_ACCOUNT`
  - value should be the full JSON service account content as a secret.
- `NEXT_PUBLIC_API_URL`
  - value should be your backend URL, for example `https://<railway-service>.up.railway.app`
- optional:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

### 3. Environment values
- create `.env.local` (or repo/environment secret) from `.env.example`
- set:
  - `NEXT_PUBLIC_API_URL=https://<your-railway-backend-domain>`

### 4. Manual first-time Firebase setup
- Authenticate Firebase CLI once locally.
- Ensure **Firebase Hosting** is initialized for this repo and project.
- Confirm `.firebaserc` default project id.
- Do not select **App Hosting** unless billing (Blaze plan) is enabled; this repo deploys as static Hosting.

## B) Backend (sibling backend repository) -> Railway

### 1. Required files configured in backend repo
- `Dockerfile`
- `docker-compose.yml` (local dev convenience)
- Flyway migrations:
  - `src/main/resources/db/migration/V1__initial_schema.sql`
  - `src/main/resources/db/migration/V2__seed_reference_data.sql`
- GitHub workflow:
  - `.github/workflows/railway-deploy.yml`

### 2. Railway environment variables
- `PORT=8083` (optional; Railway also injects `PORT`)
- `JDBC_DATABASE_URL=<railway postgres jdbc url>`
- `JDBC_DATABASE_USERNAME=<db username>`
- `JDBC_DATABASE_PASSWORD=<db password>`
- `APP_JWT_SECRET=<long random secret>`
- `APP_JWT_EXPIRATION_MS=3600000`
- `APP_CORS_ALLOWED_ORIGINS=https://<your-firebase-domain>`
- `APP_ADMIN_BOOTSTRAP_USERNAME=<initial admin username>`
- `APP_ADMIN_BOOTSTRAP_PASSWORD=<initial admin password>`

### 3. GitHub secret for workflow-triggered Railway deploy
- `RAILWAY_DEPLOY_HOOK_URL`
  - from Railway service deploy hook settings.

## C) Demo sanity checklist
- Frontend load works from Firebase URL.
- `GET /api/v1/news` and `GET /api/v1/stats` load from Railway backend.
- Admin login succeeds with bootstrap admin.
- Admin dashboard lists complaints from `/api/v1/admin/complaints`.
- `flyway_schema_history` table exists in PostgreSQL.
- No hardcoded localhost URLs remain in UI runtime paths.
