import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import FacilitiesPageClient from "@/components/FacilitiesPageClient";

export const metadata: Metadata = pageMeta({
  title: 'Facilities',
  description: 'Modern operating theatres, diagnostics and calm recovery wards at Solucio Clinic, a private hospital in Lokoja, Kogi State.',
  path: '/facilities',
})

export default function FacilitiesPage() {
  return <FacilitiesPageClient />;
}
