"use client";

// Adapted from cnippet-dev's Random Letter Swap on 21st.dev.
import { useCallback, useEffect, useRef } from "react";
import { type AnimationOptions, motion, useAnimate, useReducedMotion } from "motion/react";

const defaultTransition: AnimationOptions = { duration: .6, type: "spring" };

export type RandomLetterSwapProps = {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  className?: string;
  active?: boolean;
};

export function RandomLetterSwap({ label, reverse = true, transition = defaultTransition, staggerDuration = .025, className = "", active = false }: RandomLetterSwapProps) {
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const blocked = useRef(false);
  const reduced = useReducedMotion();
  const play = useCallback(async () => {
    if (blocked.current || reduced || !scope.current || !label.length) return;
    blocked.current = true;
    const order = Array.from({ length: Array.from(label).length }, (_, index) => index);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j]!, order[i]!];
    }
    try {
      await Promise.all(order.map(async (index, rank) => {
        const options = { ...transition, delay: rank * staggerDuration };
        await Promise.all([
          animate(`[data-letter="${index}"]`, { y: reverse ? "100%" : "-100%" }, options),
          animate(`[data-letter-copy="${index}"]`, { y: "0%" }, options),
        ]);
        if (!scope.current) return;
        await Promise.all([
          animate(`[data-letter="${index}"]`, { y: "0%" }, { duration: 0 }),
          animate(`[data-letter-copy="${index}"]`, { y: reverse ? "-100%" : "100%" }, { duration: 0 }),
        ]);
      }));
    } finally {
      blocked.current = false;
    }
  }, [animate, label, reduced, reverse, scope, staggerDuration, transition]);

  useEffect(() => { if (active) void play(); }, [active, play]);

  return <span ref={scope} className={`relative inline-flex items-center overflow-hidden align-middle ${className}`} onPointerEnter={() => void play()}>
    <span className="sr-only">{label}</span>
    {Array.from(label).map((letter, index) => <span key={index} aria-hidden="true" className="relative inline-block whitespace-pre" style={{ height: "1.4em", lineHeight: "1.4" }}>
      <motion.span data-letter={index} className="inline-block">{letter}</motion.span>
      <motion.span data-letter-copy={index} className="absolute inset-0 inline-block" style={{ y: reverse ? "-100%" : "100%" }}>{letter}</motion.span>
    </span>)}
  </span>;
}

export default RandomLetterSwap;
