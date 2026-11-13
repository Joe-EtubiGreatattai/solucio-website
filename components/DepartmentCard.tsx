"use client";

import { useState } from "react";
import Link from "next/link";
import type { Department } from "@/lib/data/departments";

export default function DepartmentCard({ department }: { department: Department }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article className="rounded-3xl border border-primary-200 bg-white p-7 shadow-xs card-hover-effect flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-900">
              {department.services.length > 0
                ? `${department.services.length} Procedures`
                : "Specialist Unit"}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-primary-900">{department.name}</h3>
          <p className="mt-3 text-warm-900 leading-relaxed text-sm">{department.summary}</p>

          {department.services.length > 0 && (
            <div className="mt-5">
              <div className="text-xs font-bold text-primary-900 uppercase tracking-wider mb-2.5">
                Key Services & Procedures
              </div>
              <div className="flex flex-wrap gap-1.5">
                {department.services.slice(0, 4).map((service) => (
                  <span
                    key={service}
                    className="inline-block rounded-lg bg-warm-100 px-2.5 py-1 text-xs font-semibold text-warm-900 border border-warm-200"
                  >
                    {service}
                  </span>
                ))}
                {department.services.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="inline-block rounded-lg bg-primary-100 px-2.5 py-1 text-xs font-bold text-primary-900 hover:bg-primary-200 transition-colors"
                  >
                    +{department.services.length - 4} more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-5 border-t border-primary-100 flex items-center justify-between gap-2">
          {department.services.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-xs font-bold text-primary-800 hover:text-primary-900 transition-colors underline"
            >
              View Full Procedures →
            </button>
          ) : (
            <span className="text-xs text-warm-800 font-medium">Consultant Led</span>
          )}

          <Link
            href={`/book?department=${encodeURIComponent(department.name)}`}
            className="rounded-full bg-primary-800 px-4 py-2 text-xs font-bold text-white hover:bg-primary-900 transition-colors"
          >
            Book Visit
          </Link>
        </div>
      </article>

      {/* Procedures Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in">
          <div
            className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-primary-200 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 h-9 w-9 rounded-full bg-warm-100 text-warm-900 flex items-center justify-center font-bold hover:bg-warm-200 transition-colors"
            >
              ✕
            </button>

            <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-900 mb-3">
              Specialist Unit Procedures
            </span>
            <h3 className="text-2xl font-extrabold text-primary-900">{department.name}</h3>
            <p className="mt-2 text-sm text-warm-900 leading-relaxed">{department.summary}</p>

            <div className="mt-6">
              <h4 className="font-extrabold text-sm text-primary-900 uppercase tracking-wider mb-3">
                All Services & Surgical Procedures ({department.services.length})
              </h4>
              <ul className="grid gap-2.5 text-sm text-warm-900">
                {department.services.map((service) => (
                  <li key={service} className="flex items-start gap-2.5 bg-warm-50 p-3 rounded-xl border border-warm-200 font-medium">
                    <span className="h-5 w-5 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-primary-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full px-5 py-2.5 text-sm font-bold text-warm-900 hover:text-black"
              >
                Close
              </button>
              <Link
                href={`/book?department=${encodeURIComponent(department.name)}`}
                onClick={() => setShowModal(false)}
                className="rounded-full bg-primary-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-900 transition-colors"
              >
                Book Appointment for {department.name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
