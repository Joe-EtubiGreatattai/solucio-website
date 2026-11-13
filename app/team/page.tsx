import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TeamMemberCard from "@/components/TeamMemberCard";
import CtaBanner from "@/components/CtaBanner";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Medical & Administrative Team — Solucio Clinic",
  description:
    "Meet the experienced medical directors, consultant surgeons, HMO desk officers, and nursing personnel at Solucio Clinic.",
};

export default function TeamPage() {
  return (
    <>
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Clinical Leadership"
            title="Our Dedicated Medical & Support Team"
            description="Our leadership team consists of consultant surgeons, medical directors, and administrative officers committed to compassionate, high-quality patient outcomes."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
