import { useEffect, useState, type ReactNode, type MouseEvent } from "react";

// Lightweight hash router: works on any static host without server rewrites.
const read = () => (window.location.hash.replace(/^#/, "") || "/").split("?")[0];

export function useRoute() {
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => { setPath(read()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export function navigate(to: string) {
  window.location.hash = to;
}

export function Link({ to, className, children, onClick }: { to: string; className?: string; children: ReactNode; onClick?: (e: MouseEvent) => void }) {
  return <a href={`#${to}`} className={className} onClick={onClick}>{children}</a>;
}
