"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  function isActive(href: string) { return href === "/" ? pathname === "/" : pathname.startsWith(href); }

  return <header className={`site-header ${isHome ? "site-header--home" : ""} ${open ? "site-header--open" : ""}`}>
    <div className="site-header__inner">
      <Link href="/" className="site-brand" onClick={() => setOpen(false)} aria-label="Solucio Clinic home"><span className="site-brand__name">SOLUCIO</span><span className="site-brand__sub">SPECIALIST CLINIC</span></Link>
      <nav className={`site-nav ${open ? "site-nav--open" : ""}`} aria-label="Main navigation">
        <Link href="/" aria-current={isActive("/")?"page":undefined} onClick={()=>setOpen(false)}>Home</Link>
        {site.navLinks.filter((x)=>x.href !== "/").map((link)=><Link key={link.href} href={link.href} aria-current={isActive(link.href)?"page":undefined} onClick={()=>setOpen(false)}>{link.label}</Link>)}
        <Link href="/book" className="site-nav__mobile-cta" onClick={()=>setOpen(false)}>BOOK AN APPOINTMENT ↗</Link>
      </nav>
      <Link href="/book" className="site-header__cta">BOOK AN APPOINTMENT <span>↗</span></Link>
      <button type="button" className="site-header__menu" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/></button>
    </div>
  </header>;
}
