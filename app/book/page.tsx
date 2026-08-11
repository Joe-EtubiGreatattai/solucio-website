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
