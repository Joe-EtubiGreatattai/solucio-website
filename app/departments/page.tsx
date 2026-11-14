import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import DepartmentsPageClient from "@/components/DepartmentsPageClient";

export const metadata: Metadata = pageMeta({
  title: 'Departments & Specialist Services',
  description: 'Specialist departments at Solucio Clinic, a hospital in Lokoja, Kogi State: general surgery, ophthalmology, obstetrics & gynaecology, paediatric surgery, urology, plastic surgery and ENT. Consultant-led care.',
  path: '/departments',
})

export default function DepartmentsPage() {
  return <DepartmentsPageClient />;
}
