# Solucio Clinic Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild solucioclinic.org as a clean, brand-consistent, multi-page Next.js site with the same content, deployable to Vercel.

**Architecture:** Next.js 15 App Router site, TypeScript, Tailwind CSS v4 for styling. Content (departments, facilities, team, FAQ, gallery, site config) lives in typed data modules under `lib/data/`. Shared `Header`/`Footer` wrap every route via the root layout. Each content type has one small presentational card component. No backend, no database, no auth — booking form is client-validated only (no submission wiring).

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/font` (Plus Jakarta Sans), `next/image` for all imagery.

## Global Constraints

- Brand palette only: sage/olive green primary + deep maroon accent + warm neutral backgrounds — no bootstrap-blue, no purple gradients, no unrelated reds/yellows (spec: Visual Direction).
- One type family site-wide (Plus Jakarta Sans) — no competing fonts (spec: Visual Direction).
- All content (departments, facilities, team, FAQ) in typed local data files under `lib/data/*.ts`, never hardcoded inline in JSX (spec: Components & Data).
- Multi-page routes as listed in spec: `/`, `/departments`, `/facilities`, `/team`, `/gallery`, `/faq`, `/book` (spec: Site Structure). No `/login` route.
- Booking form (`/book`) is client-side validated only — no backend submission, no email/DB wiring (spec: Scope).
- Mobile-first responsive; sticky header with logo, nav, "Book Appointment" CTA, and emergency phone number always visible (spec: Visual Direction).
- Use the clinic's real photography (staged at `assets-source/`) rather than stock imagery, wherever a facility/gallery image is needed.
- No automated test suite required; verification is `npm run build` succeeding plus `curl`-based content checks against `next dev` (spec: Testing / Verification).

---

## Source Assets (already staged, do not re-fetch)

Real clinic photos have already been downloaded to `assets-source/` at the project root:
- `assets-source/logo.png` — Solucio Clinic logo (green "S" + maroon wordmark, transparent background, 640x214).
- `assets-source/gallery/IMG-20251206-WA0000.jpg` through `WA0032.jpg`, and `WA0034.jpg` (33 photos), plus `so1.jpg`–`so7.jpg` (7 photos) — 40 total facility/ward/theatre photos, all 1280x853 or similar landscape JPEGs.
- `assets-source/team/ceo1.jpg`, `chief1.jpg`, `babagbemi.jpg`, `benjamin.jpg`, `helen.jpg`, `joseph.jpg` — leadership headshots (6 of 6 named team members; no separate photo exists for "Mrs. Joseph — Client Officer" beyond `joseph.jpg`, confirm mapping in Task 2).

Task 1 copies these into `public/images/`.

---

### Task 1: Scaffold Next.js project, Tailwind theme, fonts, and copy assets

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/globals.css`, `app/layout.tsx` (placeholder body, fleshed out in Task 4), `app/page.tsx` (placeholder), `.gitignore`
- Create (copy): `public/images/logo.png`, `public/images/gallery/*.jpg` (40 files), `public/images/team/*.jpg` (6 files)

**Interfaces:**
- Produces: Tailwind theme tokens `--color-primary-{50..900}`, `--color-accent-{50..900}`, `--color-warm-{50,100,900}` defined in `app/globals.css`, consumed by every component task via Tailwind utility classes (`bg-primary-600`, `text-accent-700`, etc.).
- Produces: `next/font` export `plusJakarta` from `app/layout.tsx` (font variable `--font-sans`), consumed by Task 4's root layout `<body>` class.

- [ ] **Step 1: Scaffold the app**

Run from the project root (`/Users/mac/Documents/solucio Clinic`):

```bash
npx --yes create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --no-turbopack --use-npm
```

If prompted about a non-empty directory (it contains `assets-source/` and `docs/`), confirm yes to proceed in the existing directory.

- [ ] **Step 2: Verify scaffold builds**

Run: `npm run build`
Expected: Build completes with the default Next.js starter page, exit code 0.

- [ ] **Step 3: Copy real assets into `public/`**

```bash
mkdir -p public/images/gallery public/images/team
cp assets-source/logo.png public/images/logo.png
cp assets-source/gallery/*.jpg public/images/gallery/
cp assets-source/team/*.jpg public/images/team/
```

Verify: `ls public/images/gallery | wc -l` prints `40`, `ls public/images/team | wc -l` prints `6`.

- [ ] **Step 4: Add the Plus Jakarta Sans font and brand color tokens**

Replace the contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif;

  --color-primary-50: #f4f7ec;
  --color-primary-100: #e6edd4;
  --color-primary-200: #cddaad;
  --color-primary-300: #aec37e;
  --color-primary-400: #93ad5c;
  --color-primary-500: #74923e;
  --color-primary-600: #5a7530;
  --color-primary-700: #465c27;
  --color-primary-800: #394a21;
  --color-primary-900: #2f3d1d;

  --color-accent-50: #fbebec;
  --color-accent-100: #f3c9cb;
  --color-accent-200: #e2969a;
  --color-accent-300: #c96269;
  --color-accent-400: #a83a41;
  --color-accent-500: #7a1f24;
  --color-accent-600: #5a0f0f;
  --color-accent-700: #470c0c;
  --color-accent-800: #350909;
  --color-accent-900: #240606;

  --color-warm-50: #faf8f3;
  --color-warm-100: #f3efe4;
  --color-warm-900: #23241f;
}

body {
  background-color: var(--color-warm-50);
  color: var(--color-warm-900);
}
```

- [ ] **Step 5: Wire the font in the root layout**

Edit `app/layout.tsx` so it contains exactly:

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Solucio Clinic — Solutions for Your Wellbeing",
  description:
    "Solucio Clinic provides comprehensive, compassionate healthcare and specialist surgical services in a modern, patient-centered facility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify build still passes**

Run: `npm run build`
Expected: Exit code 0, no type errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Next.js app with Tailwind brand theme and real clinic assets"
```

---

### Task 2: Content data layer

**Files:**
- Create: `lib/data/site.ts`
- Create: `lib/data/departments.ts`
- Create: `lib/data/facilities.ts`
- Create: `lib/data/team.ts`
- Create: `lib/data/faq.ts`
- Create: `lib/data/gallery.ts`
- Test: none (pure data modules; validated by `tsc` via `npm run build` and by pages that import them in later tasks)

**Interfaces:**
- Produces `lib/data/site.ts`: `export const site = { name, tagline, phoneEmergency, phoneEmergencyHref, whatsappHref, outreachPhone, navLinks: {label, href}[] }`
- Produces `lib/data/departments.ts`: `export type Department = { slug: string; name: string; summary: string; services: string[] }`, `export const departments: Department[]`
- Produces `lib/data/facilities.ts`: `export type Facility = { slug: string; name: string; description: string; image: string }`, `export const facilities: Facility[]`
- Produces `lib/data/team.ts`: `export type TeamMember = { name: string; title: string; description: string; image: string }`, `export const team: TeamMember[]`
- Produces `lib/data/faq.ts`: `export type FaqItem = { question: string; answer: string }`, `export const faq: FaqItem[]`
- Produces `lib/data/gallery.ts`: `export const galleryImages: string[]` (paths under `/images/gallery/`)

- [ ] **Step 1: Create `lib/data/site.ts`**

```ts
export const site = {
  name: "Solucio Clinic",
  tagline: "Solutions for your wellbeing",
  mission: "Ministering to God through our services to man.",
  vision:
    "Delivering exceptional healthcare services that makes us the preferred choice.",
  strategy:
    "Expert care, delivered with kindness, in a serene and refreshing environment.",
  phoneEmergency: "0706 681 9213",
  phoneEmergencyHref: "tel:07066819213",
  whatsappHref: "https://wa.me/2347066819213",
  outreachPhone: "0805 370 7353",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Departments", href: "/departments" },
    { label: "Facilities", href: "/facilities" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
  ],
};
```

- [ ] **Step 2: Create `lib/data/departments.ts`**

```ts
export type Department = {
  slug: string;
  name: string;
  summary: string;
  services: string[];
};

export const departments: Department[] = [
  {
    slug: "general-surgery",
    name: "General Surgery",
    summary:
      "Our General Surgery unit is manned by Consultants with the West African College of Surgeons' Fellowship. Two of them have further interests in Breast and Thyroid Surgeries among others.",
    services: [],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    summary:
      "Our Ophthalmology unit is manned by consultant Ophthalmologists who are fellows of both the National and West African Colleges of Surgeons.",
    services: [
      "Cataract surgery",
      "Surgery for Glaucoma (Trabeculectomy)",
      "Pterygium surgery (with or without autograft)",
      "Ptosis surgery, lid reconstruction and repairs",
      "Cosmetic facial reconstructive surgeries",
      "Refraction and optical services, including contact lens",
      "Visual Field Assessment (CVF)",
      "Pachymetry",
      "Ocular scan",
      "Fundus photography",
      "OCT — Optical Coherence Tomography",
      "Tonometry",
    ],
  },
  {
    slug: "pediatric-surgery",
    name: "Pediatric Surgery",
    summary:
      "Our Pediatric Surgery unit is manned by a Consultant Pediatric Surgeon, Fellow of the West African College of Surgeons, with special interest in Hypospadias surgery.",
    services: [
      "Laparotomy for acute abdominal conditions e.g. intussusception",
      "Surgery for ano-rectal malformations",
      "Surgery for hernias and hydroceles",
      "Surgery for undescended testes",
      "Circumcision — primary and re-do",
    ],
  },
  {
    slug: "anesthesia",
    name: "Anesthesia",
    summary:
      "We are equipped for full general (with endotracheal intubation, face mask etc) and regional anesthesia. Our general anesthesia for major surgeries is always superintended by a consultant anesthesiologist.",
    services: [],
  },
  {
    slug: "plastic-surgery",
    name: "Plastic Surgery",
    summary: "Manned by a Fellow of the West African College of Surgeons.",
    services: [
      "Wound care and skin grafting for diabetic foot (co-managed with the orthopedic surgeon and the endocrinologist)",
      "Orbital and facial tumor excision and grafting (co-managed with the ophthalmologist)",
    ],
  },
  {
    slug: "neurosurgery",
    name: "Neurosurgery",
    summary: "Manned by a Fellow of the West African College of Surgeons.",
    services: [
      "Ventriculo-peritoneal (VP) shunt",
      "Repair of spina bifida",
    ],
  },
  {
    slug: "urology",
    name: "Urology",
    summary:
      "Manned by a highly experienced Consultant Urologist with a deep passion for Men's Health and extensive expertise in managing a wide range of general urological conditions.",
    services: [
      "Suprapubic cystostomy",
      "Prostate biopsy",
      "Nephrectomy",
      "Diagnostic cystoscopy",
      "Open prostatectomy",
      "Orchiectomy",
      "Orchidopexy",
      "Varicocelectomy",
    ],
  },
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    summary:
      "Manned by Fellows of the West African College of Surgeons with special interest in laparoscopic surgery.",
    services: [
      "Booked antenatal clinic (by special arrangement)",
      "Consultations, counselling",
      "Elective caesarean sections",
      "Couples counselling",
      "Fertility evaluation",
      "Laparoscopic gynecologic tumor excision",
      "Open hysterectomy / Myomectomy",
    ],
  },
  {
    slug: "ent",
    name: "E.N.T.",
    summary:
      "Ear, Nose & Throat — manned by a visiting Professor of ENT with special competence in endoscopic ENT surgery.",
    services: [
      "Booked consultation",
      "Endoscopic sinus surgery with bilateral polypectomy",
      "Adenotonsillectomy",
    ],
  },
  {
    slug: "orthopedic-surgery",
    name: "Orthopedic Surgery",
    summary: "Manned by a Fellow of the National Postgraduate College of Surgeons.",
    services: [],
  },
];
```

- [ ] **Step 3: Create `lib/data/facilities.ts`**

```ts
export type Facility = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export const facilities: Facility[] = [
  {
    slug: "emergency-ward",
    name: "Emergency Ward",
    description: "Two-bedded semi-private emergency facility.",
    image: "/images/gallery/IMG-20251206-WA0005.jpg",
  },
  {
    slug: "male-ward",
    name: "Male Ward",
    description: "Comfortable semi-private ward for male patients.",
    image: "/images/gallery/IMG-20251206-WA0007.jpg",
  },
  {
    slug: "female-ward",
    name: "Female Ward",
    description: "Dedicated semi-private ward for female patients.",
    image: "/images/gallery/IMG-20251206-WA0009.jpg",
  },
  {
    slug: "private-rooms",
    name: "Private Rooms",
    description: "3 single-bedded rooms with full utility services.",
    image: "/images/gallery/IMG-20251206-WA0000.jpg",
  },
  {
    slug: "vip-suite",
    name: "VIP Suite",
    description: "2 rooms, kitchenette and sit-out balcony.",
    image: "/images/gallery/IMG-20251206-WA0011.jpg",
  },
  {
    slug: "operating-theatres",
    name: "Operating Theatres",
    description: "Twin modern theatre suites.",
    image: "/images/gallery/IMG-20251206-WA0013.jpg",
  },
  {
    slug: "laboratory",
    name: "Laboratory",
    description: "Fully equipped diagnostic laboratory.",
    image: "/images/gallery/IMG-20251206-WA0016.jpg",
  },
  {
    slug: "reception-areas",
    name: "Reception Areas",
    description: "General & private reception lounges.",
    image: "/images/gallery/IMG-20251206-WA0018.jpg",
  },
  {
    slug: "guest-house",
    name: "Guest House",
    description: "Comfortable lodging for relatives.",
    image: "/images/gallery/IMG-20251206-WA0020.jpg",
  },
  {
    slug: "elevator-facility",
    name: "Elevator Facility",
    description: "Easy mobility with lift access.",
    image: "/images/gallery/IMG-20251206-WA0022.jpg",
  },
];
```

- [ ] **Step 4: Create `lib/data/team.ts`**

```ts
export type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
};

export const team: TeamMember[] = [
  {
    name: "Dr. (Mrs.) Abimbola Odi",
    title: "Chief Medical Director",
    description:
      "Oversees all medical departments with a focus on clinical excellence and patient safety.",
    image: "/images/team/ceo1.jpg",
  },
  {
    name: "Dr. Temitope Odi",
    title: "Managing Director",
    description:
      "Provides strategic direction and ensures alignment with Solucio Clinic's mission.",
    image: "/images/team/chief1.jpg",
  },
  {
    name: "Mrs. Babagbemi",
    title: "Accounting Officer",
    description: "Manages budgets, reporting, and financial compliance for Solucio Clinic.",
    image: "/images/team/babagbemi.jpg",
  },
  {
    name: "Mrs. Benjamin",
    title: "HMO Desk Officer",
    description: "Coordinates insurance and patient care authorizations.",
    image: "/images/team/benjamin.jpg",
  },
  {
    name: "Mrs. Joseph",
    title: "Client Officer",
    description: "Ensures personalized and professional patient interaction.",
    image: "/images/team/joseph.jpg",
  },
  {
    name: "Miss Helen",
    title: "Nursing Officer",
    description: "Provides compassionate bedside care for patients.",
    image: "/images/team/helen.jpg",
  },
];
```

- [ ] **Step 5: Create `lib/data/faq.ts`**

```ts
export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "What services does Solucio Clinic provide?",
    answer:
      "Solucio Clinic provides comprehensive medical care including general checkups, specialized treatments, emergency services, diagnostics, and wellness programs tailored to your health needs.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment easily through our online booking system or by calling our reception. We offer flexible scheduling to suit your convenience.",
  },
  {
    question: "Is Solucio Clinic open 24/7?",
    answer:
      "Our emergency services are available 24/7. General consultation and routine appointments are available during regular clinic hours, Monday to Saturday.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major insurance plans. Please contact our reception with your insurance details to confirm coverage and benefits.",
  },
  {
    question: "How do I contact Solucio Clinic in an emergency?",
    answer:
      "For emergencies, call our 24/7 hotline at 0706 681 9213 immediately, message us on WhatsApp, or visit the nearest emergency department.",
  },
  {
    question: "Do you offer HMO services?",
    answer:
      "Yes, we do. We provide services to HMOs such as Leadway, Axa-Mansard, Bastion, Indigo, among others.",
  },
  {
    question: "Do you do circumcision?",
    answer: "Yes, we do. Performed by a Pediatric Surgeon.",
  },
  {
    question: "Do you do comprehensive health checks?",
    answer:
      "Yes, we do. We have a package for a wellness check. The process: you will be asked medical and non-medical questions for the records, and have body measurements (weight and height) taken. Necessary samples will be taken for investigation. You will be booked to see the Consultant Ophthalmologist for your eye examination, the Consultant Radiologist for your abdominopelvic ultrasound scan, and the Consultant Physician for your general examination and review of laboratory results (± Pap smear test). Once all results are in, you will be reviewed and counselled by the Consultant Physician regarding the overall findings, specific findings, whether further investigation or treatment is needed, and suggested follow-up frequency.",
  },
  {
    question: "Do you do eye surgeries?",
    answer:
      "Yes, we do. Our consultant ophthalmologist performs anterior segment eye surgeries such as Cataract extraction and Trabeculectomy, and oculoplastic surgeries like Squint repair, Ptosis surgery, and Lid and Orbital surgeries.",
  },
  {
    question: "Do you do laparoscopic surgeries?",
    answer: "Yes, we do — Gynecologic laparoscopic surgeries and endoscopic ENT surgeries.",
  },
  {
    question: "Do you do hypospadias surgeries?",
    answer:
      "Yes. We have a pediatric surgeon with a special interest in the management of hypospadias.",
  },
  {
    question:
      "Do you organize medical and surgical outreaches for individuals or groups?",
    answer:
      "Yes, we do. You may contact us on 0805 370 7353 for booking arrangements.",
  },
  {
    question: "Do you run routine antenatal and delivery services?",
    answer: "No, we don't.",
  },
];
```

- [ ] **Step 6: Create `lib/data/gallery.ts`**

```ts
const waNumbers = [
  "0000", "0001", "0002", "0003", "0004", "0005", "0006", "0007", "0008",
  "0009", "0010", "0011", "0012", "0013", "0014", "0015", "0016", "0017",
  "0018", "0019", "0020", "0021", "0022", "0023", "0024", "0025", "0026",
  "0027", "0028", "0029", "0030", "0031", "0032", "0034",
];

const soNumbers = ["1", "2", "3", "4", "5", "6", "7"];

export const galleryImages: string[] = [
  ...waNumbers.map((n) => `/images/gallery/IMG-20251206-WA${n}.jpg`),
  ...soNumbers.map((n) => `/images/gallery/so${n}.jpg`),
];
```

- [ ] **Step 7: Verify with build**

Run: `npm run build`
Expected: Exit code 0 (data files are unused so far but must type-check cleanly).

- [ ] **Step 8: Commit**

```bash
git add lib/data
git commit -m "Add typed content data layer for departments, facilities, team, FAQ, gallery"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `components/Container.tsx`
- Create: `components/SectionHeading.tsx`
- Create: `components/CtaBanner.tsx`

**Interfaces:**
- Consumes: `site` from `lib/data/site.ts` (Task 2) in `CtaBanner`.
- Produces: `Container({ children, className? })`, `SectionHeading({ eyebrow?, title, description? })`, `CtaBanner()` — all consumed by every page task (4–11).

- [ ] **Step 1: Create `components/Container.tsx`**

```tsx
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/SectionHeading.tsx`**

```tsx
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass} mb-10`}>
      {eyebrow ? (
        <span className="inline-block rounded-full bg-accent-50 px-4 py-1 text-sm font-semibold text-accent-700 mb-3">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-bold text-primary-900">{title}</h2>
      {description ? (
        <p className="mt-4 text-warm-900/70 text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/CtaBanner.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function CtaBanner() {
  return (
    <section className="bg-primary-800 py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to visit Solucio Clinic?
        </h2>
        <p className="mt-3 text-primary-100 text-lg">
          Book an appointment online, or call our 24/7 emergency line for
          urgent care.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book"
            className="rounded-full bg-white px-6 py-3 font-semibold text-primary-800 hover:bg-primary-50 transition-colors"
          >
            Book Appointment
          </Link>
          <a
            href={site.phoneEmergencyHref}
            className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Call {site.phoneEmergency}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify with build**

Run: `npm run build`
Expected: Exit code 0.

- [ ] **Step 5: Commit**

```bash
git add components/Container.tsx components/SectionHeading.tsx components/CtaBanner.tsx
git commit -m "Add shared Container, SectionHeading, CtaBanner primitives"
```

---

### Task 4: Header, Footer, and root layout wiring

**Files:**
- Create: `components/Header.tsx`
- Create: `components/Footer.tsx`
- Modify: `app/layout.tsx` (render `Header`/`Footer` around `children`)

**Interfaces:**
- Consumes: `site` from `lib/data/site.ts` (Task 2); `Container` from `components/Container.tsx` (Task 3).
- Produces: `Header` and `Footer` components rendered on every route via `app/layout.tsx`.

- [ ] **Step 1: Create `components/Header.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-50/90 backdrop-blur border-b border-primary-100">
      <div className="bg-accent-700 text-white text-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
          <span className="hidden sm:inline">
            24/7 Emergency: {site.phoneEmergency}
          </span>
          <a
            href={site.phoneEmergencyHref}
            className="font-semibold underline underline-offset-2 sm:no-underline sm:font-normal"
          >
            Call now
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={160}
              height={54}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {site.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-warm-900/80 hover:text-primary-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/book"
              className="rounded-full bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary-200 text-primary-800"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-primary-100 bg-warm-50">
          <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
            {site.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-warm-900/80 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="rounded-full bg-primary-700 px-5 py-2.5 font-semibold text-white text-center"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-white">{site.name}</h3>
          <p className="mt-3 text-sm text-primary-200">{site.tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            <li>
              <a href={site.phoneEmergencyHref} className="hover:text-white">
                Emergency: {site.phoneEmergency}
              </a>
            </li>
            <li>
              <a href={site.whatsappHref} className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>Outreach bookings: {site.outreachPhone}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Hours</h4>
          <p className="text-sm text-primary-200">
            Emergency care: 24/7
            <br />
            General consultation: Monday – Saturday
          </p>
        </div>
      </div>

      <div className="border-t border-primary-800 py-6 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire Header/Footer into the root layout**

Edit `app/layout.tsx` — replace the `<body>` contents from Task 1's Step 5 with:

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Solucio Clinic — Solutions for Your Wellbeing",
  description:
    "Solucio Clinic provides comprehensive, compassionate healthcare and specialist surgical services in a modern, patient-centered facility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify build and dev render**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/ | grep -o "Solucio Clinic" | head -1`
Expected: prints `Solucio Clinic`. Kill the dev server afterward (`kill %1` or find/kill the node process on port 3000).

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/Footer.tsx app/layout.tsx
git commit -m "Add sticky Header with mobile nav and Footer, wire into root layout"
```

---

### Task 5: Home page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site` (Task 2), `departments` (Task 2), `facilities` (Task 2), `Container`/`SectionHeading`/`CtaBanner` (Task 3).
- Produces: home route `/` content — no exports consumed by later tasks.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import { site } from "@/lib/data/site";
import { departments } from "@/lib/data/departments";
import { facilities } from "@/lib/data/facilities";

const featuredDepartmentSlugs = ["ophthalmology", "general-surgery", "pediatric-surgery"];
const featuredDepartments = departments.filter((d) =>
  featuredDepartmentSlugs.includes(d.slug)
);
const featuredFacilities = facilities.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-50">
        <Container className="py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-accent-50 px-4 py-1 text-sm font-semibold text-accent-700 mb-5">
              {site.tagline}
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-900 leading-tight">
              Your Health is Our Mission
            </h1>
            <p className="mt-6 text-lg text-warm-900/70 leading-relaxed">
              Whether it&apos;s routine consultation or urgent care, Solucio
              Clinic provides reliable, friendly, and professional healthcare
              you can trust — combining modern medical practice with
              genuinely personalized care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800 transition-colors"
              >
                Book Appointment
              </Link>
              <a
                href={site.phoneEmergencyHref}
                className="rounded-full border border-primary-700 px-6 py-3 font-semibold text-primary-800 hover:bg-primary-100 transition-colors"
              >
                Call {site.phoneEmergency}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/gallery/IMG-20251206-WA0013.jpg"
              alt="Solucio Clinic operating theatre"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Advanced Healthcare & Ophthalmology"
            description="We specialize in general healthcare and ophthalmology, offering advanced diagnostic tools and expert consultations to improve your health outcomes."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDepartments.map((dept) => (
              <div
                key={dept.slug}
                className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary-900">{dept.name}</h3>
                <p className="mt-3 text-warm-900/70 leading-relaxed">{dept.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/departments"
              className="font-semibold text-primary-700 hover:text-primary-900"
            >
              View all departments →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-primary-50">
        <Container>
          <SectionHeading
            eyebrow="Why choose us"
            title="Care built around you"
          />
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-lg text-primary-900">24/7 Emergency Care</h3>
              <p className="mt-2 text-warm-900/70">
                Our emergency team is available around the clock to provide
                immediate medical attention, day or night.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-lg text-primary-900">Easy Online Booking</h3>
              <p className="mt-2 text-warm-900/70">
                Skip the long queues — schedule visits, reschedule, or check
                availability anytime, anywhere.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-bold text-lg text-primary-900">Expert Medical Team</h3>
              <p className="mt-2 text-warm-900/70">
                Highly qualified doctors, nurses, and specialists combining
                experience with empathy for every patient.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Facilities"
            title="Our World-Class Facilities"
            description="We combine comfort, technology, and precision healthcare to give our patients a safe and premium clinical environment."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFacilities.map((facility) => (
              <div key={facility.slug} className="rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-primary-900">{facility.name}</h3>
                  <p className="mt-1 text-sm text-warm-900/70">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/facilities"
              className="font-semibold text-primary-700 hover:text-primary-900"
            >
              View all facilities →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-accent-50">
        <Container>
          <SectionHeading
            eyebrow="Our purpose"
            title="Mission, Vision & Strategy"
          />
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-bold text-accent-700">Our Mission</h3>
              <p className="mt-2 text-warm-900/70">{site.mission}</p>
            </div>
            <div>
              <h3 className="font-bold text-accent-700">Our Vision</h3>
              <p className="mt-2 text-warm-900/70">{site.vision}</p>
            </div>
            <div>
              <h3 className="font-bold text-accent-700">Our Strategy</h3>
              <p className="mt-2 text-warm-900/70">{site.strategy}</p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 2: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/ | grep -o "Your Health is Our Mission"`
Expected: prints the matched string. Stop the dev server afterward.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Build home page with hero, departments teaser, facilities teaser, mission/vision"
```

---

### Task 6: Departments page

**Files:**
- Create: `components/DepartmentCard.tsx`
- Create: `app/departments/page.tsx`

**Interfaces:**
- Consumes: `departments`/`Department` (Task 2), `Container`/`SectionHeading`/`CtaBanner` (Task 3).
- Produces: `DepartmentCard({ department: Department })`, route `/departments`.

- [ ] **Step 1: Create `components/DepartmentCard.tsx`**

```tsx
import type { Department } from "@/lib/data/departments";

export default function DepartmentCard({ department }: { department: Department }) {
  return (
    <article className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-primary-900">{department.name}</h3>
      <p className="mt-3 text-warm-900/70 leading-relaxed">{department.summary}</p>
      {department.services.length > 0 ? (
        <ul className="mt-4 grid gap-1.5 text-sm text-warm-900/80 list-disc list-inside">
          {department.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
```

- [ ] **Step 2: Create `app/departments/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import DepartmentCard from "@/components/DepartmentCard";
import { departments } from "@/lib/data/departments";

export const metadata: Metadata = {
  title: "Departments — Solucio Clinic",
  description:
    "Explore Solucio Clinic's specialist departments, from Ophthalmology and General Surgery to Neurosurgery and Obstetrics & Gynaecology.",
};

export default function DepartmentsPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="Featured Departments"
            description="Solucio Clinic offers specialized medical services led by experienced consultants and supported by skilled healthcare professionals, ensuring the highest standards of care."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((department) => (
              <DepartmentCard key={department.slug} department={department} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/departments | grep -o "Ophthalmology" | head -1`
Expected: prints `Ophthalmology`. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add components/DepartmentCard.tsx app/departments/page.tsx
git commit -m "Add departments listing page"
```

---

### Task 7: Facilities page

**Files:**
- Create: `components/FacilityCard.tsx`
- Create: `app/facilities/page.tsx`

**Interfaces:**
- Consumes: `facilities`/`Facility` (Task 2), `Container`/`SectionHeading`/`CtaBanner` (Task 3).
- Produces: `FacilityCard({ facility: Facility })`, route `/facilities`.

- [ ] **Step 1: Create `components/FacilityCard.tsx`**

```tsx
import Image from "next/image";
import type { Facility } from "@/lib/data/facilities";

export default function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <article className="rounded-2xl overflow-hidden border border-primary-100 bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image src={facility.image} alt={facility.name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary-900">{facility.name}</h3>
        <p className="mt-1 text-sm text-warm-900/70">{facility.description}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `app/facilities/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import FacilityCard from "@/components/FacilityCard";
import { facilities } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facilities — Solucio Clinic",
  description:
    "Take a look at Solucio Clinic's wards, private rooms, operating theatres, laboratory, and guest facilities.",
};

export default function FacilitiesPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Facilities"
            title="Our World-Class Facilities"
            description="At Solucio Clinic, we combine comfort, technology, and precision healthcare to give our patients a safe and premium clinical environment."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
              <FacilityCard key={facility.slug} facility={facility} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/facilities | grep -o "VIP Suite" | head -1`
Expected: prints `VIP Suite`. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add components/FacilityCard.tsx app/facilities/page.tsx
git commit -m "Add facilities listing page"
```

---

### Task 8: Team page

**Files:**
- Create: `components/TeamMemberCard.tsx`
- Create: `app/team/page.tsx`

**Interfaces:**
- Consumes: `team`/`TeamMember` (Task 2), `Container`/`SectionHeading`/`CtaBanner` (Task 3).
- Produces: `TeamMemberCard({ member: TeamMember })`, route `/team`.

- [ ] **Step 1: Create `components/TeamMemberCard.tsx`**

```tsx
import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-primary-100">
        <Image src={member.image} alt={member.name} fill className="object-cover" />
      </div>
      <h3 className="mt-4 font-bold text-primary-900">{member.name}</h3>
      <p className="text-accent-700 font-semibold text-sm">{member.title}</p>
      <p className="mt-2 text-sm text-warm-900/70">{member.description}</p>
    </article>
  );
}
```

- [ ] **Step 2: Create `app/team/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import TeamMemberCard from "@/components/TeamMemberCard";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team — Solucio Clinic",
  description:
    "Meet the leadership team behind Solucio Clinic's medical excellence, strategic vision, and compassionate care.",
};

export default function TeamPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Solucio Clinic Leadership"
            title="Our Management Team"
            description="Our leadership combines medical excellence, strategic vision, and compassionate care to ensure world-class healthcare delivery and a trusted patient experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/team | grep -o "Chief Medical Director" | head -1`
Expected: prints `Chief Medical Director`. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add components/TeamMemberCard.tsx app/team/page.tsx
git commit -m "Add team page"
```

---

### Task 9: Gallery page

**Files:**
- Create: `app/gallery/page.tsx`

**Interfaces:**
- Consumes: `galleryImages` (Task 2), `Container`/`SectionHeading` (Task 3).
- Produces: route `/gallery`.

- [ ] **Step 1: Create `app/gallery/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — Solucio Clinic",
  description:
    "Step inside Solucio Clinic — where compassion, technology, and care come together to create healthier lives.",
};

export default function GalleryPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Gallery"
          title="Step inside Solucio Clinic"
          description="Where compassion, technology, and care come together to create healthier lives."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={src}
                alt="Solucio Clinic facility"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/gallery | grep -o "Step inside Solucio Clinic" | head -1`
Expected: prints the matched string. Stop the dev server afterward.

- [ ] **Step 3: Commit**

```bash
git add app/gallery/page.tsx
git commit -m "Add gallery page"
```

---

### Task 10: FAQ page

**Files:**
- Create: `components/FaqAccordion.tsx`
- Create: `app/faq/page.tsx`

**Interfaces:**
- Consumes: `faq`/`FaqItem` (Task 2), `Container`/`SectionHeading`/`CtaBanner` (Task 3).
- Produces: `FaqAccordion({ items: FaqItem[] })`, route `/faq`.

- [ ] **Step 1: Create `components/FaqAccordion.tsx`**

```tsx
"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/data/faq";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-primary-100 rounded-2xl border border-primary-100 bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-primary-900">{item.question}</span>
              <span className="text-primary-700 text-xl leading-none">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="px-6 pb-5 text-warm-900/70 leading-relaxed">{item.answer}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/faq/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import FaqAccordion from "@/components/FaqAccordion";
import { faq } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ — Solucio Clinic",
  description:
    "Find answers to the most common questions about Solucio Clinic's services, appointments, and care.",
};

export default function FaqPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Have a question?"
            description="Find answers to the most common questions about our services, appointments, and care at Solucio Clinic."
          />
          <FaqAccordion items={faq} />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
```

- [ ] **Step 3: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/faq | grep -o "Do you accept insurance" | head -1`
Expected: prints the matched string. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add components/FaqAccordion.tsx app/faq/page.tsx
git commit -m "Add FAQ page with accordion"
```

---

### Task 11: Book Appointment page

**Files:**
- Create: `components/BookingForm.tsx`
- Create: `app/book/page.tsx`

**Interfaces:**
- Consumes: `departments` (Task 2), `Container`/`SectionHeading` (Task 3).
- Produces: `BookingForm()`, route `/book`. No backend submission (per Global Constraints) — on valid submit, shows an inline confirmation message only.

- [ ] **Step 1: Create `components/BookingForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { departments } from "@/lib/data/departments";

const timeSlots = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 4PM)",
  "Evening (4PM - 8PM)",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center">
        <h3 className="text-xl font-bold text-primary-900">
          Thank you — your request has been received
        </h3>
        <p className="mt-3 text-warm-900/70">
          You will receive a confirmation email shortly after booking. If your
          need is urgent, please call our 24/7 emergency line instead.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="space-y-8 rounded-2xl border border-primary-100 bg-white p-6 sm:p-8 shadow-sm"
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-primary-900 mb-2">
          Patient Information
        </legend>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-warm-900 mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-900 mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-warm-900 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-primary-900 mb-2">
          Appointment Details
        </legend>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-warm-900 mb-1">
            Department *
          </label>
          <select
            id="department"
            name="department"
            required
            defaultValue=""
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="" disabled>
              -- Select Department --
            </option>
            {departments.map((department) => (
              <option key={department.slug} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-warm-900 mb-1">
              Preferred Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-warm-900 mb-1">
              Preferred Time *
            </label>
            <select
              id="time"
              name="time"
              required
              defaultValue=""
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="" disabled>
                -- Select Time --
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-warm-900 mb-1">
            Reason for Visit *
          </label>
          <textarea
            id="reason"
            name="reason"
            required
            rows={4}
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800 transition-colors"
      >
        Book Appointment
      </button>
      <p className="text-center text-sm text-warm-900/60">
        You will receive a confirmation email shortly after booking.
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Create `app/book/page.tsx`**

```tsx
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Appointment — Solucio Clinic",
  description: "Book an appointment at Solucio Clinic in a few simple steps.",
};

export default function BookPage() {
  return (
    <section className="py-16 lg:py-20 bg-primary-50">
      <Container className="max-w-2xl">
        <SectionHeading eyebrow="Appointments" title="Book an Appointment" />
        <BookingForm />
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Verify build and content**

Run: `npm run build`
Expected: Exit code 0.

Run: `npm run dev &` then `sleep 3 && curl -s http://localhost:3000/book | grep -o "Book an Appointment" | head -1`
Expected: prints the matched string. Stop the dev server afterward.

- [ ] **Step 4: Commit**

```bash
git add components/BookingForm.tsx app/book/page.tsx
git commit -m "Add booking appointment page with client-validated form"
```

---

### Task 12: Final responsive QA and cleanup

**Files:**
- Modify: any of `app/**`, `components/**` if QA finds issues
- Create: `README.md`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new — this task is verification and light polish only.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: Exit code 0, all 7 routes (`/`, `/departments`, `/facilities`, `/team`, `/gallery`, `/faq`, `/book`) listed in the build output as static/prerendered.

- [ ] **Step 2: Smoke-test every route returns 200**

```bash
npm run start &
sleep 3
for path in / /departments /facilities /team /gallery /faq /book; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$path")
  echo "$path -> $code"
done
kill %1
```

Expected: every path prints `200`.

- [ ] **Step 3: Manually check responsive breakpoints**

Run `npm run dev`, open `http://localhost:3000` in a browser, and check at minimum:
- Mobile width (~375px): hamburger menu opens/closes, hero stacks vertically, no horizontal scroll on any page.
- Desktop width (~1440px): nav shows inline, gallery grid shows 4 columns, department cards show 2 columns.

Fix any overflow/wrapping issues found directly in the relevant component's Tailwind classes.

- [ ] **Step 4: Create `README.md`**

```markdown
# Solucio Clinic Website

Next.js (App Router) rebuild of the Solucio Clinic website.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

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
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "Final QA pass, responsive fixes, and README"
```

---

## Self-Review Notes

- Spec coverage: all 7 routes, brand palette, single font family, shared Header/Footer, typed data layer, client-only booking form, and real photography are each covered by a dedicated task above.
- `Login` nav item from the old site intentionally omitted per spec's "Out of scope" note; `site.navLinks` in Task 2 has no login entry.
- All data/type names (`Department`, `Facility`, `TeamMember`, `FaqItem`, `site`, `galleryImages`) are used consistently with the same shape across every task that consumes them.
