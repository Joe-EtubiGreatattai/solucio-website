# Solucio Clinic Website

Next.js (App Router) rebuild of the Solucio Clinic website.

## Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Content

All site content (departments, facilities, team, FAQ, gallery, contact
info) lives in `lib/data/*.ts` — edit those files to update copy without
touching component/layout code.

## Notes

- Real clinic photography lives in `public/images/`.

## Online bookings (backend)

The site has its own backend (Next.js route handlers in `app/api/`), storing data in MongoDB.

- **`/book`** saves the request and gives the patient a reference like `BK-2026-00001`.
  Checks: valid phone and email, a real department, Monday–Saturday, within 6 months.
  A hidden field catches bots, and each connection can send 5 requests per 15 minutes.
- **`/book/status`** lets a patient check their request with the reference and their phone number.
- **`/desk`** redirects staff to the EMR's **Reception → Online appointments** queue. Website requests keep
  their booking reference and status page; reception manages the queue using their EMR sign-in.
- **Email** (optional): with SMTP set up, the patient gets a receipt, a confirmation or a cancellation,
  and `CLINIC_EMAIL` gets an alert for each new request.

### Where it runs

The backend runs on the Solucio server (`192.3.161.239`) as `solucio-website-api` (port 5104, behind nginx at
`https://solucio-website.techtree.lifestyle/api`), with data in the server's MongoDB (`solucio_website`).
Its settings are in `/var/www/solucio-website-api/.env` on the server (EMR integration key and email settings).

The website itself stays on Vercel. `BOOKING_API_ORIGIN` (Vercel environment variable, and `.env.local`
for local work) sends every `/api` request to the server, so the site never holds database or desk secrets.

Update the server after committing: `deploy/deploy-api.sh`.

Tests: `npm test` (needs a local MongoDB for the storage tests).
