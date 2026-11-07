import useApplication from "@/src/components/useApplication";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Container, PageBanner } from "@/src/components/ui-kit";
import { readDraft } from "@/src/components/EnquiryForm";
import { contact, images, services } from "@/src/data/content";

export default function Contact() {
  const [draft] = useState(readDraft);
  const { submit, pending, status, sent } = useApplication("Contact enquiry");

  const items = [
    { icon: Phone, title: "WhatsApp us", lines: [contact.phone], href: contact.phoneHref },
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
            <p className="mt-2 text-slate-600">Send your enquiry directly to info@kagum.co.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label>Full name *<input name="name" defaultValue={draft?.name} required placeholder="Your name" /></label>
              <label>Company<input name="company" placeholder="Optional" /></label>
              <label>Email *<input name="email" defaultValue={draft?.email} type="email" required placeholder="you@company.com" /></label>
              <label>Phone<input name="phone" defaultValue={draft?.phone} type="tel" placeholder="01X-XXX XXXX" /></label>
            </div>
            <label className="mt-5">I'm interested in<select name="topic" defaultValue={draft?.topic}>{services.map((s) => <option key={s.id}>{s.title}</option>)}<option>Career enquiry</option><option>Programme registration</option><option>Other</option></select></label>
            <label className="mt-5">Message *<textarea name="message" defaultValue={draft?.message} required rows={5} placeholder="Tell us a little about what you need..." /></label>
            {sent ? (
              <div className="mt-6 flex gap-3 rounded-md bg-green-50 p-4 font-semibold text-green-800"><CheckCircle2 className="shrink-0" />Your enquiry has been sent to info@kagum.co.</div>
            ) : (
              <button disabled={pending} type="submit" className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark">{pending ? "Sending…" : "Send enquiry"} <Send size={16} /></button>
            )}
            {!sent && status && <p role="alert" className="mt-5 text-brand">{status}</p>}
          </form>
        </Container>
      </section>
      <iframe title="Kagum Advance office location" src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`} className="block h-[450px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    </main>
  );
}
