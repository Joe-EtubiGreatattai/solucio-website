"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-50/90 backdrop-blur border-b border-primary-100">
      <div className="bg-accent-700 text-white text-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
          <span className="hidden sm:inline">24/7 Emergency</span>
          <a
            href={site.phoneEmergencyHref}
            className="font-semibold underline underline-offset-2 sm:no-underline sm:font-normal"
          >
            Call {site.phoneEmergency}
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt={site.name}
              width={160}
              height={54}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {site.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-warm-900/80 hover:text-primary-700 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/book"
              className="rounded-full bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              Book Appointment
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-primary-200 text-primary-800"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="lg:hidden border-t border-primary-100 bg-warm-50">
          <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
            {site.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-warm-900/80 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="rounded-full bg-primary-700 px-5 py-2.5 font-semibold text-white text-center"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
