import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmergencyFAB from "@/components/EmergencyFAB";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data/site";
import { hospitalJsonLd, websiteJsonLd } from "@/lib/seo";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hospital in ${site.city}, ${site.region}`,
    template: `%s · ${site.name} — ${site.city}`,
  },
  description:
    `${site.name} is a consultant-led private hospital in ${site.city}, ${site.region}. Specialist surgery, ophthalmology, O&G, paediatrics and 24-hour emergency care. Book an appointment today — call ${site.phoneEmergency}.`,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  category: "health",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    url: site.url,
    title: `${site.name} — Hospital in ${site.city}, ${site.region}`,
    description: `Consultant-led private hospital in ${site.city}. Specialist care and 24-hour emergency. Book online or call ${site.phoneEmergency}.`,
    images: [{ url: "/images/gallery/IMG-20251206-WA0013.jpg", width: 1200, height: 630, alt: `${site.name}, a hospital in ${site.city}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Hospital in ${site.city}`,
    description: `Consultant-led private hospital in ${site.city}, ${site.region}. 24-hour emergency care.`,
    images: ["/images/gallery/IMG-20251206-WA0013.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // TODO: paste your Google Search Console verification token here (Search Console → Settings → Ownership)
  // verification: { google: "your-token" },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased flex min-h-screen flex-col bg-warm-50 text-warm-900`}>
        <JsonLd data={[hospitalJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <EmergencyFAB />
      </body>
    </html>
  );
}
