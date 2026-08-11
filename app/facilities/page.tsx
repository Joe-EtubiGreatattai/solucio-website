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
