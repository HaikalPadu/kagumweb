import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export type AgencyHeroSectionProps = {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const partners = [
  ["HRDC Training", "/assets/collaborations/hrdc-training.png"],
  ["HRD Corp Claimable", "/assets/collaborations/hrdc-corp-claimable.png"],
  ["MARA", "/assets/collaborations/mara.png"],
  ["Dewan Perniagaan Melayu Malaysia", "/assets/collaborations/dewan-perniagaan-melayu.png"],
  ["Kementerian Pembangunan Usahawan", "/assets/collaborations/kementerian-usahawan.png"],
  ["Khazanah Nasional", "/assets/collaborations/khazanah-nasional.png"],
] as const;

/** Kagum-adapted version of the supplied agency hero direction. */
export function AgencyHeroSection({ onPrimaryClick, onSecondaryClick }: AgencyHeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#f5f1eb]">
      <div className="pointer-events-none absolute -right-40 -top-44 h-[35rem] w-[35rem] rounded-full bg-[#b6252b]/10 blur-3xl" />
      <div className="mx-auto grid w-[min(1240px,calc(100%-32px))] gap-12 pb-16 pt-20 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-20 lg:pb-24 lg:pt-28">
        <div className="relative z-10">
          <p className="kicker flex items-center gap-3"><span className="h-px w-8 bg-current" />KAGUM ADVANCE / CAPABILITY PARTNER</p>
          <h1 className="display-font mt-7 max-w-3xl text-6xl font-extrabold leading-[.94] tracking-[-.08em] md:text-8xl">
            Make room for <span className="text-[#b6252b]">what&apos;s next.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Training, technology, digital growth and practical expertise for people and organisations ready to move forward.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={onPrimaryClick} className="inline-flex items-center gap-2 rounded-full bg-[#b6252b] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#8f1d25]">
              Explore Kagum <ArrowRight size={16} />
            </button>
            <button onClick={onSecondaryClick} className="inline-flex items-center gap-2 rounded-full border border-[#17252d]/20 px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-white">
              Meet the academy <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-black/10 pt-5 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-2"><Check size={15} className="text-[#b6252b]" /> HRDC claimable programmes</span>
            <span className="flex items-center gap-2"><Check size={15} className="text-[#b6252b]" /> Practical solutions</span>
          </div>
        </div>

        <div className="relative min-h-[480px] lg:min-h-[560px]">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full border border-[#b6252b]/30" />
          <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-[#b6252b]" />
          <div className="absolute left-0 top-12 z-10 flex h-32 w-32 items-center justify-center rounded-3xl bg-[#17252d] p-5 shadow-2xl shadow-[#17252d]/25 md:h-40 md:w-40">
            <img src="/assets/kagum-academy-logo.png" alt="Kagum Academy" className="h-full w-full object-contain" />
          </div>
          <div className="absolute right-0 top-28 h-[310px] w-[82%] rounded-[2rem] bg-[linear-gradient(145deg,#17252d22,#17252ddd),url('https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center shadow-[18px_18px_0_#b6252b] md:h-[390px]" />
          <div className="absolute bottom-0 left-4 z-20 max-w-[18rem] rounded-3xl bg-white p-5 shadow-2xl md:left-8">
            <p className="kicker">A connected platform</p>
            <p className="display-font mt-3 text-2xl font-extrabold leading-tight tracking-[-.05em]">Capability that travels with you.</p>
            <div className="mt-5 flex -space-x-3">
              {["/assets/kagum-academy-logo.png", "/assets/kagum-digital-logo.png", "/assets/kagum-supplies-logo.png"].map((src) => <div key={src} className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border-2 border-white bg-[#17252d]"><img src={src} alt="" className="h-full w-full object-contain" /></div>)}
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#e8e0d7] text-xs font-bold text-[#b6252b]">+5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t border-black/10 bg-white/40 py-5" aria-label="Kagum Advance collaborations and clients">
        <div className="mx-auto flex w-[min(1240px,calc(100%-32px))] items-center gap-7">
          <span className="kicker hidden shrink-0 md:block">COLLABORATIONS<br />&amp; CLIENTS</span>
          <div className="logo-marquee flex min-w-0 flex-1 overflow-hidden">
            <div className="logo-marquee-track flex shrink-0 items-center gap-10 pr-10">
              {[...partners, ...partners].map(([name, src], index) => <div key={`${name}-${index}`} className="group flex h-16 w-36 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white px-4 grayscale transition duration-500 hover:grayscale-0"><img src={src} alt={name} className="max-h-12 max-w-full object-contain" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AgencyHeroSection;
