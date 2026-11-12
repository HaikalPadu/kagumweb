"use client";

import { useId, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { socialPackages, contentPackages } from "@/src/data/wix-copy";
import "./pricing.css";

export type DigitalPlanSelection = { service: string; option: string };

const groups = [
  { id: "social", label: "Social Media Management", plans: socialPackages, descriptions: ["Facebook & Instagram", "Daily content for Facebook & Instagram", "Facebook, Instagram & TikTok"], options: ["Bronze — RM 1300", "Silver — RM 1700", "Gold — RM 2100"] },
  { id: "content", label: "Content Creation", plans: contentPackages, descriptions: ["10 high-quality posts", "20 high-quality posts", "30 high-quality posts"], options: ["10 posts — RM 600", "20 posts — RM 1100", "30 posts — RM 1500"] },
];

export function PricingSection({ onSelect }: { onSelect: (plan: DigitalPlanSelection) => void }) {
  const [group, setGroup] = useState("social");
  const layoutId = useId();
  const reduced = useReducedMotion();
  return <section className="py-20" aria-labelledby={`${layoutId}-heading`}>
    <div className="mx-auto w-[min(1280px,calc(100%-40px))]">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-brand">Package pricing</p>
        <h2 id={`${layoutId}-heading`} className="heading mt-4 text-4xl md:text-5xl">Make room for <span className="text-brand">growth.</span></h2>
        <p className="mt-5 leading-relaxed text-slate-600">Explore our social media management and content creation packages. Find the right fit for your business.</p>
      </div>
      <LayoutGroup id={layoutId}>
        <Tabs.Root value={group} onValueChange={setGroup} className="mt-8">
          <Tabs.List aria-label="Pricing services" className="pricing-toggle">
            {groups.map(item => <Tabs.Trigger key={item.id} value={item.id} className="pricing-toggle-button">
              {group === item.id && <motion.span layoutId="pricing-selection" className="pricing-toggle-selection" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }} aria-hidden="true" />}
              <span className="relative z-10">{item.label}</span>
            </Tabs.Trigger>)}
          </Tabs.List>
          {groups.map(item => <Tabs.Content key={item.id} value={item.id} className="mt-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }} className="grid items-stretch gap-6 lg:grid-cols-3">
              {item.plans.map((plan, index) => {
                const featured = index === 2;
                return <article key={plan.name} className={`pricing-card ${featured ? "pricing-card-featured" : ""}`}>
                  {featured && <BorderTrail />}
                  <div className="pricing-card-header">
                    {featured && item.id === "social" && <span className="pricing-badge"><Sparkles size={12} aria-hidden="true" />TikTok included</span>}
                    <h3 className="heading text-xl">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.descriptions[index]}</p>
                    <p className="heading mt-7 flex flex-wrap items-baseline gap-x-2 text-brand"><span className="text-lg">RM</span><span className="text-5xl">{plan.price.replace("RM ", "")}</span></p>
                  </div>
                  <ul className="flex-1 space-y-5 p-7 text-sm leading-relaxed">
                    {plan.lines.map(line => <li key={line} className="flex items-start gap-3"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" /><span className={line === "FREE" || line === "CONTENT CREATION" ? "text-xs font-bold tracking-wider text-ink" : "text-slate-600"}>{line}</span></li>)}
                  </ul>
                  <div className="border-t border-slate-200 p-5">
                    <button type="button" className="pricing-cta" onClick={() => onSelect({ service: item.label, option: item.options[index]! })} aria-label={`Enquire about ${plan.name.toLowerCase()}`}>
                      Enquire about this package <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </article>;
              })}
            </motion.div>
          </Tabs.Content>)}
        </Tabs.Root>
      </LayoutGroup>
    </div>
  </section>;
}

export function BorderTrail() {
  return <div className="pricing-trail" aria-hidden="true"><span /></div>;
}
