"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type CloudLogo = { name: string; logo: string };
type LogoCloudProps = { logos: CloudLogo[]; title?: string; titleSuffix?: string };

const PIXELS_PER_SECOND = 75;

export default function LogoCloud({ logos, title = "Trusted by & collaborating with", titleSuffix = "leading organisations" }: LogoCloudProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const observer = new ResizeObserver(() => setDistance(group.getBoundingClientRect().width));
    observer.observe(group);
    return () => observer.disconnect();
  }, [logos]);
  if (!logos.length) return null;
  return <section className="bg-white py-8 sm:py-12" aria-label="Collaborations and clients">
    <h2 className="mx-auto mb-10 max-w-3xl px-4 text-center text-xl font-semibold leading-relaxed text-ink sm:mb-14 sm:text-2xl">{title} {titleSuffix}</h2>
    <div className="collaborator-slider collaborator-fade overflow-hidden py-5" role="region" aria-label="Automatically scrolling collaborator logos" tabIndex={0}>
      <div className="collaborator-track" style={{ "--logo-duration": `${distance ? distance / PIXELS_PER_SECOND : 120}s` } as CSSProperties}>
        {[0, 1].map((copy) => <div key={copy} ref={copy === 0 ? groupRef : undefined} className="collaborator-group" aria-hidden={copy === 1 ? true : undefined}>
          {logos.map((logo) => <div key={logo.name} className="flex h-28 shrink-0 items-center justify-center sm:h-32">
            <img src={logo.logo} alt={copy === 1 ? "" : logo.name} draggable={false} className="collaborator-logo" />
          </div>)}
        </div>)}
      </div>
    </div>
  </section>;
}
