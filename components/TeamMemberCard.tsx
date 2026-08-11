import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-primary-100">
        <Image src={member.image} alt={member.name} fill className="object-cover" sizes="112px" />
      </div>
      <h3 className="mt-4 font-bold text-primary-900">{member.name}</h3>
      <p className="text-accent-700 font-semibold text-sm">{member.title}</p>
      <p className="mt-2 text-sm text-warm-900/70">{member.description}</p>
    </article>
  );
}
