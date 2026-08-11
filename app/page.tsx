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
