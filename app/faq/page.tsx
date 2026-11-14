import type { Metadata } from "next";
import { pageMeta, faqJsonLd } from "@/lib/seo";
import FaqPageClient from "@/components/FaqPageClient";
import JsonLd from "@/components/JsonLd";
import { faq } from "@/lib/data/faq";

export const metadata: Metadata = pageMeta({
  title: 'Frequently Asked Questions',
  description: 'Answers about appointments, HMOs, emergency care and surgery at Solucio Clinic, a hospital in Lokoja, Kogi State.',
  path: '/faq',
})

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <FaqPageClient />
    </>
  );
}
