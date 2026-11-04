import { useState } from "react";
import { ImagePlus, CalendarDays } from "lucide-react";
import { Container, PageBanner } from "@/src/components/ui-kit";
import { images } from "@/src/data/content";

// Add each role's poster at its own path below, or replace the path with your filename.
const positions = [
  { title: "Software Engineering", poster: "/assets/enhanced/gambarse.png" },
  { title: "Digital Marketing", poster: "/assets/enhanced/gambardm.png" },
  { title: "Administration", poster: "/assets/enhanced/gambaradmin.png" },
];

function Poster({ src, title }: { src: string; title: string }) {
  const [missing, setMissing] = useState(false);
  return missing ? <div className="flex aspect-[3/4] flex-col items-center justify-center gap-4 bg-slate-50 p-8 text-center text-slate-500"><ImagePlus size={40} strokeWidth={1} aria-hidden="true" /><p className="font-semibold">{title} poster</p><p className="text-sm">Coming soon</p></div> : <img src={src} alt={`${title} recruitment poster`} onError={() => setMissing(true)} loading="lazy" className="h-auto w-full object-contain" />;
}

export default function Career() {
  return <main>
    <PageBanner eyebrow="CAREER" title="Join the team at Kagum Academy." text="We're on a mission to build exciting digital experiences. Come create, grow, and thrive with us." image={images.career} />
    <section className="py-20"><Container>
      <div className="mb-14 flex flex-col gap-5 rounded-xl border border-brand/20 bg-red-50 p-7 sm:flex-row sm:items-center"><CalendarDays size={32} className="shrink-0 text-brand" aria-hidden="true" /><div><h2 className="heading text-2xl text-ink">Applications open in December</h2><p className="mt-3 leading-relaxed text-slate-600">Explore the positions we offer and look out for our recruitment posters.</p></div></div>
      <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-slate-200"><Poster src="/assets/enhanced/gambarposter.png" title="Kagum Academy" /></div>
      <div className="mt-20"><p className="text-xs font-bold uppercase tracking-widest text-brand">Join our team</p><h2 className="heading mt-4 text-3xl sm:text-4xl">Positions we offer</h2>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-3">{positions.map((position) => <article key={position.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-300 hover:shadow-lg"><div className="border-b border-slate-200 p-6"><h3 className="heading text-2xl">{position.title}</h3><p className="mt-3 text-sm font-medium text-brand">Applications open in December</p></div><Poster src={position.poster} title={position.title} /></article>)}</div>
      </div>
    </Container></section>
  </main>;
}
