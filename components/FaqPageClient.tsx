"use client";

import { useState, useMemo } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { faq } from "@/lib/data/faq";
import { site } from "@/lib/data/site";

export default function FaqPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaq = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return faq;
    return faq.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container>
        <SectionHeading
          eyebrow="Help & Information"
          title="Frequently Asked Questions"
          description="Find answers regarding our medical specializations, surgical procedures, HMO insurance coverage, emergency care, and clinic policies."
        />

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. eye surgery, HMO, booking, circumcision...)"
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
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto">
          {filteredFaq.length > 0 ? (
            <div className="space-y-4">
              {filteredFaq.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={item.question}
                    className="rounded-2xl border border-primary-200 bg-white shadow-xs overflow-hidden"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-primary-50 transition-colors"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="font-extrabold text-base sm:text-lg text-primary-900">
                        {item.question}
                      </span>
                      <span
                        className={`h-8 w-8 rounded-full border border-primary-300 bg-primary-100 text-primary-900 flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                          isOpen ? "bg-primary-800 text-white border-primary-800" : ""
                        }`}
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-warm-900 leading-relaxed text-sm sm:text-base border-t border-primary-100">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-primary-200 bg-white p-10 text-center">
              <p className="text-warm-900 font-medium">No questions found matching &quot;{searchQuery}&quot;.</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-full bg-primary-800 px-6 py-2 text-sm font-bold text-white hover:bg-primary-900"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Need More Assistance Banner */}
          <div className="mt-12 rounded-3xl bg-primary-900 text-white p-8 text-center border border-primary-800">
            <h3 className="font-extrabold text-xl text-white">Have a specific medical question?</h3>
            <p className="mt-2 text-sm text-primary-100 max-w-lg mx-auto">
              Our patient desk is ready to answer your questions directly via phone or WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-primary-900 hover:bg-primary-50 transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href={site.phoneEmergencyHref}
                className="rounded-full border-2 border-white bg-primary-800 px-6 py-3 text-sm font-extrabold text-white hover:bg-primary-700 transition-colors"
              >
                Call Clinic Desk ({site.phoneEmergency})
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
