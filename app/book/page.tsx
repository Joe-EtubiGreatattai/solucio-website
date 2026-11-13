import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Book an Appointment — Solucio Clinic",
  description:
    "Schedule your medical consultation or specialist surgical visit online with Solucio Clinic.",
};

export default function BookPage() {
  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Online Appointment"
          title="Schedule Your Visit to Solucio Clinic"
          description="Select your desired specialty, choose your date and time, and submit your details. For 24/7 emergency admissions, call our hotline immediately."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="p-8 text-center bg-white rounded-3xl font-bold">Loading booking system...</div>}>
              <BookingForm />
            </Suspense>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl bg-accent-700 text-white p-6 shadow-sm border border-accent-800">
              <div className="text-xs font-bold uppercase tracking-wider text-accent-100 mb-2">
                24/7 Immediate Help
              </div>
              <h4 className="font-extrabold text-lg">Need Emergency Care?</h4>
              <p className="mt-2 text-xs text-white leading-relaxed font-medium">
                If you or a relative require urgent medical attention or surgical evaluation, call our emergency hotline directly:
              </p>
              <a
                href={site.phoneEmergencyHref}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white text-accent-800 px-4 py-2.5 text-xs font-extrabold shadow-sm hover:bg-accent-50 transition-colors w-full justify-center"
              >
                <span>Call {site.phoneEmergency}</span>
              </a>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-xs border border-primary-200 text-sm space-y-4">
              <h4 className="font-extrabold text-primary-900 text-base">Clinic Information</h4>
              <div>
                <div className="text-xs text-warm-800 font-bold uppercase">Consultation Hours</div>
                <div className="font-semibold text-warm-900 mt-1">Monday – Saturday: 8:00 AM – 8:00 PM</div>
              </div>
              <div>
                <div className="text-xs text-warm-800 font-bold uppercase">HMO & Insurance</div>
                <div className="font-semibold text-warm-900 mt-1">Leadway, AXA-Mansard, Bastion, Indigo & Major HMOs Accepted</div>
              </div>
              <div>
                <div className="text-xs text-warm-800 font-bold uppercase">Outreach Enquiries</div>
                <div className="font-semibold text-warm-900 mt-1">{site.outreachPhone}</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
