import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FacilityCard from "@/components/FacilityCard";
import { site } from "@/lib/data/site";
import { departments } from "@/lib/data/departments";
import { facilities } from "@/lib/data/facilities";

const featuredDepartmentSlugs = ["ophthalmology", "general-surgery", "pediatric-surgery", "urology", "obstetrics-gynaecology", "plastic-surgery"];
const featuredDepartments = departments.filter((d) => featuredDepartmentSlugs.includes(d.slug));
const featuredFacilities = facilities.slice(0, 4);

export default function HomePage() {
  return <>
    <section className="xray-hero" aria-labelledby="hero-title">
      <video className="xray-hero__film" autoPlay muted loop playsInline poster="/images/gallery/IMG-20251206-WA0013.jpg" aria-label="An animated X-ray view of the human skeleton in motion">
        <source src="/videos/xray-motion.webm" type="video/webm" />
      </video>
      <div className="xray-hero__veil" />
      <Container className="xray-hero__content">
        <p className="xray-hero__eyebrow">SOLUCIO CLINIC <span>·</span> SPECIALIST CARE IN LAGOS</p>
        <h1 id="hero-title">CARE THAT<br />SEES THE<br />WHOLE YOU.</h1>
        <p className="xray-hero__intro">Consultant-led medicine. Thoughtful people.<br className="hidden sm:block" /> Care that moves with you, from diagnosis to recovery.</p>
        <div className="xray-hero__actions">
          <Link href="/book" className="reference-button">BOOK AN APPOINTMENT <span>↗</span></Link>
          <Link href="/departments" className="reference-text-link">EXPLORE OUR CARE <span>↗</span></Link>
        </div>
        <div className="hero-emergency"><span className="hero-emergency__dot" /> OPEN AROUND THE CLOCK <a href={site.phoneEmergencyHref}>{site.phoneEmergency}</a></div>
      </Container>
      <p className="xray-hero__caption">X-ray animation by Hybrid Medical Animation, uploaded by ΙΩΑΝΝΗΣ Δ. ΑΓΓΕΛΗΣ · <a href="https://commons.wikimedia.org/wiki/File:X-ray_Body_in_Motion_-_Yoga_by_Hybrid_Medical_Animation.webm" target="_blank" rel="noreferrer">Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a></p>
      <a className="xray-hero__scroll" href="#care" aria-label="Scroll to explore">↓</a>
    </section>

    <section id="care" className="editorial-intro"><Container className="editorial-intro__grid"><div><span className="section-overline">CARE THAT CONNECTS</span><h2>Better health begins<br />with being understood.</h2></div><div><p>When you need answers, you deserve expertise and time to listen. At Solucio, specialist teams work together to make every step clear, considered and personal.</p><Link href="/team" className="underlined-link">MEET YOUR CARE TEAM <span>↗</span></Link></div></Container></section>

    <section className="story-band"><div className="story-band__image"><Image src="/images/gallery/IMG-20251206-WA0013.jpg" alt="Clinical team providing attentive care in a modern treatment room" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="story-band__copy"><span className="section-overline">EXPERTISE, MADE HUMAN</span><h2>Experience<br />you can trust.<br /><em>Care you can feel.</em></h2><p>Our consultants bring specialist knowledge and a steady, personal approach to every patient and every decision.</p><Link href="/departments" className="underlined-link">FIND YOUR SPECIALIST <span>↗</span></Link></div></section>

    <section className="home-services"><Container><div className="home-services__heading"><div><span className="section-overline">SPECIALIST SERVICES</span><h2>Expert care, all<br />under one roof.</h2></div><Link href="/departments" className="underlined-link">VIEW ALL DEPARTMENTS <span>↗</span></Link></div><div className="specialist-grid">{featuredDepartments.map((dept)=><article className="specialist-card" key={dept.slug}><div className="specialist-card__top"><span>{dept.services.length ? `${dept.services.length} procedures` : "Consultant-led team"}</span><span className="specialist-card__mark" aria-hidden="true">↗</span></div><h3>{dept.name}</h3><p>{dept.summary}</p><div className="specialist-card__actions"><Link href="/departments">EXPLORE DEPARTMENT</Link><Link href={`/book?department=${encodeURIComponent(dept.name)}`}>BOOK A VISIT <span>↗</span></Link></div></article>)}</div></Container></section>

    <section className="home-facilities"><Container><SectionHeading eyebrow="Our clinic" title="A thoughtful place to heal" description="Modern theatres, calm recovery spaces and diagnostic facilities, all designed around your wellbeing." /><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{featuredFacilities.map((facility)=><FacilityCard key={facility.slug} facility={facility} />)}</div><div className="mt-10"><Link href="/facilities" className="underlined-link">EXPLORE OUR FACILITIES <span>↗</span></Link></div></Container></section>

    <section className="closing-statement"><Container><span className="section-overline">HERE WHEN YOU NEED US</span><h2>Good care changes<br />everything.</h2><p>Let’s take the next step together.</p><Link href="/book" className="reference-button">BOOK AN APPOINTMENT <span>↗</span></Link></Container></section>
  </>;
}
