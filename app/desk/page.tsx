import type { Metadata } from "next";
import Container from "@/components/Container";
import DeskBoard from "@/components/desk/DeskBoard";
import DeskLogin from "@/components/desk/DeskLogin";
import { deskConfigured, isDesk } from "@/lib/server/desk-auth";

export const metadata: Metadata = {
  title: "Front desk — Solucio Clinic",
  robots: { index: false, follow: false },
};

export default async function DeskPage() {
  const signedIn = await isDesk();
  return (
    <section className="py-12 lg:py-16 bg-warm-50 min-h-[70vh]">
      <Container>
        {signedIn ? <DeskBoard emailOn={Boolean(process.env.SMTP_HOST)} /> : <DeskLogin configured={deskConfigured()} />}
      </Container>
    </section>
  );
}
