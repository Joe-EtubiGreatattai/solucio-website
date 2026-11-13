import type { Metadata } from "next";
import FacilitiesPageClient from "@/components/FacilitiesPageClient";

export const metadata: Metadata = {
  title: "World-Class Facilities — Solucio Clinic",
  description:
    "Explore our modern twin operating suites, semi-private wards, VIP rooms, diagnostic laboratory, and serene patient amenities at Solucio Clinic.",
};

export default function FacilitiesPage() {
  return <FacilitiesPageClient />;
}
