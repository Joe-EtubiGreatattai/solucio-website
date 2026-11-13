import type { Metadata } from "next";
import GalleryPageClient from "@/components/GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery — Solucio Clinic",
  description:
    "Step inside Solucio Clinic — where compassion, technology, and care come together to create healthier lives.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
