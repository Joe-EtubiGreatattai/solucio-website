import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-white">{site.name}</h3>
          <p className="mt-3 text-sm text-primary-200">{site.tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            {site.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-200">
            <li>
              <a href={site.phoneEmergencyHref} className="hover:text-white">
                Emergency: {site.phoneEmergency}
              </a>
            </li>
            <li>
              <a href={site.whatsappHref} className="hover:text-white">
                WhatsApp
              </a>
            </li>
            <li>Outreach bookings: {site.outreachPhone}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-3">Hours</h4>
          <p className="text-sm text-primary-200">
            Emergency care: 24/7
            <br />
            General consultation: Monday – Saturday
          </p>
        </div>
      </div>

      <div className="border-t border-primary-800 py-6 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
