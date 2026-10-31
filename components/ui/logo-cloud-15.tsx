"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { BorderBeam } from "./logo-cloud-15-utils/border-beam";

export type CloudLogo = { name: string; logo: string };
type LogoCloudProps = { logos: CloudLogo[]; title?: string; titleSuffix?: string };
const BEAM_DURATION = 15;

export default function LogoCloud({ logos, title = "Trusted by & collaborating with", titleSuffix = "leading organisations" }: LogoCloudProps) {
  const card = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLParagraphElement>(null);
  const wave = useRef<HTMLSpanElement>(null);
  const start = useRef<number | null>(null);
  const reduced = useReducedMotion();
  useAnimationFrame((time) => {
    if (reduced || !card.current || !text.current || !wave.current) return;
    if (start.current === null) start.current = time;
    const progress = (((time - start.current) / 1000) % BEAM_DURATION) / BEAM_DURATION * 100;
    const frame = card.current.getBoundingClientRect();
    const label = text.current.getBoundingClientRect();
    const perimeter = 2 * (frame.width + frame.height);
    const from = Math.max(0, label.left - frame.left) / perimeter * 100;
    const to = Math.min(frame.width, label.right - frame.left) / perimeter * 100;
    wave.current.style.backgroundPosition = `${progress >= from && progress <= to && to > from ? 95 - (progress - from) / (to - from) * 90 : progress < from ? 0 : 100}% center`;
  });
  if (!logos.length) return null;
  return <div className="py-8 sm:py-12">
    <div ref={card} className="relative mx-auto w-full rounded-xl border border-slate-200 bg-white">
      {!reduced && <BorderBeam duration={BEAM_DURATION} size={100} />}
      <div className="absolute inset-x-0 top-0 z-10 flex -translate-y-1/2 justify-center px-5 sm:px-10">
        <p ref={text} className="bg-white px-3 text-center text-sm font-semibold leading-relaxed text-ink/80 sm:px-6 sm:text-xl">
          <span ref={wave} style={{ backgroundImage: "linear-gradient(90deg,currentColor 0%,currentColor 45%,#ff4d5e 47%,#c8102e 50%,#ff4d5e 53%,currentColor 55%,currentColor 100%)", backgroundSize: "250% 100%", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundPosition: "0% center" }}>{title} <span className="hidden sm:inline">{titleSuffix}</span></span>
        </p>
      </div>
      <div className="px-3 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-12">
        <div className="collaborator-slider collaborator-fade overflow-hidden" role="region" aria-label="Collaborators and clients" tabIndex={0}>
          <div className="collaborator-track" style={{ "--logo-duration": `${Math.max(180, logos.length * 24)}s`, animationPlayState: "running" } as CSSProperties}>
            {[0, 1].map((copy) => <div key={copy} className="collaborator-group" aria-hidden={copy === 1 ? true : undefined}>{logos.map((logo) => <div key={logo.name} className="flex h-24 w-40 shrink-0 items-center justify-center px-4"><img src={logo.logo} alt={copy === 1 ? "" : logo.name} draggable={false} className="max-h-16 max-w-full object-contain" /></div>)}</div>)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}
