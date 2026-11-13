"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { slotLabel } from "@/lib/booking-rules";
import { site } from "@/lib/data/site";

type Status = { ref: string; status: string; department: string; firstName: string; requested: { date: string; timeSlot: string }; confirmed: { date: string; timeSlot: string } | null };

const WORDS: Record<string, [string, string]> = {
  new: ["Received", "We have your request. Our front desk will call you to confirm a time."],
  contacted: ["We’re arranging it", "Our front desk has been in touch and is arranging your appointment."],
  confirmed: ["Confirmed", "Your appointment is booked. Please arrive 15 minutes early."],
  completed: ["Visit completed", "Thank you for visiting Solucio Clinic."],
  cancelled: ["Cancelled", "This request was cancelled. You’re welcome to book again."],
};
const longDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export default function BookingStatus() {
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function check(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/bookings/status?ref=${encodeURIComponent(ref.trim())}&phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      if (!res.ok) setError(data.error || "Not found");
      else setResult(data);
    } catch {
      setError("You seem to be offline.");
    } finally {
      setBusy(false);
    }
  }

  const words = result ? WORDS[result.status] ?? [result.status, ""] : null;
  return (
    <div className="space-y-6">
      <form onSubmit={check} className="rounded-3xl border border-primary-200 bg-white p-6 sm:p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block text-sm font-bold text-primary-900">Reference
            <input value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} required placeholder="BK-2026-00001" className="mt-2 w-full border-2 border-primary-200 bg-white px-4 py-3 text-base font-medium" />
          </label>
          <label className="block text-sm font-bold text-primary-900">Phone number
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" placeholder="0803 123 4567" className="mt-2 w-full border-2 border-primary-200 bg-white px-4 py-3 text-base font-medium" />
          </label>
        </div>
        <button disabled={busy} className="w-full rounded-full bg-primary-800 px-6 py-3.5 font-bold text-white hover:bg-primary-900 disabled:opacity-60">{busy ? "Checking…" : "Check status"}</button>
        {error && <p role="alert" className="text-sm font-semibold text-accent-700">{error}</p>}
      </form>

      {result && words && (
        <div className="border border-primary-200 bg-white p-6 sm:p-8">
          <p className="section-overline">{result.ref}</p>
          <h3 className="text-3xl font-semibold tracking-tight text-primary-900">{words[0]}</h3>
          <p className="mt-2 text-warm-900">{result.firstName}, {words[1]}</p>
          <dl className="mt-5 grid gap-2 text-sm">
            <div className="flex justify-between border-b border-warm-200 pb-2"><dt className="text-warm-800">Department</dt><dd className="font-bold">{result.department}</dd></div>
            {result.confirmed ? (
              <div className="flex justify-between border-b border-warm-200 pb-2"><dt className="text-warm-800">Appointment</dt><dd className="font-bold text-right">{longDate(result.confirmed.date)}<br />{slotLabel(result.confirmed.timeSlot)}</dd></div>
            ) : (
              <div className="flex justify-between border-b border-warm-200 pb-2"><dt className="text-warm-800">You asked for</dt><dd className="font-bold text-right">{longDate(result.requested.date)}<br />{slotLabel(result.requested.timeSlot)}</dd></div>
            )}
          </dl>
          <p className="mt-5 text-sm text-warm-800">Need to change it? Call <a className="font-bold underline" href={site.phoneEmergencyHref}>{site.phoneEmergency}</a> and quote your reference. <Link href="/book" className="underline">Book again</Link></p>
        </div>
      )}
    </div>
  );
}
