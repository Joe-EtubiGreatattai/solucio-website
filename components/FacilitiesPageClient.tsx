"use client";

import { useState, useMemo } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FacilityCard from "@/components/FacilityCard";
import GalleryLightbox from "@/components/GalleryLightbox";
import { facilities } from "@/lib/data/facilities";

const categoryFilters = [
  { id: "all", label: "All Facilities" },
  { id: "wards", label: "Wards & Private Suites" },
  { id: "theatres", label: "Operating Theatres" },
  { id: "diagnostics", label: "Labs & Reception" },
  { id: "amenities", label: "Elevator & Guest House" },
];

export default function FacilitiesPageClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxState, setLightboxState] = useState<{ isOpen: boolean; index: number }>({
    isOpen: false,
    index: 0,
  });

  const filteredFacilities = useMemo(() => {
    if (activeFilter === "all") return facilities;
    return facilities.filter((fac) => {
      if (activeFilter === "wards") return fac.slug.includes("ward") || fac.slug.includes("room") || fac.slug.includes("suite");
      if (activeFilter === "theatres") return fac.slug.includes("theatre");
      if (activeFilter === "diagnostics") return fac.slug.includes("laboratory") || fac.slug.includes("reception");
      if (activeFilter === "amenities") return fac.slug.includes("guest") || fac.slug.includes("elevator");
      return true;
    });
  }, [activeFilter]);

  const lightboxImages = useMemo(() => {
    return filteredFacilities.map((f) => ({
      src: f.image,
      alt: `${f.name} — ${f.description}`,
    }));
  }, [filteredFacilities]);

  function handleOpenLightbox(src: string) {
    const idx = lightboxImages.findIndex((img) => img.src === src);
    setLightboxState({ isOpen: true, index: idx >= 0 ? idx : 0 });
  }

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container>
        <SectionHeading
          eyebrow="Clinical Infrastructure"
          title="World-Class Healthcare Facilities"
          description="Designed to offer safety, surgical precision technology, maximum patient comfort, and serene clinical surroundings."
        />

        {/* Category Pills */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                activeFilter === cat.id
                  ? "bg-primary-800 text-white"
                  : "bg-white text-warm-900 border border-primary-200 hover:bg-primary-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
            <FacilityCard
              key={facility.slug}
              facility={facility}
              onImageClick={handleOpenLightbox}
            />
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {lightboxState.isOpen && (
        <GalleryLightbox
          images={lightboxImages}
          initialIndex={lightboxState.index}
          onClose={() => setLightboxState({ isOpen: false, index: 0 })}
        />
      )}
    </section>
  );
}
