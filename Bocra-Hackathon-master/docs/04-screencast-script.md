# Screencast Script (3-5 minutes)

## 1) Problem statement (30-45s)
- BOCRA public service portal needed a more professional UX and stronger production security.
- Existing gaps included placeholder links, incomplete admin auth flow, and no migration-based database governance.

## 2) Frontend walkthrough (60-90s)
- Show the redesigned homepage:
  - cleaner hero
  - mandate pillars
  - quick actions, metrics, and news
- Click through working links (complaints, cybersecurity, tenders, documents).
- Highlight removal of dead-end `#` links and improved navigation credibility.

## 3) Admin and security walkthrough (60-90s)
- Open admin login.
- Log in with configured admin credentials.
- Show dashboard loading protected complaints endpoint.
- Mention security controls:
  - JWT auth
  - role-based route protection
  - session-scoped token storage
  - strict hosting/API headers and CORS allow-list

## 4) Backend + database (45-60s)
- Show Flyway migration files:
  - schema (`V1`)
  - seed data (`V2`)
- Show Dockerfile and Railway workflow.
- Explain that first deployment auto-applies migrations and bootstraps admin user.

## 5) CI/CD close (30-45s)
- Show GitHub Actions:
  - frontend Firebase deploy workflow
  - backend Railway deploy workflow
- Summarize impact:
  - better trust and UX
  - stronger security posture
  - reproducible deployments and data lifecycle
