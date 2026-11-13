"use client";

import Image from "next/image";
import type { Facility } from "@/lib/data/facilities";

export default function FacilityCard({
  facility,
  onImageClick,
}: {
  facility: Facility;
  onImageClick?: (src: string, alt: string) => void;
}) {
  return (
    <article className="rounded-3xl overflow-hidden border border-primary-200 bg-white shadow-xs card-hover-effect flex flex-col justify-between group">
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-primary-900"
        onClick={() => onImageClick && onImageClick(facility.image, facility.name)}
      >
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
          <span className="text-xs font-bold text-white bg-primary-900 rounded-full px-3 py-1.5 border border-white">
            Expand Photo
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-extrabold text-lg text-primary-900">{facility.name}</h3>
        <p className="mt-2 text-sm text-warm-900 leading-relaxed font-normal">{facility.description}</p>
      </div>
    </article>
  );
}
