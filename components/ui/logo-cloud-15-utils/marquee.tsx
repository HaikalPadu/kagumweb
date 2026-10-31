import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  duration?: number; // duration in seconds
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 75,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{
        ...style,
        "--gap": "2rem",
      } as CSSProperties}
      className={cn(
        "group flex overflow-hidden p-2 [gap:var(--gap)]",
        { "flex-row": !vertical, "flex-col": vertical },
        className,
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          style={{
            animation: `${vertical ? "marquee-vertical" : "marquee"} ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "flex-row": !vertical,
            "flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
