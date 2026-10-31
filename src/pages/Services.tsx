import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/src/router";
import { ButtonLink, Container, CtaBand, PageBanner } from "@/src/components/ui-kit";
import { images, services } from "@/src/data/content";
import { serviceIcons } from "@/src/pages/Home";
import DigitalMarketing from "./DigitalMarketing";

export function Services() {
  return (
    <main>
      <PageBanner eyebrow="Our services" title={<>Everything you need <span className="text-brand-light">to move forward.</span></>} text="Training, digital, technology, supply and community — delivered by one connected team." image={images.training} />
      <section className="py-24">
        <Container className="grid gap-20">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.id];
            return (
              <article key={s.id} className="grid items-center gap-12 lg:grid-cols-2">
                <img src={s.image} alt={s.title} loading="lazy" className={`h-[420px] w-full rounded-lg object-cover ${i % 2 ? "lg:order-2" : ""}`} />
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-md bg-brand text-white"><Icon size={26} /></span>
                    <span className="heading text-5xl text-slate-200">0{i + 1}</span>
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand">{s.eyebrow}</p>
                  <h2 className="heading mt-2 text-4xl">{s.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-600">{s.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => <li key={p} className="flex gap-2 text-sm font-semibold"><CheckCircle2 size={18} className="shrink-0 text-brand" />{p}</li>)}
                  </ul>
                  <div className="mt-8"><ButtonLink to={`/services/${s.id}`}>View details</ButtonLink></div>
                </div>
              </article>
            );
          })}
        </Container>
      </section>
      <CtaBand />
    </main>
  );
}

export function ServiceDetail({ id }: { id: string }) {
  if (id === "digital") return <DigitalMarketing />;
  const s = services.find((x) => x.id === id);
  if (!s) return <NotFound />;
  const Icon = serviceIcons[s.id];
  const others = services.filter((x) => x.id !== id);
  return (
    <main>
      <PageBanner eyebrow={s.eyebrow} title={s.title} text={s.short} image={s.image} />
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-brand"><ArrowLeft size={16} />All services</Link>
            <h2 className="heading mt-6 text-4xl">Overview</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{s.description}</p>
            <h3 className="heading mt-12 text-2xl">What's included</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.points.map((p) => (
                <div key={p} className="flex gap-3 rounded-lg border border-slate-200 p-5"><CheckCircle2 className="shrink-0 text-brand" /><span className="font-semibold">{p}</span></div>
              ))}
            </div>
            {s.id === "training-provider" && <div className="mt-10"><ButtonLink to="/training">Browse course catalogue</ButtonLink></div>}
          </div>
          <aside className="grid h-fit gap-6">
            <div className="rounded-lg bg-brand p-8 text-white">
              <Icon size={36} />
              <h3 className="heading mt-4 text-2xl">Interested in {s.title}?</h3>
              <p className="mt-2 text-white/85">Get a tailored proposal from our team.</p>
              <div className="mt-6"><ButtonLink to="/contact" variant="light">Enquire now</ButtonLink></div>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">Other services</p>
              <div className="mt-4 grid">
                {others.map((o) => <Link key={o.id} to={`/services/${o.id}`} className="flex items-center justify-between border-b border-slate-100 py-3 font-semibold last:border-0 hover:text-brand">{o.title}<ArrowRight size={16} /></Link>)}
              </div>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}

export function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="heading text-8xl text-brand">404</p>
        <h1 className="heading mt-4 text-3xl">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you're looking for doesn't exist.</p>
        <div className="mt-8"><ButtonLink to="/">Back to home</ButtonLink></div>
      </div>
    </main>
  );
}
