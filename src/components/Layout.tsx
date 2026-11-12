import { useEffect, useState, type ReactNode } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Link } from "@/src/router";
import { Container } from "@/src/components/ui-kit";
import { contact, services } from "@/src/data/content";
import RandomLetterSwapNav from "@/components/ui/m-random-letter-swap-1";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
];


export default function Layout({ path, children }: { path: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    sections.forEach((section, index) => {
      if (index === 0) return;
      section.classList.add("section-reveal");
      observer.observe(section);
    });
    return () => { observer.disconnect(); sections.forEach((section) => section.classList.remove("section-reveal", "is-visible")); };
  }, [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="hidden bg-ink text-xs text-white/75 md:block">
        <Container className="flex h-10 items-center justify-between">
          <div className="flex gap-6">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white"><Mail size={13} />{contact.email}</a>
            <a href={contact.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={13} />{contact.phone}</a>
          </div>
          <div className="flex items-center gap-4">
            <span>HRD Corp Registered Training Provider</span>
            <Socials size={14} />
          </div>
        </Container>
      </div>

      <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_6px_30px_rgba(15,23,42,.08)]" : "border-b border-slate-100"}`}>
        <Container className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/kagum-group-logo.png" alt="Kagum Advance" className="h-12 w-auto" />
            <span className="heading text-lg leading-none">KAGUM<span className="block text-xs font-bold tracking-[.3em] text-brand">ADVANCE GROUP</span></span>
          </Link>
          <RandomLetterSwapNav path={path} />
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" className="rounded-md border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </Container>
        {open && (
          <div id="mobile-navigation" className="border-t border-slate-100 bg-white lg:hidden">
            <Container><RandomLetterSwapNav path={path} mobile /></Container>
          </div>
        )}
      </header>

      {children}

      <footer className="bg-ink text-white/70">
        <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 text-white">
              <img src="/assets/kagum-group-logo.png" alt="" className="h-12 w-auto rounded bg-white p-1" />
              <span className="heading text-lg leading-none">KAGUM<span className="block text-xs tracking-[.3em] text-brand-light">ADVANCE GROUP</span></span>
            </div>
            <p className="mt-5 text-sm font-semibold">KAGUM ADVANCE GROUP SDN. BHD.<br />202201014029 (1459726-U)</p><p className="mt-5 text-sm leading-relaxed">Capability, adaptability and scalability for people and organisations ready to move forward.</p>
            <div className="mt-5 text-white"><Socials size={18} /></div>
          </div>
          <FooterCol title="Services">{services.map((s) => <Link key={s.id} to={`/services/${s.id}`} className="hover:text-white">{s.title}</Link>)}</FooterCol>
          <FooterCol title="Company">{[...nav.slice(2), { to: "/contact", label: "Contact" }].map((n) => <Link key={n.to} to={n.to} className="hover:text-white">{n.label}</Link>)}</FooterCol>
          <FooterCol title="Contact">
            <a href={`mailto:${contact.email}`} className="flex gap-2 hover:text-white"><Mail size={16} className="mt-0.5 shrink-0 text-brand-light" />{contact.email}</a>
            <a href={contact.phoneHref} className="flex gap-2 hover:text-white"><Phone size={16} className="mt-0.5 shrink-0 text-brand-light" />{contact.phone}</a>
            <span className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-light" /><span>{contact.hq.join(" ")}</span></span>
          </FooterCol>
        </Container>
        <div className="border-t border-white/10">
          <Container className="flex flex-col justify-between gap-2 py-6 text-xs md:flex-row">
            <span>© {new Date().getFullYear()} Kagum Advance Group Sdn. Bhd. All rights reserved.</span>
            <span>kagumadvance.com</span>
          </Container>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return <div><p className="mb-5 text-sm font-extrabold uppercase tracking-[.18em] text-white">{title}</p><div className="grid gap-3 text-sm">{children}</div></div>;
}

function Socials({ size }: { size: number }) {
  const s = contact.socials;
  return (
    <div className="flex gap-3">
      <a aria-label="Facebook" href={s.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-light"><Facebook size={size} /></a>
      <a aria-label="Instagram" href={s.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-light"><Instagram size={size} /></a>
      <a aria-label="LinkedIn" href={s.linkedin} target="_blank" rel="noreferrer" className="hover:text-brand-light"><Linkedin size={size} /></a>
    </div>
  );
}
