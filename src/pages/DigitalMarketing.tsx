import { useState } from "react";
import { PricingSection, type DigitalPlanSelection } from "@/components/ui/pricing";
import DigitalApplication from "@/src/components/DigitalApplication";
import { FormGraphic } from "@/src/components/SectionGraphics";
import { Container, PageBanner, SectionTitle } from "@/src/components/ui-kit";
import WixContactDetails from "@/src/components/WixContactDetails";
import { services } from "@/src/data/content";
import { welcome } from "@/src/data/wix-copy";

const offers = [
  { title: "SOCIAL MEDIA MANAGEMENT", subtitle: "(FACEBOOK, INSTAGRAM, TIKTOK)", price: "RM 56", note: "PER POST, WITH SCHEDULING , & COPYWRITING" },
  { title: "DIGITAL ADVERTISING SERVICES", subtitle: "", price: "RM 100", note: "PER MANAGEMENT FEE" },
  { title: "CONTENT CREATION", subtitle: "(FACEBOOK, INSTAGRAM, TIKTOK)", price: "RM 50", note: "PER POST, WITH COPYWRITING" },
  { title: "WEB DEVELOPMENT", subtitle: "Single Landing Page · Corporate Business Website · Blog · E-commerce · Custom", price: "RM 500", note: "WITH CUSTOM DESIGN" },
];

export default function DigitalMarketing() {
  const [selection, setSelection] = useState<DigitalPlanSelection>();
  function selectPlan(plan: DigitalPlanSelection) {
    setSelection(plan);
    document.getElementById("digital-application")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }
  return <main>
    <PageBanner eyebrow="Services" title="Kagum Digital" text={welcome} image={services.find(s => s.id === "digital")!.image} video="/assets/KagumDigitalFootage.mp4" />
    <section className="py-20"><Container><SectionTitle eyebrow="OUR CLIENTS" title="IMPACT" /><div className="mt-10 grid gap-8 sm:grid-cols-3">{[["1,200,000+", "Video Views"], ["750,000+", "Audience Reached"], ["17,000+", "Engaged Audience"]].map(([value, label]) => <div key={label} className="border-l-4 border-brand pl-6"><p className="heading text-4xl md:text-5xl">{value}</p><p className="mt-3 text-slate-600">{label}</p></div>)}</div>
    <div className="mt-16 grid gap-8 md:grid-cols-3">{[["Improve brand visibilities", "Help people find your products with ads that appear in related results and brand pages."], ["Reach new followers", "Make your brand or services stand out with engaging creative formats."], ["Sell your image with efficiency", "By using keywords to appear in relevant results, you can engage viewers who have yet to discover your brand."]].map(([title, text]) => <article key={title}><h3 className="heading text-xl">{title}</h3><p className="mt-4 leading-relaxed text-slate-600">{text}</p></article>)}</div></Container></section>
    <section className="bg-slate-50 py-20"><Container><SectionTitle eyebrow="OUR" title="SERVICES" /><div className="mt-10 grid gap-6 md:grid-cols-2">{offers.map((offer) => <article key={offer.title} className="rounded-xl bg-white p-8"><h3 className="heading text-2xl">{offer.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-500">{offer.subtitle}</p><p className="mt-8 text-xs font-bold tracking-widest">AS LOW AS</p><p className="heading mt-2 text-5xl text-brand">{offer.price}<span className="ml-2 text-xl">+</span></p><p className="mt-4 text-xs font-bold leading-relaxed">{offer.note}</p></article>)}</div></Container></section>
    <PricingSection onSelect={selectPlan} />
    <section id="digital-application" className="scroll-mt-24 bg-ink py-20"><Container><div className="form-panel mx-auto max-w-2xl rounded-xl bg-white p-8 md:p-12"><FormGraphic kind="digital" /><h2 className="heading text-3xl">APPLY SERVICES HERE!</h2><DigitalApplication selection={selection} /></div></Container></section>
    <WixContactDetails />
  </main>;
}
