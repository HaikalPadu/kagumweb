import { Container, PageBanner, SectionTitle } from "@/src/components/ui-kit";
import WixContactDetails from "@/src/components/WixContactDetails";
import { images } from "@/src/data/content";
import { aboutCopy, welcome } from "@/src/data/wix-copy";

const training = [["50+", "COURSE OFFERED"], ["40+", "COMPLETED PROJECTS"], ["10+", "TOP COLLABORATIONS"], ["2500+", "TRAINED PARTICIPANTS"]];
const digital = [["12,000,000+", "VIDEO VIEWS"], ["750,000+", "AUDIENCE REACH"], ["8,000+", "PROFILE VIEWS"], ["17,000+", "ENGAGED AUDIENCE"]];

export default function About() {
  return <main>
    <PageBanner eyebrow="ABOUT US" title="WELCOME TO KAGUM ACADEMY" text={welcome} image={images.about} />
    <section className="py-20"><Container className="about-story grid items-start gap-10 lg:gap-16"><div className="about-logo"><img src="/assets/kagum-academy-logo.png" alt="KAGUM ACADEMY" /></div><div className="about-copy space-y-6 text-lg text-slate-600"><p>{aboutCopy[0]}</p><h2 className="heading text-3xl text-ink">Why Kagum?</h2><p>{aboutCopy[1]}</p><p>{aboutCopy[2]}</p></div></Container></section>
    <section className="bg-ink py-20 text-white"><Container className="grid gap-8 md:grid-cols-2">{[["OUR MISSION", "Revolutionize business growth and innovation through expert digital solutions."], ["OUR VISION", "Set a global benchmark for excellence, driving innovation and success across sectors."]].map(([title, text]) => <article key={title} className="rounded-xl border border-white/20 p-10"><h2 className="heading text-3xl text-brand-light">{title}</h2><p className="mt-6 text-xl leading-relaxed">{text}</p></article>)}</Container></section>
    <section className="py-20"><Container><SectionTitle eyebrow="WHY CHOOSE" title="US?" />{[["TRAINING HIGHLIGHTS", training], ["DIGITAL MARKETING", digital]].map(([title, items]) => <div key={title as string} className="mt-16 border-t border-slate-200 pt-10"><h3 className="heading text-2xl">{title as string}</h3><div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">{(items as string[][]).map(([value, label]) => <div key={label} className="min-w-0 border-l-4 border-brand py-2 pl-6"><p className="heading impact-value text-brand">{value}</p><p className="impact-label text-slate-600">{label}</p></div>)}</div></div>)}</Container></section>
    <WixContactDetails />
  </main>;
}
