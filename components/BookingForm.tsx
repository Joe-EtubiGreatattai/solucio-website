"use client";

import { useState, type FormEvent } from "react";
import { departments } from "@/lib/data/departments";
import { site } from "@/lib/data/site";

const timeSlots = [
  "Morning (8AM - 12PM)",
  "Afternoon (12PM - 4PM)",
  "Evening (4PM - 8PM)",
];

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-primary-200 bg-primary-50 p-8 text-center">
        <h3 className="text-xl font-bold text-primary-900">
          Thank you — your request has been received
        </h3>
        <p className="mt-3 text-warm-900/70">
          This form is not yet connected to our booking system. To confirm
          your appointment, please call us on{" "}
          <a
            href={site.phoneEmergencyHref}
            className="font-semibold text-primary-700 underline hover:text-primary-900"
          >
            {site.phoneEmergency}
          </a>{" "}
          or message us on{" "}
          <a
            href={site.whatsappHref}
            className="font-semibold text-primary-700 underline hover:text-primary-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-primary-700 px-6 py-2.5 font-semibold text-white hover:bg-primary-800 transition-colors"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="space-y-8 rounded-2xl border border-primary-100 bg-white p-6 sm:p-8 shadow-sm"
    >
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-primary-900 mb-2">
          Patient Information
        </legend>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-warm-900 mb-1">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-900 mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-warm-900 mb-1">
              Phone Number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-primary-900 mb-2">
          Appointment Details
        </legend>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-warm-900 mb-1">
            Department *
          </label>
          <select
            id="department"
            name="department"
            required
            defaultValue=""
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="" disabled>
              -- Select Department --
            </option>
            {departments.map((department) => (
              <option key={department.slug} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-warm-900 mb-1">
              Preferred Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-warm-900 mb-1">
              Preferred Time *
            </label>
            <select
              id="time"
              name="time"
              required
              defaultValue=""
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="" disabled>
                -- Select Time --
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-warm-900 mb-1">
            Reason for Visit *
          </label>
          <textarea
            id="reason"
            name="reason"
            required
            rows={4}
            className="w-full rounded-lg border border-primary-200 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-full bg-primary-700 px-6 py-3 font-semibold text-white hover:bg-primary-800 transition-colors"
      >
        Book Appointment
      </button>
      <p className="text-center text-sm text-warm-900/60">
        This form is not yet connected to our booking system. To confirm your
        appointment, please call us on{" "}
        <a href={site.phoneEmergencyHref} className="font-medium text-primary-700 underline">
          {site.phoneEmergency}
        </a>{" "}
        or message us on{" "}
        <a
          href={site.whatsappHref}
          className="font-medium text-primary-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        .
      </p>
    </form>
  );
}
