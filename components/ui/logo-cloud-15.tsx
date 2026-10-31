import { useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";

export type CloudLogo = { name: string; logo: string };
type LogoCloudProps = { logos: CloudLogo[]; title?: string; titleSuffix?: string };

export default function LogoCloud({ logos, title = "Trusted by & collaborating with", titleSuffix = "leading organisations" }: LogoCloudProps) {
  const [paused, setPaused] = useState(false);
  if (!logos.length) return null;
  return <div className="rounded-xl border border-slate-200 bg-white py-8">
    <div className="flex items-center justify-between gap-5 px-6"><h2 className="text-base font-semibold leading-relaxed text-ink sm:text-xl">{title} {titleSuffix}</h2><button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play logo slider" : "Pause logo slider"} aria-pressed={paused} className="rounded-full border border-slate-200 p-3 text-slate-600">{paused ? <Play size={18} /> : <Pause size={18} />}</button></div>
    <div className="collaborator-slider mt-7 overflow-hidden" role="region" aria-label="Collaborators and clients" tabIndex={0}>
      <div className="collaborator-track" style={{ "--logo-duration": `${Math.max(180, logos.length * 24)}s`, animationPlayState: paused ? "paused" : "running" } as CSSProperties}>
        {[0, 1].map((copy) => <div key={copy} className="collaborator-group" aria-hidden={copy === 1 ? true : undefined}>{logos.map((logo) => <div key={logo.name} className="flex h-24 w-40 shrink-0 items-center justify-center px-4"><img src={logo.logo} alt={copy === 1 ? "" : logo.name} draggable={false} className="max-h-20 max-w-full object-contain" /></div>)}</div>)}
      </div>
    </div>
  </div>;
}
