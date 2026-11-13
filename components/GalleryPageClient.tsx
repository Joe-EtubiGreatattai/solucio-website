"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import GalleryLightbox from "@/components/GalleryLightbox";
import { galleryImages } from "@/lib/data/gallery";

const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "operating", label: "Operating Suites & Surgery" },
  { id: "wards", label: "Wards, Private & VIP Rooms" },
  { id: "lounges", label: "Reception, Lounge & Guest House" },
];

export default function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; index: number }>({
    isOpen: false,
    index: 0,
  });

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return galleryImages;
    return galleryImages.filter((img) => {
      const alt = img.alt.toLowerCase();
      if (activeCategory === "operating") return alt.includes("theatre") || alt.includes("operating") || alt.includes("surgery");
      if (activeCategory === "wards") return alt.includes("ward") || alt.includes("room") || alt.includes("vip") || alt.includes("bed");
      if (activeCategory === "lounges") return alt.includes("reception") || alt.includes("lounge") || alt.includes("guest") || alt.includes("elevator");
      return true;
    });
  }, [activeCategory]);

  function handleOpenLightbox(index: number) {
    setLightboxState({ isOpen: true, index });
  }

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container>
        <SectionHeading
          eyebrow="Our Gallery"
          title="Step Inside Solucio Clinic"
          description="A visual walkthrough of our modern clinical facilities, surgical operating suites, inpatient suites, and patient lounges."
        />

        {/* Category Filter Pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary-800 text-white"
                  : "bg-white text-warm-900 border border-primary-200 hover:bg-primary-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map(({ src, alt }, index) => (
            <div
              key={`${src}-${index}`}
              onClick={() => handleOpenLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-primary-900 shadow-xs cursor-pointer border border-primary-200"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3.5">
                <span className="text-xs font-bold text-white line-clamp-2">{alt}</span>
                <span className="mt-1 text-[11px] font-extrabold text-emerald-300">
                  Expand Photo
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Viewer */}
      {lightboxState.isOpen && (
        <GalleryLightbox
          images={filteredImages}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState({ isOpen: false, index: 0 })}
        />
      )}
    </section>
  );
}
