"use client";

import type { CSSProperties } from "react";

export type CloudLogo = { name: string; logo: string };
type LogoCloudProps = { logos: CloudLogo[]; title?: string; titleSuffix?: string };

// Each 160px logo has 48px of breathing room. Keep speed independent of logo count.
const LOGO_STEP = 208;
const PIXELS_PER_SECOND = 40;

export default function LogoCloud({ logos, title = "Trusted by & collaborating with", titleSuffix = "leading organisations" }: LogoCloudProps) {
  if (!logos.length) return null;
  return <section className="bg-white py-8 sm:py-12" aria-label="Collaborations and clients">
    <h2 className="mx-auto mb-10 max-w-3xl px-4 text-center text-xl font-semibold leading-relaxed text-ink sm:mb-14 sm:text-2xl">{title} {titleSuffix}</h2>
    <div className="collaborator-slider collaborator-fade overflow-hidden py-5" role="region" aria-label="Automatically scrolling collaborator logos" tabIndex={0}>
      <div className="collaborator-track" style={{ "--logo-duration": `${logos.length * LOGO_STEP / PIXELS_PER_SECOND}s` } as CSSProperties}>
        {[0, 1].map((copy) => <div key={copy} className="collaborator-group" aria-hidden={copy === 1 ? true : undefined}>
          {logos.map((logo) => <div key={logo.name} className="flex h-24 w-40 shrink-0 items-center justify-center px-3">
            <img src={logo.logo} alt={copy === 1 ? "" : logo.name} width={136} height={80} draggable={false} className="max-h-20 w-auto max-w-full object-contain" />
          </div>)}
        </div>)}
      </div>
    </div>
  </section>;
}
