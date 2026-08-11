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
