"use client";

import { useState, useMemo } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import DepartmentCard from "@/components/DepartmentCard";
import { departments } from "@/lib/data/departments";

const categories = [
  { id: "all", label: "All Departments" },
  { id: "surgery", label: "General & Pediatric Surgery" },
  { id: "eye", label: "Ophthalmology (Eye Care)" },
  { id: "specialty", label: "Urology, Plastic & ENT" },
  { id: "women", label: "Obstetrics & Gynaecology" },
];

export default function DepartmentsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDepartments = useMemo(() => {
    return departments.filter((dept) => {
      let matchesCat = true;
      if (activeCategory === "surgery") {
        matchesCat = dept.slug.includes("surgery") || dept.slug === "anesthesia";
      } else if (activeCategory === "eye") {
        matchesCat = dept.slug === "ophthalmology";
      } else if (activeCategory === "specialty") {
        matchesCat = ["urology", "plastic-surgery", "ent", "neurosurgery", "orthopedic-surgery"].includes(dept.slug);
      } else if (activeCategory === "women") {
        matchesCat = dept.slug === "obstetrics-gynaecology";
      }

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesName = dept.name.toLowerCase().includes(query);
      const matchesSummary = dept.summary.toLowerCase().includes(query);
      const matchesService = dept.services.some((s) => s.toLowerCase().includes(query));

      return matchesCat && (matchesName || matchesSummary || matchesService);
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container>
        <SectionHeading
          eyebrow="Specialist Specializations"
          title="Departments & Clinical Services"
          description="Explore our consultant-led surgical, medical, and diagnostic specialties. Search for specific procedures or filter by field."
        />

        {/* Search Bar & Category Controls */}
        <div className="mb-12 max-w-4xl mx-auto space-y-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by procedure or specialty (e.g. Cataract, Hypospadias, Prostate, Laparoscopy...)"
              className="w-full rounded-2xl border-2 border-primary-200 bg-white px-5 py-4 pl-12 text-base text-primary-900 font-medium shadow-xs placeholder:text-warm-800/60 focus:border-primary-800 focus:outline-none transition-all"
            />
            <svg
              className="absolute left-4 top-4.5 h-5 w-5 text-primary-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-4 text-xs font-bold text-warm-800 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
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
        </div>

        {/* Results Grid */}
        {filteredDepartments.length > 0 ? (
          <div className="dept-grid">
            {filteredDepartments.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} index={departments.indexOf(dept)} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-primary-200 bg-white p-12 text-center max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-primary-900">No matching procedures found</h3>
            <p className="mt-2 text-sm text-warm-900">
              We couldn&apos;t find any departments matching &quot;{searchQuery}&quot;. Try searching for general terms or contact our medical desk.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-6 rounded-full bg-primary-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
