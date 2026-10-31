/** Minimal className joiner (shadcn-style `cn`) without extra dependencies. */
export function cn(...inputs: Array<string | false | null | undefined | Record<string, boolean>>) {
  return inputs
    .flatMap((i) => (i && typeof i === "object" ? Object.entries(i).filter(([, v]) => v).map(([k]) => k) : [i]))
    .filter(Boolean)
    .join(" ");
}
