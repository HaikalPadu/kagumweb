import { useState } from "react";
import { Container, PageBanner, SectionTitle } from "@/src/components/ui-kit";
import WixContactDetails from "@/src/components/WixContactDetails";
import { images } from "@/src/data/content";
import { contentPackages, socialPackages, welcome } from "@/src/data/wix-copy";

const offers = [
  { title: "SOCIAL MEDIA MANAGEMENT", subtitle: "(FACEBOOK, INSTAGRAM, TIKTOK)", price: "RM 56", note: "PER POST, WITH SCHEDULING , & COPYWRITING" },
  { title: "DIGITAL ADVERTISING SERVICES", subtitle: "", price: "RM 100", note: "PER MANAGEMENT FEE" },
  { title: "CONTENT CREATION", subtitle: "(FACEBOOK, INSTAGRAM, TIKTOK)", price: "RM 50", note: "PER POST, WITH COPYWRITING" },
  { title: "WEB DEVELOPMENT", subtitle: "Single Landing Page · Corporate Business Website · Blog · E-commerce · Custom", price: "RM 500", note: "WITH CUSTOM DESIGN" },
];

function Packages({ items }: { items: typeof contentPackages }) {
  return <div className="mt-10 grid gap-6 lg:grid-cols-3">{items.map((p, i) => <article key={p.name} className={`flex flex-col rounded-xl border p-7 md:p-9 ${i === 2 ? "border-brand bg-ink text-white" : "border-slate-200 bg-white"}`}><h3 className="heading text-2xl">{p.name}</h3><p className="heading mt-6 text-4xl text-brand-light">{p.price}</p><ul className="mt-8 grid flex-1 content-start gap-4 text-sm leading-relaxed">{p.lines.map((line) => <li key={line} className={line === "FREE" ? "font-extrabold text-brand-light" : ""}>{line}</li>)}</ul></article>)}</div>;
}

export default function DigitalMarketing() {
  const [submitted, setSubmitted] = useState(false);
  return <main>
    <PageBanner eyebrow="Services" title="DIGITAL MARKETING SERVICES" text={welcome} image={images.hero} />
    <section className="py-20"><Container><SectionTitle eyebrow="OUR CLIENTS" title="IMPACT" /><div className="mt-10 grid gap-8 sm:grid-cols-3">{[["1,200,000+", "Video Views"], ["750,000+", "Audience Reached"], ["17,000+", "Engaged Audience"]].map(([value, label]) => <div key={label} className="border-l-4 border-brand pl-6"><p className="heading text-4xl md:text-5xl">{value}</p><p className="mt-3 text-slate-600">{label}</p></div>)}</div>
    <div className="mt-16 grid gap-8 md:grid-cols-3">{[["Improve brand visibilities", "Help people find your products with ads that appear in related results and brand pages."], ["Reach new followers", "Make your brand or services stand out with engaging creative formats."], ["Sell your image with efficiency", "By using keywords to appear in relevant results, you can engage viewers who have yet to discover your brand."]].map(([title, text]) => <article key={title}><h3 className="heading text-xl">{title}</h3><p className="mt-4 leading-relaxed text-slate-600">{text}</p></article>)}</div></Container></section>
    <section className="bg-slate-50 py-20"><Container><SectionTitle eyebrow="OUR" title="SERVICES" /><div className="mt-10 grid gap-6 md:grid-cols-2">{offers.map((offer) => <article key={offer.title} className="rounded-xl bg-white p-8"><h3 className="heading text-2xl">{offer.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-500">{offer.subtitle}</p><p className="mt-8 text-xs font-bold tracking-widest">AS LOW AS</p><p className="heading mt-2 text-5xl text-brand">{offer.price}<span className="ml-2 text-xl">+</span></p><p className="mt-4 text-xs font-bold leading-relaxed">{offer.note}</p></article>)}</div></Container></section>
    <section className="py-20"><Container><SectionTitle eyebrow="PACKAGE PRICING" title="SOCIAL MEDIA MANAGEMENT" /><Packages items={socialPackages} /><div className="mt-20"><SectionTitle eyebrow="PACKAGE PRICING" title="CONTENT CREATION" /><Packages items={contentPackages} /></div></Container></section>
    <section className="bg-ink py-20"><Container><div className="mx-auto max-w-2xl rounded-xl bg-white p-8 md:p-12"><h2 className="heading text-3xl">APPLY SERVICES HERE!</h2><form className="mt-8 grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Email<input type="email" required /></label><label>Phone<input type="tel" required /></label><label>Address<input required /></label><label>Service<select required defaultValue=""><option value="" disabled>Select service</option>{offers.map((o) => <option key={o.title}>{o.title}</option>)}</select></label><button className="rounded-md bg-brand px-6 py-3 font-bold text-white">Submit</button>{submitted && <p role="status" className="text-sm text-slate-600">This local form is not connected to email yet. Please contact info@kagum.co to apply.</p>}</form></div></Container></section>
    <WixContactDetails />
  </main>;
}
