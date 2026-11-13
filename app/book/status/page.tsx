import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BookingStatus from "@/components/BookingStatus";

export const metadata: Metadata = {
  title: "Check your appointment request — Solucio Clinic",
  description: "See whether your Solucio Clinic appointment request has been confirmed.",
};

export default function BookingStatusPage() {
  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container className="max-w-2xl">
        <SectionHeading eyebrow="Online Appointment" title="Check your request" description="Enter the reference from your confirmation email and the phone number you booked with." />
        <BookingStatus />
      </Container>
    </section>
  );
}
