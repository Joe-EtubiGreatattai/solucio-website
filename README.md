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

- The `/book` appointment form is client-side validated only; it does not
  submit anywhere yet. Wiring a real submission (email or database) is a
  follow-up task.
- Real clinic photography lives in `public/images/`.
