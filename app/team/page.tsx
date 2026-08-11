import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import TeamMemberCard from "@/components/TeamMemberCard";
import { team } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "Our Team — Solucio Clinic",
  description:
    "Meet the leadership team behind Solucio Clinic's medical excellence, strategic vision, and compassionate care.",
};

export default function TeamPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Solucio Clinic Leadership"
            title="Our Management Team"
            description="Our leadership combines medical excellence, strategic vision, and compassionate care to ensure world-class healthcare delivery and a trusted patient experience."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
