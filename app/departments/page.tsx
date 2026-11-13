import type { Metadata } from "next";
import DepartmentsPageClient from "@/components/DepartmentsPageClient";

export const metadata: Metadata = {
  title: "Specialist Departments & Procedures — Solucio Clinic",
  description:
    "Explore Solucio Clinic's medical specializations: General Surgery, Ophthalmology, Pediatric Surgery, Urology, Plastic Surgery, ENT, and Obstetrics & Gynaecology.",
};

export default function DepartmentsPage() {
  return <DepartmentsPageClient />;
}
