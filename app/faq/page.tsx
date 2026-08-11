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
        <Container maxWidth="3xl">
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
