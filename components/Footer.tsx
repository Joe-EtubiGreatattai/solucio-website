import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Footer() {
  return <footer className="site-footer">
    <div className="site-footer__main">
      <div><div className="site-footer__brand">SOLUCIO</div><p>Specialist care, delivered with clarity and compassion. Here for your health, every day.</p><a href={site.phoneEmergencyHref}>24/7 emergency · {site.phoneEmergency}</a></div>
      <div><h4>Explore</h4><ul>{site.navLinks.filter((link)=>link.href!=="/").map((link)=><li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></div>
      <div><h4>Contact</h4><ul><li><a href={site.phoneEmergencyHref}>{site.phoneEmergency}</a></li><li><a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp desk</a></li><li>Outreach: {site.outreachPhone}</li></ul></div>
      <div><h4>Clinic hours</h4><ul><li>Emergency ward<br/>Open 24 hours, every day</li><li>Consultations<br/>Monday–Saturday · 8am–8pm</li></ul></div>
    </div>
    <div className="site-footer__bottom"><span>© {new Date().getFullYear()} Solucio Clinic. All rights reserved.</span><span>Solutions for your wellbeing.</span></div>
  </footer>;
}
