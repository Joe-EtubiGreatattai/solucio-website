import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Gallery — Solucio Clinic",
  description:
    "Step inside Solucio Clinic — where compassion, technology, and care come together to create healthier lives.",
};

export default function GalleryPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our Gallery"
          title="Step inside Solucio Clinic"
          description="Where compassion, technology, and care come together to create healthier lives."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map(({ src, alt }) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
