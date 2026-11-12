import { ButtonLink, Container, PageBanner, SectionTitle } from "@/src/components/ui-kit";
import { courseTracks, services } from "@/src/data/content";
import EnquiryForm from "@/src/components/EnquiryForm";
import { ProgrammeGraphic } from "@/src/components/SectionGraphics";

export default function Academy() {
  const academy = services.find(s => s.id === "training-provider")!;
  return <main>
    <PageBanner eyebrow="Training & development" title="Kagum Academy" text={academy.description} image={academy.image} video="/assets/KagumAcademyFootage.mp4" />
    <section className="py-20"><Container><img src="/assets/kagum-academy-logo.png" alt="Kagum Academy" className="mb-8 h-28 w-40 object-contain" /><SectionTitle eyebrow="Our programmes" title="Build skills. Grow together." text="Explore our training pillars and course programmes." /><div className="mt-10 grid gap-5 md:grid-cols-3">{Object.entries(courseTracks).map(([track, courses], index) => <article key={track} className="programme-card"><ProgrammeGraphic index={index} /><h3 className="heading text-xl">{track}</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">{courses.slice(0,3).map(course => <li key={course} className="programme-course">{course}</li>)}</ul></article>)}</div><div className="mt-10"><ButtonLink to="/training">View all programmes</ButtonLink></div></Container></section>
    <section className="bg-slate-50 py-20"><Container><SectionTitle eyebrow="Upcoming programmes" title="Be part of our next programme" text="Dates and venues will be announced. Register your interest below to enquire about the next available session; registration is confirmed by our team." /><div className="mt-8 grid gap-5 md:grid-cols-3">{["Entrepreneurship", "Digital Marketing & Social Media", "Artificial Intelligence"].map(title => <article key={title} className="rounded-xl border bg-white p-6"><h3 className="heading text-xl">{title}</h3><p className="mt-3 text-sm text-slate-600">Next session: dates to be announced</p><a href="#programme-registration" className="mt-5 inline-block font-semibold text-brand" onClick={e => { e.preventDefault(); document.getElementById("programme-registration")?.scrollIntoView({behavior:"smooth"}); }}>Register interest →</a></article>)}</div></Container></section>
    <section id="programme-registration" className="py-20 scroll-mt-24"><Container><EnquiryForm kind="programme" /></Container></section>
  </main>;
}
