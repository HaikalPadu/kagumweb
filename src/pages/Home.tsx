import { ArrowRight, Award, CheckCircle2, GraduationCap, Megaphone, MonitorCog, Package, Shield } from "lucide-react";
import { Link } from "@/src/router";
import { ButtonLink, Container, CtaBand, Eyebrow, SectionTitle } from "@/src/components/ui-kit";
import { brands, images, partners, services, stats } from "@/src/data/content";
import LogoCloud from "@/components/ui/logo-cloud-15";

export const serviceIcons: Record<string, typeof GraduationCap> = {
  "training-provider": GraduationCap,
  digital: Megaphone,
  it: MonitorCog,
  supply: Package,
  prosilat: Shield,
};

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[680px] overflow-hidden bg-ink text-white">
        <img src={images.hero} alt="Kagum training session" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/10" />
        <Container className="relative flex min-h-[680px] flex-col justify-center py-24">
          <div className="fade-up max-w-3xl">
            <Eyebrow light>Kagum Advance Group Sdn. Bhd.</Eyebrow>
            <h1 className="heading mt-6 text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
              Build capability.<br /><span className="text-brand-light">Create impact.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
              Kagum Academy, Kagum Digital and Kagum Supplies — one trusted partner for people and organisations ready to grow.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink to="/services">Our services</ButtonLink>
              <ButtonLink to="/services/training-provider" variant="outline">Explore Kagum Academy</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-16">
        <Container>
          <div className="grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-[0_25px_60px_rgba(15,23,42,.15)] lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-8 text-center ${i === 0 ? "bg-brand text-white" : ""} ${i > 0 ? "border-l border-slate-100" : ""}`}>
                <div className="heading text-4xl md:text-5xl">{s.value}</div>
                <div className={`mt-2 text-xs font-bold uppercase tracking-widest ${i === 0 ? "text-white/80" : "text-slate-500"}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="What we do" title={<>Three services. <span className="text-brand">One partner.</span></>} />
            <ButtonLink to="/services">All services</ButtonLink>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.id];
              return (
                <Link key={s.id} to={`/services/${s.id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,.12)]">
                  <div className="relative h-52 overflow-hidden">
                    <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className="absolute bottom-0 left-6 grid h-14 w-14 translate-y-1/2 place-items-center rounded-md bg-brand text-white shadow-lg"><Icon size={26} /></span>
                  </div>
                  <div className="p-6 pt-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-brand">{s.eyebrow}</p>
                    <img src={s.id === "training-provider" ? "/assets/kagum-academy-logo.png" : s.id === "digital" ? "/assets/kagum-digital-updated.png" : "/assets/kagum-supplies-updated.png"} alt="" className={s.id === "training-provider" ? "mt-5 h-20 w-36 object-contain" : "mt-5 h-20 w-64 object-cover"} /><h3 className="heading mt-4 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-slate-600">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink group-hover:text-brand">Learn more <ArrowRight size={16} /></span>
                  </div>
                </Link>
              );
            })}
            <Link to="/contact" className="flex flex-col justify-between rounded-lg bg-ink p-8 text-white transition hover:bg-brand">
              <Award size={40} className="text-brand-light" />
              <div>
                <h3 className="heading text-3xl">Not sure where to start?</h3>
                <p className="mt-3 text-white/75">Tell us your goals and we'll recommend the right programme or service.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">Talk to us <ArrowRight size={16} /></span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Kagum */}
      <section className="bg-slate-50 py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <img src={images.team} alt="Kagum team collaboration" loading="lazy" className="aspect-video h-auto w-full rounded-lg object-cover" />
            <div className="absolute -bottom-8 -right-4 rounded-lg bg-brand p-8 text-white shadow-2xl md:-right-8">
              <div className="heading text-5xl">HRDC</div>
              <div className="mt-1 text-sm font-bold uppercase tracking-widest text-white/85">Claimable programmes</div>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="Why Kagum" title={<>Learning that turns into <span className="text-brand">real results.</span></>} text="We combine practical training, creative digital work and dependable operations — so organisations get capability that lasts, not just a certificate." />
            <ul className="mt-8 grid gap-4">
              {["Registered HRD Corp training provider", "Industry practitioners as trainers", "Programmes tailored to your organisation", "Trusted by government agencies and corporates"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold"><CheckCircle2 className="shrink-0 text-brand" />{t}</li>
              ))}
            </ul>
            <div className="mt-10"><ButtonLink to="/about">About Kagum</ButtonLink></div>
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="py-24">
        <Container>
          <SectionTitle center eyebrow="The Kagum group" title="Our flyers" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {brands.map((b) => (
              <article key={b.name} className="overflow-hidden rounded-lg border border-slate-200 bg-white text-center transition hover:border-brand hover:shadow-lg">
                <a href={b.poster} target="_blank" rel="noreferrer" aria-label={`View full-size ${b.name} poster`} className="block"><img src={b.poster} alt={`${b.name} services and company poster`} loading="lazy" className="h-auto w-full object-contain" /></a>
                <div className="px-6 py-7"><h3 className="heading text-xl">{b.name}</h3><p className="mt-3 text-sm text-slate-500">{b.text}</p><div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-semibold text-brand"><a href={b.poster} target="_blank" rel="noreferrer">View full poster ↗</a></div></div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners above the capability call to action */}
      <div className="py-12">
        <Container>
          <LogoCloud logos={partners} />
        </Container>
      </div>
      <CtaBand />
    </main>
  );
}
