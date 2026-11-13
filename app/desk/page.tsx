import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Front desk — Solucio Clinic",
  robots: { index: false, follow: false },
};

export default function DeskPage() {
  redirect("https://solucio-website.techtree.lifestyle/emr/reception/appointments");
}
