"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { departments } from "@/lib/data/departments";
import { site } from "@/lib/data/site";

const timeSlots = [
  { id: "morning", label: "Morning (8:00 AM - 12:00 PM)", short: "8AM - 12PM" },
  { id: "afternoon", label: "Afternoon (12:00 PM - 4:00 PM)", short: "12PM - 4PM" },
  { id: "evening", label: "Evening (4:00 PM - 8:00 PM)", short: "4PM - 8PM" },
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const initialDept = searchParams?.get("department") || "";
  const initialSpecialist = searchParams?.get("specialist") || "";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: initialDept || (departments[0]?.name ?? ""),
    specialist: initialSpecialist,
    date: "",
    timeSlot: timeSlots[0].label,
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialDept) {
      setFormData((prev) => ({ ...prev, department: initialDept }));
    }
  }, [initialDept]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleNextStep(e: FormEvent) {
    e.preventDefault();
    if (step === 1) {
      if (!formData.department || !formData.reason.trim()) {
        alert("Please select a department and state your reason for visit.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.date || !formData.timeSlot) {
        alert("Please select a preferred date and time slot.");
        return;
      }
      setStep(3);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("Please fill in your contact information.");
      return;
    }
    setSubmitted(true);
  }

  const whatsappMsg = encodeURIComponent(
    `Hello Solucio Clinic, I would like to schedule an appointment.\n\n` +
      `Patient Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Department: ${formData.department}\n` +
      (formData.specialist ? `Specialist: ${formData.specialist}\n` : "") +
      `Preferred Date: ${formData.date}\n` +
      `Preferred Time: ${formData.timeSlot}\n` +
      `Reason for Visit: ${formData.reason}`
  );

  const whatsappUrl = `https://wa.me/2347066819213?text=${whatsappMsg}`;

  if (submitted) {
    return (
      <div className="rounded-3xl border-2 border-primary-200 bg-white p-8 sm:p-10 shadow-lg">
        <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center font-bold text-3xl mb-4">
          ✓
        </div>
        <h3 className="text-2xl font-extrabold text-primary-900 text-center">
          Appointment Request Submitted
        </h3>
        <p className="mt-3 text-center text-warm-900 leading-relaxed text-sm sm:text-base">
          To confirm your preferred slot instantly, please send your appointment details to our receptionist on WhatsApp or call our line.
        </p>

        {/* Appointment Summary Box */}
        <div className="mt-6 rounded-2xl bg-warm-50 p-6 border border-primary-200 text-sm space-y-3 text-warm-900">
          <div className="flex justify-between border-b border-warm-200 pb-2">
            <span className="font-semibold text-warm-800">Patient Name:</span>
            <span className="font-bold text-primary-900">{formData.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-warm-200 pb-2">
            <span className="font-semibold text-warm-800">Department:</span>
            <span className="font-bold text-primary-900">{formData.department}</span>
          </div>
          <div className="flex justify-between border-b border-warm-200 pb-2">
            <span className="font-semibold text-warm-800">Preferred Date & Time:</span>
            <span className="font-bold text-primary-900">
              {formData.date} ({formData.timeSlot})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-warm-800">Phone Number:</span>
            <span className="font-bold text-primary-900">{formData.phone}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full bg-primary-800 px-6 py-3.5 text-center font-bold text-white hover:bg-primary-900 transition-colors"
          >
            Send Details via WhatsApp
          </a>

          <a
            href={site.phoneEmergencyHref}
            className="rounded-full border-2 border-primary-800 bg-white px-6 py-3.5 text-center font-bold text-primary-900 hover:bg-primary-50 transition-colors"
          >
            Call Receptionist ({site.phoneEmergency})
          </a>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="text-xs font-bold text-primary-800 underline hover:text-black"
          >
            Book another appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-primary-200 bg-white p-6 sm:p-10 shadow-xs">
      {/* Wizard Progress Steps Indicator */}
      <div className="mb-8 flex items-center justify-between">
        {[
          { num: 1, label: "Specialty & Reason" },
          { num: 2, label: "Date & Time" },
          { num: 3, label: "Patient Info" },
        ].map((s, idx) => (
          <div key={s.num} className="flex items-center gap-2 flex-1">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm ${
                step === s.num
                  ? "bg-primary-800 text-white"
                  : step > s.num
                  ? "bg-primary-200 text-primary-900"
                  : "bg-warm-100 text-warm-800"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`hidden sm:inline text-xs font-bold ${
                step === s.num ? "text-primary-900" : "text-warm-800"
              }`}
            >
              {s.label}
            </span>
            {idx < 2 && <div className="h-0.5 flex-1 bg-primary-200 mx-2 hidden sm:block" />}
          </div>
        ))}
      </div>

      {/* Step 1: Department & Reason */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-6">
          <div>
            <label htmlFor="department" className="block text-sm font-bold text-primary-900 mb-2">
              Select Department or Specialty *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
            >
              {departments.map((dept) => (
                <option key={dept.slug} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-bold text-primary-900 mb-2">
              Reason for Consultation / Medical Concern *
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Briefly describe your medical concerns, symptoms, or requested procedure..."
              className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-primary-800 px-6 py-3.5 font-bold text-white hover:bg-primary-900 transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Select Date & Time</span>
            <span>→</span>
          </button>
        </form>
      )}

      {/* Step 2: Date & Time Slot */}
      {step === 2 && (
        <form onSubmit={handleNextStep} className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-primary-900 mb-2">
              Preferred Appointment Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary-900 mb-2">
              Preferred Time Slot *
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, timeSlot: slot.label }))}
                  className={`rounded-2xl border-2 p-4 text-center text-sm font-bold transition-colors ${
                    formData.timeSlot === slot.label
                      ? "border-primary-800 bg-primary-800 text-white"
                      : "border-primary-200 bg-white text-warm-900 hover:bg-primary-100"
                  }`}
                >
                  <div>{slot.short}</div>
                  <div className="text-xs font-normal opacity-80 mt-1">{slot.label.split("(")[0]}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-primary-200 px-6 py-3.5 font-bold text-warm-900 hover:bg-primary-50"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary-800 px-6 py-3.5 font-bold text-white hover:bg-primary-900 transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Patient Contact Details</span>
              <span>→</span>
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Patient Information */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-primary-900 mb-2">
              Full Name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
              className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-primary-900 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-primary-900 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="e.g. 0801 234 5678"
                className="w-full rounded-2xl border-2 border-primary-200 bg-white px-4 py-3 text-base text-primary-900 font-medium focus:border-primary-800 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full border border-primary-200 px-6 py-3.5 font-bold text-warm-900 hover:bg-primary-50"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary-800 px-6 py-3.5 font-bold text-white hover:bg-primary-900 transition-colors"
            >
              Submit & Confirm Booking Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
