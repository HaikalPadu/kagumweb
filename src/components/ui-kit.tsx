import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/src/router";

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-[min(1280px,calc(100%-40px))] ${className}`}>{children}</div>
);

export function ButtonLink({ to, children, variant = "primary" }: { to: string; children: ReactNode; variant?: "primary" | "light" | "outline" }) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    light: "bg-white text-ink hover:bg-slate-100",
    outline: "border-2 border-current hover:bg-white hover:text-ink",
  }[variant];
  return (
    <Link to={to} className={`inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition ${styles}`}>
      {children} <ArrowRight size={16} />
    </Link>
  );
}

export const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <p className={`flex items-center gap-3 text-xs font-extrabold uppercase tracking-[.22em] ${light ? "text-white/80" : "text-brand"}`}>
    <span className={`h-[3px] w-8 ${light ? "bg-white" : "bg-brand"}`} />{children}
  </p>
);

export function SectionTitle({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center [&>p:first-child]:justify-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="heading mt-4 text-4xl md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-slate-600">{text}</p>}
    </div>
  );
}

export function PageBanner({ eyebrow, title, text, image, video }: { eyebrow: string; title: ReactNode; text: string; image: string; video?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {video ? <video src={video} poster={image} autoPlay muted loop playsInline preload="metadata" tabIndex={-1} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover" /> : <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
      <Container className="relative py-24 md:py-32">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="heading mt-5 max-w-3xl text-5xl md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/80">{text}</p>
      </Container>
      <div className="absolute bottom-0 left-0 h-2 w-1/3 bg-brand" />
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="bg-brand text-white">
      <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="heading text-3xl md:text-4xl">Ready to build your team's capability?</h2>
          <p className="mt-3 text-white/85">Talk to us about HRDC training, digital growth or supply needs.</p>
        </div>
        <ButtonLink to="/contact" variant="light">Get in touch</ButtonLink>
      </Container>
    </section>
  );
}
