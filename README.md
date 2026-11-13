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
- **`/desk`** is the front desk (not linked from the site, hidden from search engines). Staff sign in with
  `DESK_PASSWORD` and see new, contacted, confirmed, completed and cancelled requests, with call and
  WhatsApp buttons, notes and a history of who did what.
- **Email** (optional): with SMTP set up, the patient gets a receipt, a confirmation or a cancellation,
  and `CLINIC_EMAIL` gets an alert for each new request.

Settings are in `.env.example`. Copy it to `.env.local` for local work, and add the same names in
Vercel → Project → Settings → Environment Variables for the live site. `MONGODB_URI`, `DESK_PASSWORD`
and `DESK_SECRET` are required.

Tests: `npm test` (needs a local MongoDB for the storage tests).
