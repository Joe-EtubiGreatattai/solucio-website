import Link from "next/link";
import Container from "@/components/Container";
import { site } from "@/lib/data/site";

export default function CtaBanner() {
  return (
    <section className="clinic-cta py-16 bg-primary-900 text-white">
      <Container className="max-w-3xl mx-auto">
        <span className="section-overline text-primary-200 mb-4">READY WHEN YOU ARE</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Your health deserves thoughtful care.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-primary-100 leading-relaxed max-w-xl">
          Whether you require general healthcare, eye surgery, pediatric care, or emergency admission — Solucio Clinic is here for you 24/7.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <Link
            href="/book"
            className="reference-button"
          >
            BOOK AN APPOINTMENT ↗
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-text-link text-white"
          >
            WHATSAPP CONSULTATION ↗
          </a>
        </div>
      </Container>
    </section>
  );
}
