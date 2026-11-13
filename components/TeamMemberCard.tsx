import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/data/team";

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="rounded-3xl border border-primary-100 bg-white p-7 text-center shadow-xs card-hover-effect flex flex-col justify-between h-full">
      <div>
        <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary-100 shadow-md transition-transform duration-300 hover:scale-105">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>

        <h3 className="mt-5 text-xl font-extrabold text-primary-950">{member.name}</h3>
        <p className="text-emerald-700 font-bold text-sm mt-1">{member.title}</p>
        <p className="mt-3 text-sm text-warm-900/75 leading-relaxed">{member.description}</p>
      </div>

      <div className="mt-6 pt-5 border-t border-primary-100/60">
        <Link
          href={`/book?specialist=${encodeURIComponent(member.name)}`}
          className="inline-flex items-center justify-center w-full rounded-full bg-primary-50 px-4 py-2.5 text-xs font-bold text-primary-800 hover:bg-primary-700 hover:text-white transition-colors"
        >
          Book Consultation
        </Link>
      </div>
    </article>
  );
}
