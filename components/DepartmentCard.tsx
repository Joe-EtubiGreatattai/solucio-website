import type { Department } from "@/lib/data/departments";

export default function DepartmentCard({ department }: { department: Department }) {
  return (
    <article className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-primary-900">{department.name}</h3>
      <p className="mt-3 text-warm-900/70 leading-relaxed">{department.summary}</p>
      {department.services.length > 0 ? (
        <ul className="mt-4 grid gap-1.5 text-sm text-warm-900/80 list-disc list-inside">
          {department.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
