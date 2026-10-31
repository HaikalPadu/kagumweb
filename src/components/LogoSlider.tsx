import { useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

export type Logo = { name: string; logo: string };

/**
 * Infinite logo slider inspired by the shadcnspace "hero-01" brand slider:
 * label + divider on the left, continuously scrolling logos that slow down
 * on hover, with progressive blur / fade on both edges.
 */
export default function LogoSlider({
  logos,
  label = "Trusted by leading organisations",
  speed = 18,
  speedOnHover = 6,
  gap = 72,
}: {
  logos: Logo[];
  label?: string;
  speed?: number; // pixels per second
  speedOnHover?: number;
  gap?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const current = useRef(speed);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || reduced) return;
    // Ease the speed toward the target for a smooth slow-down on hover.
    const target = hovered ? speedOnHover : speed;
    current.current += (target - current.current) * 0.03;
    const half = track.scrollWidth / 2;
    let next = x.get() - (current.current * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  const items = [...logos, ...logos];

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:gap-0">
      <div className="shrink-0 text-center md:w-56 md:border-r md:border-slate-200 md:pr-8 md:text-right">
        <p className="text-sm font-semibold leading-snug text-slate-500">{label}</p>
      </div>

      <div className="relative w-full overflow-hidden py-4 md:w-[calc(100%-14rem)]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <motion.div ref={trackRef} style={{ x, gap }} className="flex w-max items-center">
          {items.map((l, i) => (
            <div key={i} aria-hidden={i >= logos.length} className="flex h-16 shrink-0 items-center" style={{ paddingRight: i === items.length - 1 ? gap : 0 }}>
              <img src={l.logo} alt={i < logos.length ? l.name : ""} title={l.name} draggable={false} className="h-12 w-auto select-none object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-14" />
            </div>
          ))}
        </motion.div>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
        {/* Progressive blur */}
        <ProgressiveBlur side="left" />
        <ProgressiveBlur side="right" />
      </div>
    </div>
  );
}

function ProgressiveBlur({ side }: { side: "left" | "right" }) {
  // Strongest blur covers the outermost slice; lighter blur extends further in.
  const layers = [8, 4, 2, 1];
  const dir = side === "left" ? "to right" : "to left";
  return (
    <div className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-24`}>
      {layers.map((blur, i) => {
        const start = (i / layers.length) * 100;
        const end = ((i + 1) / layers.length) * 100;
        const mask = `linear-gradient(${dir}, rgba(0,0,0,1) ${start}%, rgba(0,0,0,0) ${end}%)`;
        return <div key={blur} className="absolute inset-0" style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: mask, WebkitMaskImage: mask }} />;
      })}
    </div>
  );
}
