import type { Metadata } from "next";
import { fullAddress, site } from "@/lib/data/site";
import { departments } from "@/lib/data/departments";
import type { FaqItem } from "@/lib/data/faq";

const BASE = site.url.replace(/\/$/, "");
const DEFAULT_OG = "/images/gallery/IMG-20251206-WA0013.jpg";

/** Build page metadata with a canonical URL, Open Graph and Twitter cards. */
export function pageMeta({
  title,
  description,
  path = "/",
  keywords,
  image = DEFAULT_OG,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${BASE}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    keywords: keywords ?? site.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_NG",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name}, a hospital in ${site.city}, ${site.region}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const sameAs = Object.values(site.social).filter(Boolean);

const postalAddress = {
  "@type": "PostalAddress",
  ...(site.streetAddress ? { streetAddress: site.streetAddress } : {}),
  addressLocality: site.city,
  addressRegion: site.region,
  ...(site.postalCode ? { postalCode: site.postalCode } : {}),
  addressCountry: site.countryCode,
};

const openingHours = site.hours.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days.map((d) => ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" }[d])),
  opens: h.opens,
  closes: h.closes,
}));

/** schema.org Hospital — the core local-SEO signal (name, address, phone, hours, specialties, area). */
export function hospitalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${BASE}/#hospital`,
    name: site.name,
    alternateName: `${site.name} ${site.city}`,
    description: `${site.name} is a consultant-led private hospital in ${site.city}, ${site.region}, Nigeria, offering specialist surgery, ophthalmology, obstetrics & gynaecology, and 24-hour emergency care.`,
    url: BASE,
    telephone: site.phoneIntl,
    ...(site.email ? { email: site.email } : {}),
    image: `${BASE}${DEFAULT_OG}`,
    logo: `${BASE}${DEFAULT_OG}`,
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapUrl,
    openingHoursSpecification: openingHours,
    availableService: departments.map((d) => ({ "@type": "MedicalProcedure", name: d.name })),
    medicalSpecialty: departments.map((d) => d.name),
    areaServed: [
      { "@type": "City", name: site.city },
      { "@type": "AdministrativeArea", name: site.region },
    ],
    ...(sameAs.length ? { sameAs } : {}),
    availableLanguage: ["en"],
  };
}

/** schema.org WebSite — ties the pages together under one site entity. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: site.name,
    url: BASE,
    inLanguage: "en-NG",
    publisher: { "@id": `${BASE}/#hospital` },
  };
}

/** schema.org FAQPage — can earn an expandable rich result under the listing. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** schema.org BreadcrumbList for a page's trail. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

export { fullAddress };
