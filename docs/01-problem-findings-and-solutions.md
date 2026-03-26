# BOCRA Hackathon: Findings and Technical Solutions

## 1) Core problems identified
- Homepage looked visually busy and inconsistent with a government-grade digital portal.
- Many placeholder links (`#`) reduced trust and made key flows feel incomplete.
- Frontend admin auth used hardcoded URLs and `localStorage` token persistence.
- Backend lacked an actual login endpoint expected by frontend.
- JWT filter parsed token but did not establish authenticated security context.
- Sensitive admin data flow (`/admin/complaints`) was missing backend implementation.
- Database setup used mutable JPA auto schema updates (`ddl-auto: update`) with no formal migrations.
- Deployment paths for Firebase and Railway were not automated for push-based delivery.

## 2) What we changed
- Rebuilt the homepage into a cleaner, more executive layout with focused sections and stronger CTA hierarchy.
- Replaced placeholder links with working routes across homepage and footer navigation.
- Centralized frontend API usage in `lib/api.ts` with environment-based backend URL and robust error handling.
- Switched admin session storage from `localStorage` to `sessionStorage` to reduce token persistence risk.
- Implemented backend authentication endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
  - `POST /api/v1/auth/logout`
- Added secured admin route:
  - `GET /api/v1/admin/complaints`
- Hardened JWT enforcement so authenticated requests populate Spring Security context with role authorities.
- Added strict role checks in Spring Security for admin routes and write endpoints.
- Migrated backend persistence strategy to PostgreSQL + Flyway:
  - `V1__initial_schema.sql`
  - `V2__seed_reference_data.sql`
- Added Docker + `docker-compose.yml` to standardize backend runtime for local and Railway-like environments.
- Added GitHub Actions workflows for both frontend and backend deploy pipelines.

## 3) Why this is stronger for judging/demo
- End-to-end admin flow now matches real API contracts (no mocked auth gap).
- Data model is versioned and reproducible via migrations.
- Security story is demonstrable: JWT auth, role-gated admin APIs, stricter headers/CORS, safer token storage.
- Deployment path is now presentation-ready: push-to-deploy workflows configured with secret placeholders.
