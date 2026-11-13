import type { Metadata } from "next";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, MapPin } from "lucide-react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Careers — Solucio Specialist Clinic",
  description:
    "Explore current job openings at Solucio Specialist Clinic and apply through our careers portal.",
};

type JobOpening = {
  _id: string;
  title: string;
  department?: string;
  employmentType?: string;
  location?: string;
  summary?: string;
  description?: string;
  openings?: number;
  closingDate?: string | null;
  salaryMin?: number;
  salaryMax?: number;
  showSalary?: boolean;
};

const HR_API_ORIGIN = "https://solucio-hr.techtree.lifestyle";
const HR_CAREERS_ORIGIN = "https://solucio-hr-frontend.vercel.app";

async function getOpenings(): Promise<JobOpening[] | null> {
  try {
    const response = await fetch(`${HR_API_ORIGIN}/api/careers/jobs`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as JobOpening[]) : null;
  } catch {
    return null;
  }
}

function employmentLabel(value?: string) {
  const labels: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    contract: "Contract",
    locum: "Locum",
    intern: "Internship",
  };
  return value ? labels[value] ?? value.replaceAll("_", " ") : "Employment type not specified";
}

function closingDateLabel(value?: string | null) {
  if (!value) return "Applications open";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `Apply by ${date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  })}`;
}

export default async function CareersPage() {
  const openings = await getOpenings();

  return (
    <>
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Work with us"
            title="Make a difference in every patient’s day."
            description="Join a team committed to thoughtful, specialist care. Explore the roles currently available at Solucio Specialist Clinic."
          />

          {openings === null ? (
            <div className="border border-[#dfe3df] bg-white px-6 py-10 text-center text-[#5d6760]">
              Current openings are temporarily unavailable. Please check back shortly.
            </div>
          ) : openings.length === 0 ? (
            <div className="border border-[#dfe3df] bg-white px-6 py-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-[#17201b]">No current openings</h2>
              <p className="mt-2 text-[#5d6760]">There are no roles available right now. Please check back for future opportunities.</p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {openings.map((job) => {
                const closingDate = closingDateLabel(job.closingDate);
                return (
                  <article key={job._id} className="flex min-h-full flex-col border border-[#dfe3df] bg-white p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5c7667]">
                          {job.department || "Solucio Specialist Clinic"}
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#17201b]">{job.title}</h2>
                      </div>
                      <span className="shrink-0 border border-[#e0e4df] px-3 py-1.5 text-xs font-medium text-[#43594a]">
                        {employmentLabel(job.employmentType)}
                      </span>
                    </div>

                    <p className="mt-5 flex-1 leading-7 text-[#5d6760]">
                      {job.summary?.trim() || job.description?.trim() || "Join our team and help deliver excellent care to our community."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#e8ebe7] pt-5 text-sm text-[#5d6760]">
                      {job.location && <span className="inline-flex items-center gap-2"><MapPin size={16} aria-hidden="true" />{job.location}</span>}
                      {typeof job.openings === "number" && <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} aria-hidden="true" />{job.openings} {job.openings === 1 ? "position" : "positions"}</span>}
                      {closingDate && <span className="inline-flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" />{closingDate}</span>}
                    </div>

                    {job.showSalary && job.salaryMin != null && (
                      <p className="mt-4 text-sm font-medium text-[#43594a]">
                        ₦{job.salaryMin.toLocaleString("en-NG")}{job.salaryMax != null ? ` – ₦${job.salaryMax.toLocaleString("en-NG")}` : ""} / month
                      </p>
                    )}

                    <a
                      href={`${HR_CAREERS_ORIGIN}/careers/${encodeURIComponent(job._id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-[#172a20] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#294333]"
                    >
                      View role &amp; apply <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
