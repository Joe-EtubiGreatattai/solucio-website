import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import JsonLd from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { fullAddress, site } from "@/lib/data/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Location & Directions",
    description:
      "Find Solucio Clinic in Lokoja: Ankuri Layout, Lokongoma Housing Estate, Kabba Road (opposite Phase 2), Lokoja, Kogi State. Map, directions, hours and phone.",
    path: "/location",
  }),
  // Classic geo meta tags — extra local signals for search engines
  other: {
    "geo.region": `${site.countryCode}-${site.regionCode}`,
    "geo.placename": site.city,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

const mapEmbed = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&hl=en&output=embed`;

export default function LocationPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Location", path: "/location" }])} />

      <section className="location-hero">
        <Container>
          <span className="section-overline">FIND US IN LOKOJA</span>
          <h1>How to find Solucio Clinic in Lokoja</h1>
          <p>
            Solucio Clinic is a consultant-led private hospital in {site.city}, {site.region}. We’re on Kabba Road,
            in the Lokongoma Housing Estate (Ankuri Layout), opposite Phase 2 — easy to reach from anywhere in Lokoja.
            Our emergency ward is open 24 hours, every day.
          </p>
        </Container>
      </section>

      <section className="location-main">
        <Container className="location-main__grid">
          <div className="location-map">
            <iframe
              title="Map showing Solucio Clinic, Lokoja, Kogi State"
              src={mapEmbed}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <aside className="location-details">
            <div>
              <h2>Address</h2>
              <p>{fullAddress}</p>
              <a className="reference-button" href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                GET DIRECTIONS <span>↗</span>
              </a>
            </div>

            <div>
              <h2>Call us</h2>
              <ul className="location-contact">
                <li><span>Emergency (24/7)</span><a href={site.phoneEmergencyHref}>{site.phoneEmergency}</a></li>
                <li><span>WhatsApp desk</span><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">Message us</a></li>
                <li><span>Outreach</span><a href={`tel:${site.outreachPhone.replace(/\s/g, "")}`}>{site.outreachPhone}</a></li>
              </ul>
            </div>

            <div>
              <h2>Opening hours</h2>
              <ul className="location-hours">
                {site.hours.map((h) => (
                  <li key={h.label}><span>{h.label}</span><span>{h.detail}</span></li>
                ))}
              </ul>
            </div>

            <Link href="/book" className="reference-text-link">BOOK AN APPOINTMENT <span>↗</span></Link>
          </aside>
        </Container>
      </section>

      <section className="location-facts">
        <Container>
          <span className="section-overline">AT A GLANCE</span>
          <h2>Quick facts about Solucio Clinic</h2>
          <ul>
            <li><strong>What it is:</strong> Solucio Clinic is a consultant-led private hospital in {site.city}, {site.region}, Nigeria.</li>
            <li><strong>Where:</strong> {fullAddress}.</li>
            <li><strong>Emergency:</strong> The emergency ward is open 24 hours, every day. Call {site.phoneEmergency}.</li>
            <li><strong>Consultations:</strong> Monday to Saturday, 8am–8pm.</li>
            <li><strong>Specialties:</strong> general surgery, ophthalmology and eye surgery, paediatric surgery, urology, plastic surgery, ENT, orthopaedic surgery and gynaecological surgery.</li>
            <li><strong>Also:</strong> comprehensive wellness checks, inpatient wards, operating theatres, laboratory and pharmacy. HMOs accepted (Leadway, AXA Mansard, Bastion, Indigo and others).</li>
            <li><strong>Consultants:</strong> Fellows of the National and West African Colleges of Surgeons.</li>
          </ul>
        </Container>
      </section>
    </>
  );
}
