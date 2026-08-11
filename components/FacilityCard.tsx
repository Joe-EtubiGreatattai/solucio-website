import Image from "next/image";
import type { Facility } from "@/lib/data/facilities";

export default function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <article className="rounded-2xl overflow-hidden border border-primary-100 bg-white shadow-sm">
      <div className="relative aspect-[4/3]">
        <Image src={facility.image} alt={facility.name} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary-900">{facility.name}</h3>
        <p className="mt-1 text-sm text-warm-900/70">{facility.description}</p>
      </div>
    </article>
  );
}
