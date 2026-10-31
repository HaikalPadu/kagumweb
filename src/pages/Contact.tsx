import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Container, PageBanner } from "@/src/components/ui-kit";
import { contact, images, services } from "@/src/data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Website enquiry: ${f.get("topic")}`;
    const body = `Name: ${f.get("name")}\nCompany: ${f.get("company") || "-"}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone") || "-"}\nTopic: ${f.get("topic")}\n\n${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const items = [
    { icon: Phone, title: "Call us", lines: [contact.phone], href: contact.phoneHref },
    { icon: Mail, title: "Email us", lines: [contact.email], href: `mailto:${contact.email}` },
    { icon: MapPin, title: "Head office", lines: contact.hq },
    { icon: MapPin, title: "Branch", lines: contact.branch },
    { icon: Clock, title: "Office hours", lines: ["Monday – Friday", "9:00 AM – 6:00 PM"] },
  ];

  return (
    <main>
      <PageBanner eyebrow="Contact us" title={<>Let's talk about <span className="text-brand-light">your next step.</span></>} text="Tell us what you're working towards and we'll help you find the right programme or service." image={images.contact} />
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[380px_1fr]">
          <div className="grid h-fit gap-4">
            {items.map(({ icon: Icon, title, lines, href }) => {
              const inner = (
                <>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-brand text-white"><Icon size={20} /></span>
                  <span><b className="block text-sm uppercase tracking-wider">{title}</b><span className="text-slate-600">{lines.map((l) => <span key={l} className="block">{l}</span>)}</span></span>
                </>
              );
              return href
                ? <a key={title} href={href} className="flex gap-4 rounded-lg border border-slate-200 p-5 transition hover:border-brand">{inner}</a>
                : <div key={title} className="flex gap-4 rounded-lg border border-slate-200 p-5">{inner}</div>;
            })}
          </div>
          <form onSubmit={submit} className="rounded-lg bg-slate-50 p-8 md:p-12">
            <h2 className="heading text-3xl">Send us a message</h2>
            <p className="mt-2 text-slate-600">We usually reply within one working day.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label>Full name *<input name="name" required placeholder="Your name" /></label>
              <label>Company<input name="company" placeholder="Optional" /></label>
              <label>Email *<input name="email" type="email" required placeholder="you@company.com" /></label>
              <label>Phone<input name="phone" type="tel" placeholder="01X-XXX XXXX" /></label>
            </div>
            <label className="mt-5">I'm interested in<select name="topic">{services.map((s) => <option key={s.id}>{s.title}</option>)}<option>Career enquiry</option><option>Other</option></select></label>
            <label className="mt-5">Message *<textarea name="message" required rows={5} placeholder="Tell us a little about what you need..." /></label>
            {sent ? (
              <div className="mt-6 flex gap-3 rounded-md bg-green-50 p-4 font-semibold text-green-800"><CheckCircle2 className="shrink-0" />Your email app has opened with your enquiry — just press send to reach our team.</div>
            ) : (
              <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark">Send enquiry <Send size={16} /></button>
            )}
          </form>
        </Container>
      </section>
      <iframe title="Kagum Advance office location" src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`} className="block h-[450px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </main>
  );
}
