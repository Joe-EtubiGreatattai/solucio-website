"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function EmergencyFAB() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <aside className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded Quick Contact Menu */}
      {expanded && (
        <div className="flex flex-col items-end gap-2.5 mb-1 animate-fade-in">
          <a
            href={site.phoneEmergencyHref}
            className="flex items-center gap-2.5 rounded-full bg-accent-700 text-white px-4 py-2.5 text-sm font-bold shadow-lg hover:bg-accent-800 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            <span>Emergency Call ({site.phoneEmergency})</span>
          </a>

          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-emerald-700 text-white px-4 py-2.5 text-sm font-bold shadow-lg hover:bg-emerald-800 transition-colors"
          >
            <span>WhatsApp Chat</span>
          </a>

          <Link
            href="/book"
            onClick={() => setExpanded(false)}
            className="flex items-center gap-2.5 rounded-full bg-primary-800 text-white px-4 py-2.5 text-sm font-bold shadow-lg hover:bg-primary-900 transition-colors"
          >
            <span>Book Appointment</span>
          </Link>
        </div>
      )}

      {/* Main Trigger & Scroll Top */}
      <div className="flex items-center gap-2">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="h-11 w-11 rounded-full bg-white text-primary-900 shadow-lg border border-primary-200 flex items-center justify-center font-bold hover:bg-primary-50 transition-colors"
          >
            ↑
          </button>
        )}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label="Quick contact menu"
          className="h-14 w-14 rounded-full bg-primary-800 text-white shadow-xl flex items-center justify-center font-bold hover:bg-primary-900 transition-colors focus:outline-none focus:ring-4 focus:ring-primary-200"
        >
          {expanded ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
