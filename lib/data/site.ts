export const site = {
  name: "Solucio Clinic",
  // Shown to search engines and in the local pack. "Hospital" + the city is what people search for.
  legalName: "Solucio Clinic",
  seoName: "Solucio Clinic — Hospital in Lokoja, Kogi State",
  tagline: "Solutions for your wellbeing",
  mission: "Ministering to God through our services to man.",
  vision:
    "Delivering exceptional healthcare services that makes us the preferred choice.",
  strategy:
    "Expert care, delivered with kindness, in a serene and refreshing environment.",

  // --- Canonical web address (used for metadata, sitemap, structured data) ---
  url: "https://solucio-website.vercel.app",

  // --- Location / NAP (Name, Address, Phone). Keep this IDENTICAL everywhere online. ---
  // TODO: replace streetAddress and geo with the exact values, then keep them in lock-step with
  // your Google Business Profile — matching address/phone is the single biggest local-ranking factor.
  city: "Lokoja",
  region: "Kogi State",
  regionCode: "KO",
  country: "Nigeria",
  countryCode: "NG",
  streetAddress: "Ankuri Layout, Lokongoma Housing Estate, Kabba Road, opposite Phase 2",
  postalCode: "",
  geo: { lat: 7.7999819, lng: 6.7077727 }, // exact clinic coordinates from Google Maps
  mapUrl: "https://www.google.com/maps/place/Solucio+clinic/@7.7999819,6.7077727,17z/data=!4m6!3m5!1s0x104f5fb5824b3a3f:0xfe7e9bb7154f0b91",

  phoneEmergency: "0706 681 9213",
  phoneEmergencyHref: "tel:07066819213",
  phoneIntl: "+2347066819213",
  whatsappHref: "https://wa.me/2347066819213",
  outreachPhone: "0805 370 7353",
  email: "", // add a public contact email if you have one (helps trust + schema)

  hours: [
    { label: "Emergency ward", detail: "Open 24 hours, every day", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], opens: "00:00", closes: "23:59" },
    { label: "Consultations", detail: "Monday–Saturday · 8am–8pm", days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "08:00", closes: "20:00" },
  ],

  // Phrases real patients type into Google. Used across titles, descriptions and keywords.
  keywords: [
    "hospital in Lokoja",
    "best hospital in Lokoja",
    "Lokoja hospital",
    "clinic in Lokoja",
    "private hospital Lokoja Kogi State",
    "specialist hospital Lokoja",
    "surgery in Lokoja",
    "ophthalmology Lokoja",
    "obstetrics and gynaecology Lokoja",
    "emergency hospital Lokoja",
    "24 hour hospital Lokoja",
    "Solucio Clinic",
  ],

  // Social profiles — add real URLs; they strengthen the knowledge graph via sameAs
  social: {
    facebook: "",
    instagram: "",
    x: "",
    linkedin: "",
  },

  navLinks: [
    { label: "Home", href: "/" },
    { label: "Departments", href: "/departments" },
    { label: "Facilities", href: "/facilities" },
    { label: "Location", href: "/location" },
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQ", href: "/faq" },
  ],
};

/** The full postal address as one line, skipping blank parts. */
export const fullAddress = [site.streetAddress, site.city, site.region, site.country]
  .filter(Boolean)
  .join(", ");
