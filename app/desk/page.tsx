import type { Metadata } from "next";
import Container from "@/components/Container";
import DeskGate from "@/components/desk/DeskGate";

export const metadata: Metadata = {
  title: "Front desk — Solucio Clinic",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  return (
    <section className="py-12 lg:py-16 bg-warm-50 min-h-[70vh]">
      <Container>
        <DeskGate />
      </Container>
    </section>
  );
}
