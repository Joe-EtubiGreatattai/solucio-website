import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyFAB from "@/components/EmergencyFAB";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Solucio Clinic — Solutions for Your Wellbeing",
  description:
    "Solucio Clinic provides comprehensive, compassionate healthcare and specialist surgical services in a modern, patient-centered facility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased flex min-h-screen flex-col bg-warm-50 text-warm-900`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <EmergencyFAB />
      </body>
    </html>
  );
}

