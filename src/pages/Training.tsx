import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { ButtonLink, Container, CtaBand, PageBanner } from "@/src/components/ui-kit";
import { courseTracks, images } from "@/src/data/content";

const ALL = "All courses";

export default function Training() {
  const tracks = Object.keys(courseTracks);
  const [track, setTrack] = useState(ALL);
  const [query, setQuery] = useState("");
  const total = Object.values(courseTracks).flat().length;

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return (track === ALL ? tracks : [track])
      .map((t) => ({ track: t, courses: courseTracks[t].filter((c) => c.toLowerCase().includes(q)) }))
      .filter((g) => g.courses.length);
  }, [track, query]);

  return (
    <main>
      <PageBanner eyebrow="HRDC Training Provider" title={<>{total}+ courses. <span className="text-brand-light">HRD Corp claimable.</span></>} text="Practical programmes across nine training pillars — from entrepreneurship and leadership to AI and robotics." image={images.training} />
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit lg:sticky lg:top-28">
            <label className="relative block">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses..." className="!mt-0 !pl-11" />
            </label>
            <p className="mt-8 text-xs font-extrabold uppercase tracking-widest text-slate-500">Training pillars</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
              {[ALL, ...tracks].map((t) => (
                <button key={t} onClick={() => setTrack(t)} className={`shrink-0 rounded-md px-4 py-3 text-left text-sm font-semibold transition ${track === t ? "bg-brand text-white" : "bg-slate-50 hover:bg-slate-100"}`}>
                  {t} <span className="opacity-60">({t === ALL ? total : courseTracks[t].length})</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="grid gap-12">
            {results.length === 0 && <p className="rounded-lg bg-slate-50 p-10 text-center text-slate-500">No courses match "{query}".</p>}
            {results.map((g) => (
              <div key={g.track}>
                <h2 className="heading flex items-center gap-3 border-b-2 border-brand pb-3 text-2xl">{g.track}<span className="text-sm font-bold text-slate-400">{g.courses.length}</span></h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {g.courses.map((c) => (
                    <div key={c} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-50 text-brand"><BookOpen size={18} /></span>
                      <div>
                        <h3 className="font-bold leading-snug">{c}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">HRDC claimable</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-slate-50 p-8 md:flex-row md:items-center">
              <div><h3 className="heading text-2xl">Need an in-house or customised programme?</h3><p className="mt-2 text-slate-600">We tailor any course to your team's goals and schedule.</p></div>
              <ButtonLink to="/contact">Request a programme</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </main>
  );
}
