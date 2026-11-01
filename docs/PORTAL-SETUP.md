# Client and admin workspace upgrade

This is an extension of RealAppTesters/testflight-testers on branch `feature/client-admin-dashboards`. No production deployment, credentials change, database migration or real email has been performed by this branch.

## Inspection and minimal-change plan

The original repository uses Next.js 16.3.5 App Router and React 19. There was no auth, persistent database, private file storage or email provider. `/api/orders` logged browser data; the webhook used an in-memory array, accepted unverified events and exposed orders through an unauthenticated GET. Checkout pricing is $10/tester/hour plus $0/$2/$5 per tester for standard/priority/express. The success page uses browser session storage and provides WhatsApp/email contact options.

New source is isolated in `lib/portal/`, `components/Portal*`, `app/portal.css`, `app/dashboard/`, `app/admin/`, `app/api/portal/`, auth routes, `supabase/migrations/`, public editorial routes and `app/editorial.css`. Existing changes are limited to server checkout integration, verification endpoints, one success-page dashboard link, navigation/footer links, sitemap and compatible dependency fixes. The homepage, calculator, service pages and global stylesheet are unchanged.

## Required configuration before release

Use a **separate staging Supabase project and PayPal sandbox first**. Do not run this migration against an unknown/shared database without reviewing it. Do not switch the live checkout until the complete staging test passes.

Server environment variables (never expose service keys through NEXT_PUBLIC):

- `APP_URL`: exact origin, e.g. `https://www.testflighttesters.com` (no trailing slash). Local testing uses `http://127.0.0.1:3000`.
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- `PAYPAL_ENVIRONMENT`: `sandbox` or `live`; defaults safely to sandbox unless explicitly `live`.
- `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MERCHANT_ID`, `PAYPAL_WEBHOOK_ID`. Server client ID must identify the same app as the **existing** `NEXT_PUBLIC_PAYPAL_CLIENT_ID`. Preserve live values.
- `TEST_CREDENTIALS_KEY`: 64 hex characters representing a random 32-byte encryption key. Keep a secure backup; losing it makes stored test credentials unreadable. Rotation needs an explicit re-encryption plan.
- `RESEND_API_KEY`, `EMAIL_FROM`: a verified sender on your domain.
- `NOTIFICATION_JOB_SECRET`: a random secret for the email retry worker.

1. Apply `supabase/migrations/202611010001_portal.sql` to staging. It enables RLS and revokes direct customer access to portal tables/functions. All portal requests validate the authenticated user server-side. The service role is server-only.
2. In Supabase Auth, configure the site origin and `/auth/confirm` redirect. Enable passwordless email login, single-use link expiry, provider rate limits and custom SMTP. Use this magic-link email template URL: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}`. Configure the site URL to match APP_URL. Do not use an implicit fragment-token template: this app consumes a token hash on the server and sets an HttpOnly cookie. Sessions expire after at most one hour; there is no persistent refresh-token cookie.
3. Sign in to create your admin auth user. A trusted database operator must explicitly insert its UUID into `public.admin_roles`. Customer signup cannot grant an admin role.
4. Confirm bucket `qa-reports` is private, with the PDF/20 MB restrictions from the migration. Do not add public object policies.
5. Configure PayPal webhook events `PAYMENT.CAPTURE.COMPLETED` and `PAYMENT.CAPTURE.REFUNDED` at `/api/webhooks/paypal`, using the matching environment and webhook ID. Approval alone never creates a paid order.
6. Schedule an authenticated **POST** to `/api/notifications/process` every few minutes with `Authorization: Bearer <NOTIFICATION_JOB_SECRET>`. The payment handler attempts dispatch when Resend is configured; this job handles retries and messages/reports. Configure the scheduler in the existing hosting provider; this branch does not assume or change providers.
7. Monitor failed email rows. Jobs use locked claims, provider idempotency keys and a maximum of five exponential-backoff attempts. `accepted` means accepted by Resend, not delivered to the inbox. There is no email delivery webhook in this version. If a provider accepts a request but the database write fails, retries use the same key; reconcile manually if the provider's idempotency retention window has elapsed. Never blindly reset old jobs.
8. Confirm the deployment gateway replaces untrusted forwarded-IP headers before relying on the checkout IP limiter. Email login is also limited by hashed email; authenticated operations by validated user ID. Supabase Auth has its own provider rate limits.

## Payment cutover and historical order

The same calculator and PayPal button UI remain. Orders are now created server-side, bound to persisted testing configuration, and verified against captured amount, currency and merchant. A captured payment that cannot be synchronized displays the PayPal reference and tells the customer not to pay again. Webhook retries can finish synchronization. A database outage before checkout starts fails closed instead of accepting an unrecorded new order.

Payments made through the old browser-only checkout cannot be reconstructed reliably from source code or the success page. **The existing $75 customer order has not been retrieved, imported, changed or fabricated.** Reconcile it using authenticated PayPal transaction details and the original purchased scope. Do not infer hours/testers from the amount or associate it with an unverified submitted email. An existing payment without the new persisted intent is flagged for manual reconciliation.

## Validation and release gate

- `npm test`: API authorization/payment tests and embedded PostgreSQL migration/transaction tests.
- `npm run typecheck`.
- `npm run build:webpack`: production build used here because Turbopack's CSS worker port binding is denied by this environment. The untouched original `npm run build` showed the same issue. The normal build script is retained for the real hosting environment.
- `/demo` and `/demo?view=admin`: isolated, labeled design previews. Demo records are module-local and never seeded into a database.

Before approving production, run sandbox end-to-end: purchase → capture verification → one stored order and two notifications → login link → owner-only order → app submission → admin assignment/status → PDF upload without email → preview → explicit delivery confirmation → queued/accepted email → customer private PDF access. Repeat webhook events, underpaid/foreign-merchant events, partial/full refunds, cross-customer URLs, expired links, invalid/oversized uploads and email provider failures. Verify mobile navigation and all original SEO/payment routes. No live payment was made during development.

Roll out only with explicit owner approval, the staging checks above, provider configuration and a verified backup. No automated production deployment is included.
