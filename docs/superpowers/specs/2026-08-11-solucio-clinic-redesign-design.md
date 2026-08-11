# Solucio Clinic Website Redesign — Design Spec

Date: 2026-08-11

## Background

Solucio Clinic (solucioclinic.org) is a multi-specialty clinic (ophthalmology,
general/pediatric/plastic/neuro surgery, urology, obstetrics & gynaecology,
ENT, orthopedics) based in Nigeria. The current live site is a Bootstrap
template with inconsistent, clashing visual styling (bootstrap-blue buttons,
purple gradient CTAs, ad-hoc reds/yellows in inline styles) that ignores the
clinic's actual brand identity — an olive-green + deep maroon logo with the
tagline "solutions for your wellbeing." Content itself (departments,
facilities, team, FAQ, gallery) is solid; the presentation is not.

Goal: rebuild the site as a clean, professional, brand-consistent Next.js app
with the same informational content, deployed on Vercel.

## Scope

- Full coded, production-ready website (not a mockup).
- Same content/sections as the current site — no cutting, no fabricated new
  copy beyond minor clarity edits are in scope only if obviously needed.
- Multi-page structure (separate routes), replacing the current single long
  scroll.
- Booking form is UI-only in this phase: client-side validated, no backend
  submission/email wiring.
- Out of scope: CMS, authentication/login, HMO/payment integration, backend
  form submission, analytics.

## Visual Direction

- Palette derived from the actual Solucio logo: deep olive/sage green as
  primary, deep maroon as accent, warm off-white/neutral backgrounds. No
  bootstrap-blue, no purple gradients, no unrelated reds/yellows.
- One warm humanist sans-serif type family across the site (e.g. Inter or
  Plus Jakarta Sans), with a heavier weight for headings — no competing
  fonts.
- Real photography from the clinic's own gallery assets where available
  (rooms, wards, theatres) rather than generic stock imagery.
- Consistent rounded-corner card system, soft shadows, generous whitespace —
  replacing the current heavy box-shadows/gradients.
- Mobile-first responsive layout with a hamburger nav drawer on small
  screens; sticky header with logo, nav, "Book Appointment" CTA, and the
  24/7 emergency phone number always visible.

## Site Structure (routes)

- `/` — Home: hero w/ mission tagline + CTAs (Book Appointment, Call
  emergency line), services overview teaser, why-choose-us (24/7 emergency,
  expert team, easy booking), facilities teaser, mission/vision/strategy,
  bottom CTA banner.
- `/departments` — all department entries (General Surgery, Ophthalmology,
  Pediatric Surgery, Anesthesia, Plastic Surgery, Neurosurgery, Urology,
  Obstetrics & Gynaecology, ENT, Orthopedic Surgery) with their services
  lists, as expandable/detailed cards.
- `/facilities` — facility grid (Emergency Ward, Male Ward, Female Ward,
  Private Rooms, VIP Suite, Operating Theatres, Laboratory, Reception
  Areas, Guest House, Elevator Facility), linking into gallery images.
- `/team` — leadership team grid (name, title, description per person).
- `/gallery` — photo grid using existing gallery images, plus a video
  section placeholder.
- `/faq` — accordion with existing Q&A content, including the wellness
  check "process" detail list.
- `/book` — appointment form (full name, email, phone, department, date,
  time, reason for visit), client-side validated only.

`Login` (present in the current nav) is dropped unless the client confirms
it's an active, used feature.

## Components & Data

- Shared `Header` (logo, nav links, mobile drawer, CTA button, emergency
  number) and `Footer` (contact info, hours, emergency hotline, socials,
  copyright) used across all pages.
- Content (departments, facilities, team members, FAQ entries) lives in
  typed local data files under `lib/data/*.ts`, not hardcoded inline in
  JSX — so copy can be edited later without touching layout/component code.
- Reusable card/section components: `DepartmentCard`, `FacilityCard`,
  `TeamMemberCard`, `FaqAccordion`, `SectionHeading`, `CtaBanner`.

## Testing / Verification

- No automated test suite planned (marketing/content site, no business
  logic beyond form validation). Verification is visual: run the dev
  server and check each route renders correctly, is responsive at mobile/
  tablet/desktop widths, and that the booking form validates required
  fields before "submission" (which is a no-op / confirmation message
  only in this phase).
