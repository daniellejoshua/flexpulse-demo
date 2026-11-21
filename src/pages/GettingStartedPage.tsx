import { Activity, ArrowRight, BatteryCharging, ChevronRight, CircleDot, Clock3, FileText, ShieldAlert, ShieldCheck, Waves } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PulseImage } from "@/components/ui/PulseImage";

const highlights = [
  ["10 Programs", "Choose a routine", Activity],
  ["3 Hz to 1000 Hz", "Frequency range", Waves],
  ["Rechargeable", "Internal battery", BatteryCharging],
  ["Portable Design", "Made for everyday use", CircleDot],
] as const;

const steps = [
  { number: "01", title: "Charge It", description: "Charge until the charger’s red light turns green, then unplug. It doesn’t run while charging.", image: "/assets/flexpulse-front.webp", alt: "FlexPulse controller and charging accessories" },
  { number: "02", title: "Place the Coils", description: "Secure one or both coil pads where you want them. Two coils share the unit’s intensity.", image: "/assets/woman-back-coil-kitchen.webp", alt: "FlexPulse coil positioned for use" },
  { number: "03", title: "Pick a Program", description: "Choose one of the 10 programs and a session time on the unit.", image: "/assets/flexpulse-controller-cozy.webp", alt: "FlexPulse controller" },
] as const;

const guides = [
  ["The Programs", "10 programs from 3 Hz to 1000 Hz.", "/programs", Waves],
  ["Coil Placement", "Where the coils go.", "/coil-placement", CircleDot],
  ["How It Works", "What the FlexPulse does.", "/how-it-works", Activity],
] as const;

