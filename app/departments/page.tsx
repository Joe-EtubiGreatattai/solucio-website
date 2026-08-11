import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CtaBanner from "@/components/CtaBanner";
import DepartmentCard from "@/components/DepartmentCard";
import { departments } from "@/lib/data/departments";

export const metadata: Metadata = {
  title: "Departments — Solucio Clinic",
  description:
    "Explore Solucio Clinic's specialist departments, from Ophthalmology and General Surgery to Neurosurgery and Obstetrics & Gynaecology.",
};

export default function DepartmentsPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="Featured Departments"
            description="Solucio Clinic offers specialized medical services led by experienced consultants and supported by skilled healthcare professionals, ensuring the highest standards of care."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((department) => (
              <DepartmentCard key={department.slug} department={department} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
