# JobNest — Full-Stack Recruitment & Job Marketplace Platform

<!-- Replace this with a real screenshot of your home page -->
![JobNest Home Page](./screenshots/home.jpg)

**Live Site:** https://job-nest-rosy.vercel.app
**Client Repo:** https://github.com/mimdev14/JobNest
**Server Live API:** https://jobnes-server.vercel.app

---

## 1. Project Overview

JobNest is a full-stack recruitment platform connecting job seekers, recruiters, and platform administrators in one system. It handles the complete hiring lifecycle — job discovery, applications, candidate pipelines, company verification, and subscription billing — in a single, role-aware application.

## 2. Problem Statement

Most job boards solve only one half of the hiring problem: either helping seekers find jobs, or helping recruiters post them — rarely both well, and rarely with the workflow tooling (application tracking, candidate pipelines, company verification) that makes hiring actually manageable at scale. JobNest brings seekers, recruiters, and platform moderation together in one coherent product.

## 3. Features

### For Job Seekers
- Browse and filter jobs by keyword, category, location, type, experience level, remote/hybrid/on-site, and salary
- Server-side paginated search with URL-persisted filters
- Apply with a cover letter, track application status (Applied → Under Review → Shortlisted → Offered → Hired/Rejected)
- Save jobs, withdraw applications, build a profile (skills, experience, resume link)
- Subscription plans (Free / Pro / Premium) with usage limits enforced server-side

### For Recruiters
- Company registration with admin approval workflow
- Create, edit, publish, close, and reopen job listings
- View applicants per job, change application status, leave private candidate notes
- Visual candidate pipeline (Kanban-style, stage-by-stage)
- Subscription plans (Free / Growth / Enterprise) governing active job limits

### For Admins
- Manage users (role changes, suspend/activate)
- Approve, reject, or suspend companies
- Moderate and remove job listings
- Platform-wide stats overview

### Platform-wide
- Better Auth authentication (email/password + Google OAuth) paired with a custom JWT issued by the Express API and stored in an HTTP-only cookie, verified by server-side middleware for true server-side RBAC
- Stripe Checkout subscriptions with live webhook handling (payment success/failure, cancellation, renewal)
- Responsive design, loading/empty/error states, toast notifications, custom 404

## 4. User Roles
`SEEKER` · `RECRUITER` · `ADMIN` — enforced via server-side middleware on every protected route, not just hidden in the UI.

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Auth | Better Auth (client-hosted) + custom JWT (server-issued, HTTP-only cookie) |
| Payments | Stripe (Checkout + Webhooks) |
| Deployment | Vercel (client + server, server as a serverless function) |
| Icons | Lucide React |

## 6. Architecture

**Client (Next.js)**
- Hosts Better Auth — handles login, session, Google OAuth
- Calls Express server directly for all app data and for JWT issuance

**Server (Express)**
- Verifies the Better Auth session once via `/api/auth/sync`
- Issues its own JWT, stored as an HTTP-only cookie on the server's domain
- Every protected route: `authenticateUser` (verify JWT) → `requireRole(...)` (RBAC) → handler
- Talks to MongoDB Atlas for all reads/writes
- Talks to Stripe for Checkout sessions, and receives signed webhook events back

**Flow for a protected action (e.g. posting a job):**
1. Client sends request with `jobnest_token` cookie attached
2. Server verifies the JWT → confirms user is `RECRUITER`
3. Server checks company approval + subscription plan limits
4. Server writes to MongoDB, returns the result

## 7. Database Structure

Collections: `users`, `companies`, `jobs`, `applications`, `savedJobs`, `subscriptions`, `payments` (plus Better Auth's own `user`, `session`, `account`, `verification` collections, sharing the same database).

Key relationships:
- `jobs.recruiterId` / `jobs.companyId` → owning recruiter and company
- `applications.jobId` / `applications.seekerId` / `applications.recruiterId` → links a seeker's application to a specific job and its owning recruiter
- `subscriptions.userId` → current plan and Stripe identifiers per user

## 8. Authentication Flow

1. User registers/logs in via Better Auth (email/password or Google) on the client
2. On session change, the client calls the Express server's `/api/auth/sync` directly with the authenticated user's info
3. The server creates/updates the user record, issues a JWT, and sets it as an HTTP-only, secure cookie scoped to the server's own domain
4. Every protected API route verifies this JWT via `authenticateUser` middleware, then checks role via `requireRole(...)` for RBAC enforcement

## 9. API Overview

| Route | Purpose |
|---|---|
| `/api/auth/*` | User sync, current user, logout, role selection |
| `/api/users/*` | Admin user management |
| `/api/companies/*` | Company CRUD, admin approval |
| `/api/jobs/*` | Job CRUD, search/filter/pagination, admin moderation |
| `/api/applications/*` | Apply, withdraw, status changes, pipeline, notes |
| `/api/saved-jobs/*` | Save/unsave jobs |
| `/api/stats/*` | Role-specific dashboard stats, public platform stats |
| `/api/subscriptions/*` | Checkout session creation, current plan, payment history |
| `/api/webhook/stripe` | Stripe webhook handler (raw body, signature-verified) |

## 10. Stripe Integration

- Checkout Sessions created server-side per plan (seeker and recruiter plans are priced and limited independently)
- Webhook endpoint verifies Stripe's signature before processing any event
- Handles `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.deleted`, `customer.subscription.updated`
- Plan limits (applications/month for seekers, active jobs for recruiters) are enforced **server-side**, not just hidden in the UI

## 11. Security Considerations

- JWT stored in HTTP-only, secure (production), `SameSite=None` cookies — inaccessible to client-side JS
- All mutating routes protected by `authenticateUser` + `requireRole` middleware
- Ownership checks on update/delete routes (a recruiter can only edit their own jobs/companies; a seeker can only withdraw their own applications)
- Stripe webhook signature verification prevents spoofed payment events
- No secrets committed to the repo — all via environment variables

## 12. Installation

### Client
```bash
cd job-nest
npm install
npm run dev
```

### Server
```bash
cd jobnes-server
npm install
npm run dev
```

## 13. Environment Variables

**Client (`job-nest/.env`)**
MONGODB_URI=
MONGODB_DB=jobnest
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

**Server (`jobnes-server/.env`)**
MONGODB_URI=
MONGODB_DB=jobnest
JWT_SECRET=
JWT_EXPIRES_IN=7d
CLIENT_URL=
PORT=5000
NODE_ENV=production
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

## 14. Demo Credentials

> ⚠️ Replace with real, working demo accounts before submitting.

| Role | Email | Password |
|---|---|---|
| Admin | admin@jobnest.demo | *(set your own)* |
| Seeker | seeker@jobnest.demo | *(set your own)* |
| Recruiter | recruiter@jobnest.demo | *(set your own)* |

## 15. Deployment

Both client and server are deployed on Vercel. The server runs as a Vercel serverless function (see `api/index.js` + `vercel.json`); the client is a standard Next.js deployment. Stripe webhooks are registered against the live server URL via the Stripe Dashboard.

## 16. Future Improvements

- AI-powered job match scoring and AI-assisted job description generation
- Email notifications alongside in-app ones
- Recruiter talent search and seeker job alerts
- Admin audit log and revenue analytics charts
- Automated test coverage for core business logic

---
