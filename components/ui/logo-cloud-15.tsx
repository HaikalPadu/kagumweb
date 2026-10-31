"use client";

import { useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/logo-cloud-15-utils/border-beam";

const BEAM_DURATION = 15;
const BEAM_SIZE = 120;
const ITEMS_PER_PAGE = 6;

export type CloudLogo = { name: string; logo: string };

type LogoCloudProps = {
  logos: CloudLogo[];
  title?: string;
  titleSuffix?: string;
};

/**
 * Paginated carousel matching the original Wix 30-logo collaboration slideshow.
 * Displays 6 logos per page with Next / Prev buttons and pagination dots,
 * framed in the modern border-beam container.
 */
const LogoCloud = ({
  logos,
  title = "Trusted by & collaborating with",
  titleSuffix = "leading organisations",
}: LogoCloudProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const waveSpanRef = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(logos.length / ITEMS_PER_PAGE);

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentLogos = logos.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  useAnimationFrame((time) => {
    if (!(cardRef.current && textRef.current && waveSpanRef.current)) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = ((time - startTimeRef.current) / 1000) % BEAM_DURATION;
    const beamOffset = (elapsed / BEAM_DURATION) * 100;

    const cardRect = cardRef.current.getBoundingClientRect();
    const textRect = textRef.current.getBoundingClientRect();

    const W = cardRect.width;
    const H = cardRect.height;
    const perimeter = 2 * (W + H);

    const textLeft = Math.max(0, textRect.left - cardRect.left);
    const textRight = Math.min(W, textRect.right - cardRect.left);

    const textStartPercent = (textLeft / perimeter) * 100;
    const textEndPercent = (textRight / perimeter) * 100;

    const span = waveSpanRef.current;

    if (beamOffset >= textStartPercent && beamOffset <= textEndPercent) {
      const t = (beamOffset - textStartPercent) / (textEndPercent - textStartPercent);
      span.style.backgroundPosition = `${95 - t * 90}% center`;
    } else if (beamOffset < textStartPercent) {
      span.style.backgroundPosition = "0% center";
    } else {
      span.style.backgroundPosition = "100% center";
    }
  });

  return (
    <div className="relative mx-auto w-full max-w-(--breakpoint-lg) rounded-lg border border-slate-200 bg-white" ref={cardRef}>
      <BorderBeam className="isolate -z-1" duration={BEAM_DURATION} size={BEAM_SIZE} />

      {/* Top Title Tag */}
      <div className="absolute inset-x-0 top-0 flex -translate-y-1/2 items-center justify-center px-10">
        <p className="bg-white px-3 text-center text-lg font-semibold tracking-[-0.01em] text-ink/80 sm:px-6 sm:text-xl" ref={textRef}>
          <span
            ref={waveSpanRef}
            style={{
              backgroundImage:
                "linear-gradient(90deg, currentColor 0%, currentColor 45%, #ff4d5e 47%, #c8102e 50%, #ff4d5e 53%, currentColor 55%, currentColor 100%)",
              backgroundSize: "250% 100%",
              backgroundRepeat: "no-repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundPosition: "0% center",
            }}
          >
            {title} <span className="max-sm:hidden">{titleSuffix}</span>
          </span>
        </p>
      </div>

      {/* Main Carousel Display */}
      <div className="relative px-6 py-8 pt-12 sm:px-14 sm:py-10 sm:pt-14">
        {/* Previous Button */}
        <button
          type="button"
          onClick={prevPage}
          aria-label="Previous logos"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-brand hover:bg-slate-50 hover:text-brand sm:left-4"
        >
          <ChevronLeft size={20} />
        </button>

        {/* 6 Logos per slide */}
        <div className="grid min-h-[90px] grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {currentLogos.map((l) => (
            <div
              key={l.name}
              className="group flex h-20 w-full items-center justify-center p-2 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={l.logo}
                alt={l.name}
                title={l.name}
                draggable={false}
                className="max-h-14 w-auto max-w-full select-none object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextPage}
          aria-label="Next logos"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-brand hover:bg-slate-50 hover:text-brand sm:right-4"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination indicators and counter */}
      <div className="flex items-center justify-center gap-4 border-t border-slate-100 py-3">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${page === i ? "w-6 bg-brand" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-400">
          Page {page + 1} of {totalPages} ({logos.length} collaborators)
        </span>
      </div>
    </div>
  );
};

export default LogoCloud;
