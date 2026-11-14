import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import GalleryPageClient from "@/components/GalleryPageClient";

export const metadata: Metadata = pageMeta({
  title: 'Gallery',
  description: 'Inside Solucio Clinic, Lokoja — wards, theatres and facilities at a modern hospital serving Kogi State.',
  path: '/gallery',
})

export default function GalleryPage() {
  return <GalleryPageClient />;
}
