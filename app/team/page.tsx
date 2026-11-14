import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import TeamMemberCard from "@/components/TeamMemberCard";
import CtaBanner from "@/components/CtaBanner";
import { team } from "@/lib/data/team";

export const metadata: Metadata = pageMeta({
  title: 'Our Consultants & Care Team',
  description: 'Meet the consultants and care team at Solucio Clinic in Lokoja — fellows of the National and West African Colleges of Surgeons caring for Kogi State.',
  path: '/team',
})

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