export default function GettingStartedPage() {
  const reduceMotion = useReducedMotion();
  const rise = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: .48, delay } };

  return (
    <main className="overflow-hidden bg-white text-[#17191D]">
      <section className="relative border-b border-[#E9E6E6] bg-[#F8F8FA]">
        <div className="mx-auto grid max-w-[1320px] gap-7 px-5 py-9 sm:px-8 sm:py-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-12 lg:py-10 xl:px-0">
          <div className="relative z-10">
            <motion.p {...rise()} className="flex items-center gap-2 text-xs font-bold tracking-[.14em] text-[#D60016]"><span className="h-px w-7 bg-[#D60016]" />GETTING STARTED</motion.p>
            <motion.h1 {...rise(.06)} className="mt-3 max-w-[560px] text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.09] tracking-[-.055em]">Set Up Your FlexPulse G2</motion.h1>
            <motion.p {...rise(.12)} className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-[#626975]">Set up your FlexPulse G2 in a few minutes: charge it, place the coils, and pick a program.</motion.p>
            <motion.div {...rise(.18)} className="mt-6 flex flex-wrap gap-3"><Button onClick={() => { window.location.href = "/product"; }} className="h-12 px-6 text-sm">Shop Now · $999 <ArrowRight className="size-4" /></Button><a href="/assets/user-guide.pdf" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#D60016] px-6 text-sm font-semibold text-[#D60016] transition-colors hover:bg-[#D60016] hover:text-white"><FileText className="size-4" />Manual (PDF)</a></motion.div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .65 }} className="relative aspect-video overflow-hidden rounded-[22px] border border-[#E9E6E6] bg-gradient-to-br from-white via-[#FAFAFB] to-[#FCEAEC] p-2"><WaveDecoration /><iframe className="relative z-10 size-full rounded-[16px]" src="https://www.youtube-nocookie.com/embed/BJODI4VTpow?rel=0" title="FlexPulse G2 setup video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></motion.div>
        </div>
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 divide-x divide-y divide-[#E9E6E6] border-x border-t border-[#E9E6E6] bg-white px-5 sm:mx-8 sm:px-0 lg:grid-cols-4 lg:divide-y-0 xl:mx-auto">
          {highlights.map(([title, description, Icon], index) => <motion.div key={title} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .06 }} className="flex min-h-20 items-center gap-3 p-3 sm:p-4 lg:min-h-[72px]"><Icon className="size-5 shrink-0 text-[#D60016]" strokeWidth={1.6} /><div><p className="text-sm font-semibold">{title}</p><p className="mt-0.5 text-xs text-[#626975]">{description}</p></div></motion.div>)}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8 sm:py-8 lg:px-12 xl:px-0">
        <section className="rounded-[16px] border border-[#F0C3C8] bg-[#FFF8F8] p-4 sm:p-5" aria-labelledby="safety-heading"><div className="flex flex-col gap-3 sm:flex-row sm:items-start"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FCEAEC] text-[#D60016]"><ShieldAlert className="size-5" /></span><div className="min-w-0"><h2 id="safety-heading" className="text-lg font-semibold">Before You Start</h2><p className="mt-1.5 max-w-[880px] text-sm leading-relaxed text-[#626975]">Don’t place the coils directly over an implanted electronic device such as a pacemaker, defibrillator, cochlear implant or pump. Read the contraindications and cautions before your first session.</p><Link to="/contraindications" className="mt-2 inline-block text-sm font-semibold text-[#D60016] hover:underline">Read the full list</Link></div></div></section>
      </div>

      <section className="bg-[#F8F8FA] px-5 py-8 sm:px-8 sm:py-9 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[1280px]"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="text-xs font-bold tracking-[.14em] text-[#D60016]">YOUR FIRST SESSION</p><h2 className="mt-2 text-[clamp(2.1rem,3.7vw,3rem)] font-semibold tracking-[-.05em]">Your First Session</h2><p className="mt-2 text-[15px] text-[#626975]">Follow these three simple steps to start using FlexPulse.</p></motion.div><div className="relative mt-6 grid gap-4 lg:grid-cols-3 lg:gap-5"><div className="absolute left-[17%] right-[17%] top-[6.5rem] hidden h-px bg-[#D60016]/30 lg:block" />{steps.map((step, index) => <motion.article key={step.number} initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? undefined : { y: -3 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .45, delay: index * .08 }} className="relative z-10 overflow-hidden rounded-[16px] border border-[#E9E6E6] bg-white p-4 shadow-[0_6px_18px_rgba(23,25,29,.04)] hover:shadow-[0_10px_24px_rgba(23,25,29,.07)]"><div className="flex items-start justify-between gap-4"><span className="grid size-8 place-items-center rounded-full bg-[#FCEAEC] text-xs font-bold text-[#D60016]">{step.number}</span><ArrowRight className="mt-2 hidden size-4 text-[#D60016] lg:block" /></div><PulseImage src={step.image} alt={step.alt} containerClassName="mt-4 h-24 w-full overflow-hidden rounded-xl bg-[#F8F8FA] sm:h-28" className="h-full w-full object-cover" loading="lazy" /><h3 className="mt-4 text-lg font-semibold">{step.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-[#626975]">{step.description}</p></motion.article>)}</div></div>
      </section>

      <section className="px-5 py-8 sm:px-8 sm:py-9 lg:px-12 lg:py-12"><div className="mx-auto max-w-[1280px]"><p className="text-xs font-bold tracking-[.14em] text-[#D60016]">RESOURCES</p><h2 className="mt-2 text-[clamp(2.1rem,3.7vw,3rem)] font-semibold tracking-[-.05em]">Explore the Guides</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{guides.map(([title, description, href, Icon]) => <Link key={title} to={href} className="group flex min-h-24 items-center gap-4 rounded-[14px] border border-[#E9E6E6] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#E3AFB5] hover:shadow-[0_8px_20px_rgba(23,25,29,.05)]"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#FCEAEC] text-[#D60016]"><Icon className="size-5" strokeWidth={1.6} /></span><div className="min-w-0 flex-1"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#626975]">{description}</p></div><ChevronRight className="size-4 shrink-0 text-[#D60016] transition-transform group-hover:translate-x-0.5" /></Link>)}</div></div></section>

      <section className="bg-[#F8F8FA] px-5 py-9 sm:px-8 sm:py-10 lg:px-12 lg:py-12"><div className="mx-auto grid max-w-[1280px] gap-5 rounded-[22px] border border-[#E9E6E6] bg-white p-5 sm:p-6 lg:grid-cols-[.32fr_.68fr] lg:items-center lg:p-8"><div className="relative mx-auto grid size-28 place-items-center rounded-full bg-[#FCEAEC] text-[#D60016]"><span className="absolute inset-3 rounded-full border border-[#D60016]/20" /><ShieldCheck className="relative size-11" strokeWidth={1.4} /></div><div><h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-semibold tracking-[-.05em]">Try It for <span className="text-[#D60016]">30 Days</span></h2><p className="mt-3 max-w-[720px] text-[15px] leading-[1.65] text-[#626975]">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it&apos;s a manufacturer&apos;s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</p><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => { window.location.href = "/product"; }} className="h-12 px-6 text-sm">Shop Now · $999</Button><Link to="/guarantee"><Button variant="outline" className="h-12 px-6 text-sm">Guarantee &amp; Warranty</Button></Link></div><div className="mt-5 grid gap-3 border-t border-[#E9E6E6] pt-4 sm:grid-cols-3"><WarrantyHighlight icon={Clock3} label="30-Day Return" /><WarrantyHighlight icon={ShieldCheck} label="2-Year Warranty — Controller" /><WarrantyHighlight icon={BatteryCharging} label="6-Month Warranty — Charging Disc & Coils" /></div></div></div></section>
    </main>
  );
}

function WarrantyHighlight({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return <div className="flex items-start gap-2 text-xs font-semibold leading-relaxed text-[#626975]"><Icon className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.6} />{label}</div>;
}

function WaveDecoration() {
  return <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#D60016]/15" viewBox="0 0 560 390" fill="none" aria-hidden="true"><path d="M166 389C279 290 318 99 552 35" stroke="currentColor" /><path d="M209 392C321 299 358 137 575 74" stroke="currentColor" /><path d="M248 392c103-84 147-216 327-262" stroke="currentColor" /></svg>;
}
