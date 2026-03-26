# Architecture and Security Notes

## Architecture
- Frontend: Next.js (App Router), static export build output for Firebase Hosting.
- Backend: Spring Boot REST API (JWT auth, role-based authorization).
- Database: PostgreSQL, managed schema with Flyway migrations.
- Hosting:
  - Frontend: Firebase Hosting
  - Backend: Railway (Dockerized)

## Authentication model
- Admin login returns JWT token from `POST /api/v1/auth/login`.
- Frontend stores admin session in `sessionStorage` (tab/session scoped).
- Authenticated admin calls send `Authorization: Bearer <token>`.
- Backend JWT filter validates token and maps role claim to `ROLE_*`.

## Authorization model
- Public endpoints:
  - news, tenders, stats, documents, complaint submission/status, inquiries, cyber incident submission, search
- Protected endpoints:
  - `/api/v1/admin/**` requires `ROLE_ADMIN`
  - `POST /api/v1/news`, `POST /api/v1/tenders`, `POST /api/v1/documents` require `ROLE_ADMIN`
  - `/api/v1/auth/me`, `/api/v1/auth/logout` require authentication

## Key security controls added
- Removed hardcoded API hosts from admin pages.
- Replaced persistent `localStorage` token usage with `sessionStorage`.
- Enforced JWT-based `SecurityContext` population in backend filter.
- Added stricter Spring Security headers and stateless session policy.
- Added CORS allow-list via environment variable:
  - `APP_CORS_ALLOWED_ORIGINS`
- Added structured global exception handling with safer server error responses.
- Added Firebase hosting security headers (`X-Frame-Options`, `X-Content-Type-Options`, CSP, etc.).

## Remaining recommendations (post-hackathon hardening)
- Use refresh token rotation with HttpOnly secure cookies and short-lived access tokens.
- Add login rate limiting and account lockout policy.
- Add audit trail table for admin actions.
- Move bootstrap admin credentials to dedicated secret manager and rotate immediately after first deploy.
- Add integration tests for auth and migration validation in CI.
