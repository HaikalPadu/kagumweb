"use client";

import { useState } from "react";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";

type NavItem = { to: string; label: string };
const defaultLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact us" },
];

function AnimatedLink({ item, path, mobile }: { item: NavItem; path: string; mobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const current = item.to === "/" ? path === "/" : path.startsWith(item.to);
  const contact = item.to === "/contact";
  return <a href={`#${item.to}`} aria-current={current ? "page" : undefined}
    onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    className={mobile
      ? `border-b border-slate-100 py-4 font-bold uppercase tracking-wider ${current ? "text-brand" : "text-ink"}`
      : contact
        ? "rounded-md bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
        : `relative py-2 text-sm font-bold uppercase tracking-wider transition hover:text-brand ${current ? "text-brand after:absolute after:inset-x-0 after:-bottom-[25px] after:h-[3px] after:bg-brand" : "text-ink"}`}>
    <RandomLetterSwap label={item.label} active={hovered || focused} staggerDuration={.025} />
  </a>;
}

export default function RandomLetterSwapNav({ links = defaultLinks, path = "/", mobile = false }: { links?: NavItem[]; path?: string; mobile?: boolean }) {
  return <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? "grid py-3" : "hidden items-center gap-8 lg:flex"}>
    {links.map(item => <AnimatedLink key={item.to} item={item} path={path} mobile={mobile} />)}
  </nav>;
}
