import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { PulseImage } from "@/components/ui/PulseImage";

const benefits = [
  "Lightweight pads that can be easily applied to any part of the body",
  "Up to 12 hours of continuous battery operation",
  "Medium-intensity (up to 200G) pulsed magnetic fields",
  "A generous 30-day return policy",
  "Great customer support in the USA",
];

const company = [
  ["2012", "Since", Sparkles],
  ["Oneonta, NY", "Based", MapPin],
  ["2 yr / 6 mo", "Warranty", ShieldCheck],
] as const;

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .6, delay, ease: [0.22, 1, .36, 1] as const } };

  return (
    <main className="overflow-hidden bg-white text-[#17191D]">
      <section className="border-b border-[#E9EDF2] bg-[#F7F8FA]">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[.95fr_1.05fr] lg:items-start lg:px-12 lg:py-7 xl:px-0">
          <div className="relative z-10"><motion.p {...reveal()} className="flex items-center gap-2 text-[11px] font-bold tracking-[.14em] text-[#D60018]"><span className="h-px w-7 bg-[#D60018]" />ABOUT US</motion.p><motion.h1 {...reveal(.08)} className="mt-3 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-.06em]">About Us</motion.h1><motion.p {...reveal(.14)} className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-[#62656B]">Unlike others, we take a hands-on approach to our work, matching you in the selection of the correct PEMF machine.</motion.p><motion.div {...reveal(.2)} className="mt-5"><motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: .98 }} className="inline-flex"><Button onClick={() => { window.location.href = "/product"; }} className="h-12 px-6 text-sm">Shop Now · $999 <ArrowRight className="size-4" /></Button></motion.div></motion.div></div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75 }} className="relative h-[220px] overflow-hidden rounded-[22px] border border-[#E9EDF2] bg-gradient-to-br from-white to-[#FCEAEC] p-6 sm:h-[290px] sm:p-8 lg:h-[370px]"><WaveDecoration /><PulseImage src="/assets/hero-kit.webp" alt="FlexPulse G2 complete portable PEMF system" containerClassName="relative z-10 h-full w-full" className="h-full w-full object-contain" fetchPriority="high" /></motion.div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16"><motion.div {...reveal()} className="mx-auto grid max-w-[1280px] gap-8 overflow-hidden rounded-[22px] border border-[#E9EDF2] bg-[#F7F8FA] p-5 sm:p-7 lg:grid-cols-[.82fr_1.18fr] lg:p-8"><div className="min-h-[270px] overflow-hidden rounded-[18px] bg-white"><PulseImage src="/assets/flexpulse-controller-cozy.webp" alt="FlexPulse G2 controller" containerClassName="h-full w-full" className="h-full w-full object-cover" loading="lazy" /></div><div className="py-1 lg:py-3"><p className="text-[11px] font-bold tracking-[.14em] text-[#D60018]">THE DEVICE</p><h2 className="mt-3 text-[clamp(2rem,3.5vw,2.6rem)] font-semibold leading-[1.08] tracking-[-.05em]">About the FlexPulse G2 PEMF device</h2><p className="mt-4 text-[15px] leading-[1.65] text-[#62656B]">The FlexPulse G2 PEMF device was brought to market by our founder, Dr. William Pawluk, MD, an established authority in PEMF.</p><ul className="mt-5 divide-y divide-[#E9EDF2]">{benefits.map((benefit, index) => <motion.li key={benefit} initial={reduceMotion ? false : { opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .07 }} className="flex gap-3 py-3 text-sm leading-relaxed text-[#62656B]"><Check className="mt-0.5 size-4 shrink-0 text-[#D60018]" strokeWidth={2} />{benefit}</motion.li>)}</ul></div></motion.div></section>

      <section className="border-y border-[#E9EDF2] bg-[#F7F8FA] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"><motion.div {...reveal()} className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="text-[11px] font-bold tracking-[.14em] text-[#D60018]">OUR FOUNDER</p><h2 className="mt-3 text-[clamp(2rem,3.5vw,2.6rem)] font-semibold tracking-[-.05em]">Our Founder</h2><p className="mt-5 max-w-[670px] border-l-2 border-[#D60018] pl-5 text-[16px] leading-[1.7] text-[#62656B]">Dr. William Pawluk, MD is a formerly Board-Certified family physician with academic appointments at Johns Hopkins and the University of Maryland. He is considered the foremost authority on the use of Pulsed Electromagnetic Field therapy in North America and has authored several books on PEMF.</p></div><motion.div initial={reduceMotion ? false : { opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .7 }} className="relative min-h-[230px] overflow-hidden rounded-[22px] border border-[#E9EDF2] bg-white"><PulseImage src="/assets/pemf-pawluk.jpg" alt="Dr. William Pawluk, founder of FlexPulse" containerClassName="h-full w-full" className="h-full w-full object-cover object-[50%_15%]" loading="lazy" /></motion.div></motion.div></section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto max-w-[1280px]"><motion.div {...reveal()}><p className="text-[11px] font-bold tracking-[.14em] text-[#D60018]">FLEXPULSE</p><h2 className="mt-3 text-[clamp(2rem,3.5vw,2.6rem)] font-semibold tracking-[-.05em]">Our Company</h2></motion.div><div className="mt-7 grid gap-4 sm:grid-cols-3">{company.map(([value, label, Icon], index) => <motion.div key={label} {...reveal(index * .1)} whileHover={reduceMotion ? undefined : { y: -4 }} className="rounded-[18px] border border-[#E9EDF2] bg-white p-6 shadow-[0_7px_18px_rgba(23,25,29,.04)]"><Icon className="size-5 text-[#D60018]" strokeWidth={1.6} /><p className="mt-7 text-[clamp(1.65rem,3vw,2rem)] font-bold tracking-[-.045em] text-[#D60018]">{value}</p><p className="mt-1 text-sm text-[#62656B]">{label}</p></motion.div>)}</div></div></section>

      <section className="border-y border-[#E9EDF2] bg-[#F7F8FA] px-5 py-12 sm:px-8 lg:px-12 lg:py-14"><motion.div {...reveal()} className="relative mx-auto max-w-[900px] overflow-hidden rounded-[22px] border border-[#E9EDF2] bg-white px-6 py-10 text-center sm:px-10"><WaveDecoration /><div className="relative z-10"><h2 className="text-[clamp(2rem,3.5vw,2.6rem)] font-semibold tracking-[-.05em]">Try It for 30 Days</h2><p className="mx-auto mt-4 max-w-[710px] text-[15px] leading-[1.7] text-[#62656B]">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><motion.div whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={{ scale: .98 }}><Button onClick={() => { window.location.href = "/product"; }} className="h-12 px-6 text-sm">Shop Now · $999</Button></motion.div><Link to="/guarantee"><Button variant="outline" className="h-12 px-6 text-sm">Guarantee &amp; Warranty</Button></Link></div></div></motion.div></section>
    </main>
  );
}

function WaveDecoration() {
  return <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#D60018]/10" viewBox="0 0 560 360" fill="none" aria-hidden="true"><path d="M172 360C278 259 319 93 557 24" stroke="currentColor" /><path d="M211 360C314 270 358 132 575 67" stroke="currentColor" /><path d="M250 360c99-79 141-196 325-242" stroke="currentColor" /></svg>;
}
