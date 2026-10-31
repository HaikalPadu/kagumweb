import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { Container, PageBanner } from "@/src/components/ui-kit";
import { images } from "@/src/data/content";

// Replace this path (or add the file at this location) when the hiring poster is ready.
const careerPoster = "/assets/career-poster.jpg";

export default function Career() {
  const [posterMissing, setPosterMissing] = useState(false);
  return <main>
    <PageBanner eyebrow="CAREER" title="Join the team at Kagum Academy." text="We're on a mission to build exciting digital experiences. Come create, grow, and thrive with us." image={images.career} />
    <section className="py-20"><Container><div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      {posterMissing ? <div className="flex aspect-[3/4] flex-col items-center justify-center gap-5 p-8 text-center text-slate-500"><ImagePlus size={48} strokeWidth={1} aria-hidden="true" /><h2 className="heading text-2xl text-ink">Career poster</h2></div> : <img src={careerPoster} alt="Kagum Academy hiring poster" onError={() => setPosterMissing(true)} className="h-auto w-full object-contain" />}
    </div></Container></section>
  </main>;
}
