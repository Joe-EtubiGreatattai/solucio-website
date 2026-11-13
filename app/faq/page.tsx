import type { Metadata } from "next";
import FaqPageClient from "@/components/FaqPageClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Solucio Clinic",
  description:
    "Find answers to common questions about services, appointments, HMO insurance, emergency care, and surgeries at Solucio Clinic.",
};

export default function FaqPage() {
  return <FaqPageClient />;
}
