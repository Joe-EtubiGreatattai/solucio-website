import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata: Metadata = pageMeta({
  title: 'Help Desk & Contact',
  description: 'Contact the Solucio Clinic help desk in Lokoja, Kogi State — phone, WhatsApp and directions to the hospital.',
  path: '/desk',
})

export default function DeskPage() {
  redirect("https://solucio-website.techtree.lifestyle/emr/reception/appointments");
}
