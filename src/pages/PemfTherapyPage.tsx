import { useState } from "react";
import { ArrowRight, BrainCircuit, Moon, Play, ShieldAlert, Sparkles, SunMedium, X } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { PulseImage } from "@/components/ui/PulseImage";
import { flexPulseG2 } from "@/data/products";

const videoId = "sT5Jc9zLRXw";
const videoThumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
const price = new Intl.NumberFormat("en-US", { style: "currency", currency: flexPulseG2.currency, maximumFractionDigits: 0 }).format(flexPulseG2.price);

const uses = [
  { icon: Moon, title: "Relaxation", description: "Sit back with a session at home or at your desk.", image: "/assets/flexpulse-wellness.webp", position: "object-[61%_center]" },
  { icon: BrainCircuit, title: "Wind down", description: "Slower programs for the end of the day.", image: "/assets/flexpulse-controller-cozy.webp", position: "object-center" },
  { icon: SunMedium, title: "Focus", description: "Brighter programs for the working day.", image: "/assets/quality-lifestyle.webp", position: "object-center" },
  { icon: Sparkles, title: "Active days", description: "Clip it on and wear it through training and the rest of your day.", image: "/assets/pemf-active-life.webp", position: "object-center" },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold tracking-[0.13em] text-[#D71920]">{children}</p>;
}

function MagneticRings({ className, animated = false }: { className?: string; animated?: boolean }) {
  const reduceMotion = useReducedMotion();
  const rings = [76, 113, 151, 192, 238, 286];
  return (
    <svg className={className} viewBox="0 0 660 500" fill="none" aria-hidden="true">
      {rings.map((radius, index) => (
        <motion.circle
          key={radius}
          cx={395 + (index % 2 ? 9 : -6)}
          cy={252 + (index % 3 ? -7 : 8)}
          r={radius}
          stroke="currentColor"
          strokeWidth={index === 0 ? 1.5 : 1}
          initial={{ opacity: 0.16 + index * 0.035 }}
          animate={animated && !reduceMotion ? { opacity: [0.12 + index * 0.025, 0.32 + index * 0.025, 0.12 + index * 0.025], scale: [0.992, 1.012, 0.992] } : undefined}
          transition={animated && !reduceMotion ? { duration: 5.5 + index * 0.55, repeat: Infinity, ease: "easeInOut", delay: index * 0.12 } : undefined}
        />
      ))}
    </svg>
  );
}

function WaveLines({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 420 155" fill="none" aria-hidden="true"><path d="M-18 112c65 0 65-70 130-70s65 70 130 70 65-70 130-70 65 49 118 49" stroke="currentColor" strokeWidth="1.2" /><path d="M-18 136c65 0 65-70 130-70s65 70 130 70 65-70 130-70 65 49 118 49" stroke="currentColor" strokeWidth=".8" /></svg>;
}

export default function PemfTherapyPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#F8F5F2] text-[#211E1D]">
      <section className="relative isolate overflow-hidden bg-[#F0EBE5]" aria-labelledby="pemf-heading">
        <WaveLines className="pointer-events-none absolute -left-40 bottom-4 w-[480px] text-[#D71920]/15" />
        <WaveLines className="pointer-events-none absolute -right-44 top-14 w-[480px] rotate-180 text-[#D71920]/15" />
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-14 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={stagger} className="relative z-10 max-w-[490px]">
            <motion.div variants={reveal}><SectionEyebrow>PEMF THERAPY</SectionEyebrow></motion.div>
            <motion.h1 id="pemf-heading" variants={reveal} className="mt-4 font-serif text-[clamp(3rem,5.6vw,4.8rem)] leading-[.91] tracking-[-.065em]">What Is PEMF Therapy?</motion.h1>
            <motion.p variants={reveal} className="mt-6 max-w-[430px] text-[15px] leading-[1.68] text-[#625D59] sm:text-base">PEMF (pulsed electromagnetic field) therapy uses pulsing magnetic fields, delivered by a device like the FlexPulse.</motion.p>
            <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/product" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Shop Now · {price} <ArrowRight className="size-4" /></Link>
              <button type="button" onClick={() => setVideoOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#a99e96] px-6 text-sm font-semibold text-[#383230] transition-colors hover:border-[#D71920] hover:text-[#D71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2"><Play className="size-3.5 fill-current" /> Watch overview</button>
            </motion.div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[700px]">
            <MagneticRings animated className="pointer-events-none absolute inset-0 h-full w-full text-[#D71920]" />
            <PulseImage src="/assets/pemf-electrode.png" alt="FlexPulse applicator held in a hand" containerClassName="relative mx-auto aspect-[1.34/1] w-full" className="h-full w-full object-contain p-1 sm:p-3" fetchPriority="high" />
          </motion.div>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="electromagnetic-exchange-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-16 lg:px-12 lg:py-28 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-[440px]">
            <motion.div variants={reveal}><SectionEyebrow>THE SCIENCE</SectionEyebrow></motion.div>
            <motion.h2 id="electromagnetic-exchange-heading" variants={reveal} className="mt-4 font-serif text-[clamp(2.55rem,4.1vw,4.25rem)] leading-[.96] tracking-[-.055em]">Electromagnetic exchange between cells</motion.h2>
            <motion.p variants={reveal} className="mt-6 text-[15px] leading-[1.68] text-[#625D59] sm:text-base">Your body runs on tiny electrical signals passed between cells. A PEMF device works with magnetic fields instead of electrical current: a coil produces a pulsing field, with no electrodes on the skin and nothing plugged into the wall.</motion.p>
            <motion.div variants={reveal}><Link to="/science" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#D71920] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Explore the science <ArrowRight className="size-4" /></Link></motion.div>
          </motion.div>
          <motion.button type="button" onClick={() => setVideoOpen(true)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={imageReveal} className="group relative overflow-hidden rounded-[1.25rem] bg-[#211E1D] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-4 sm:rounded-[1.5rem]" aria-label="Watch Dr. William Pawluk discussing PEMF">
            <img src={videoThumbnail} alt="" className="aspect-video w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.025]" loading="lazy" />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#211E1D]/90 to-transparent" />
            <span className="absolute left-6 top-6 grid size-14 place-items-center rounded-full bg-white text-[#D71920] shadow-lg transition-transform duration-300 group-hover:scale-105"><Play className="ml-0.5 size-5 fill-current" /></span>
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6"><span className="max-w-[340px] text-sm leading-relaxed">Dr. William Pawluk discussing PEMF with Dr. Oz on The Dr. Oz Show (2011).</span><span className="shrink-0 text-xs font-semibold">Watch video</span></span>
          </motion.button>
        </div>
      </section>

      <section className="border-y border-[#E5DED8] bg-[#F8F5F2]" aria-labelledby="magnetic-fields-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={imageReveal} className="relative mx-auto w-full max-w-[470px]">
            <MagneticRings className="pointer-events-none absolute -inset-12 h-[calc(100%+6rem)] w-[calc(100%+6rem)] text-[#D71920]/20" />
            <PulseImage src="/assets/pemf-pawluk.jpg" alt="Dr. William Pawluk" containerClassName="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.5rem] rounded-b-[4rem] bg-[#ede6df]" className="h-full w-full object-cover object-[50%_15%]" loading="lazy" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-[530px] lg:justify-self-end">
            <motion.div variants={reveal}><SectionEyebrow>WHY MAGNETIC FIELDS</SectionEyebrow></motion.div>
            <motion.h2 id="magnetic-fields-heading" variants={reveal} className="mt-4 font-serif text-[clamp(2.55rem,4.1vw,4.25rem)] leading-[.96] tracking-[-.055em]">Why magnetic fields</motion.h2>
            <motion.p variants={reveal} className="mt-6 text-[15px] leading-[1.68] text-[#625D59] sm:text-base">Researchers have studied electrical stimulation of the body for decades. With PEMF, the field is delivered through a coil rather than by placing electrodes on the skin.</motion.p>
            <motion.p variants={reveal} className="mt-4 text-[15px] leading-[1.68] text-[#625D59] sm:text-base">The FlexPulse coil produces a pulsed magnetic field that passes through clothing, with no electrodes or gels on the skin.</motion.p>
            <motion.p variants={reveal} className="mt-7 border-l-2 border-[#D71920] pl-5 text-[15px] leading-[1.65] text-[#393330]">The field is delivered through a coil, without electrodes or gels on the skin.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F0EBE5]" aria-labelledby="ways-to-use-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-0">
          <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}><motion.div variants={reveal}><SectionEyebrow>EVERYDAY USE</SectionEyebrow></motion.div><motion.h2 id="ways-to-use-heading" variants={reveal} className="mt-4 max-w-[500px] font-serif text-[clamp(2.55rem,4.1vw,4.25rem)] leading-[.96] tracking-[-.055em]">Ways to use the FlexPulse</motion.h2></motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-[520px] text-[15px] leading-[1.68] text-[#625D59] sm:text-base lg:pt-7"><motion.p variants={reveal}>Ten programs cover the whole day: calmer frequencies for quiet moments and brighter ones for focus, all in a clip-on device you can wear through training days and travel.</motion.p><motion.p variants={reveal} className="mt-4">Pick a program, set the timer and wear it while you work, train or relax.</motion.p></motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:overflow-visible">
            {uses.map((use) => <motion.article key={use.title} variants={reveal} className="group relative h-[350px] min-w-[calc(84vw-1rem)] snap-start overflow-hidden rounded-2xl bg-[#211E1D] sm:min-w-[340px] lg:min-w-0 lg:h-[385px]"><img src={use.image} alt="" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none lg:group-hover:scale-[1.04] ${use.position}`} loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#211E1D]/90 via-[#211E1D]/15 to-transparent transition-colors duration-300 lg:group-hover:from-[#211E1D]/95" /><div className="absolute inset-x-0 bottom-0 p-5 text-white"><span className="grid size-9 place-items-center rounded-full border border-white/55"><use.icon className="size-4" strokeWidth={1.7} /></span><h3 className="mt-5 text-xl font-semibold tracking-tight">{use.title}</h3><p className="mt-2 max-w-[220px] text-sm leading-relaxed text-white/80">{use.description}</p><span className="absolute bottom-6 right-5 grid size-9 place-items-center rounded-full border border-white/55 transition-transform duration-300 lg:group-hover:translate-x-[3px]"><ArrowRight className="size-4" /></span></div></motion.article>)}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F5F2]" aria-labelledby="contraindications-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-12 lg:py-28 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={imageReveal} className="order-1 rounded-[18px] border border-[#E5DED8] bg-white p-6 shadow-[0_12px_35px_rgba(45,34,26,.04)] sm:p-9"><span className="grid size-11 place-items-center rounded-full bg-[#FCE9E9] text-[#D71920]"><ShieldAlert className="size-5" strokeWidth={1.7} /></span><h2 id="contraindications-heading" className="mt-5 font-serif text-[clamp(2.25rem,3.4vw,3.35rem)] leading-none tracking-[-0.05em]">Contraindications</h2><p className="mt-5 max-w-[520px] text-[15px] leading-[1.68] text-[#625D59]">Do not place the FlexPulse applicators over implanted electrical devices like pacemakers, cochlear implants, or pumps. Safety has not been established in pregnancy; use caution with Grave&apos;s disease or active bleeding.</p><Link to="/contraindications" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-[#BFB4AD] px-5 text-sm font-semibold text-[#383230] transition-colors hover:border-[#D71920] hover:text-[#D71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Read the full list</Link></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={imageReveal} className="order-2"><PulseImage src="/assets/pemf-application.webp" alt="Person applying a FlexPulse applicator to their knee" containerClassName="aspect-[1.38/1] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]" className="h-full w-full object-cover" loading="lazy" /></motion.div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#211E1D] text-white" aria-labelledby="try-it-heading">
        <WaveLines className="pointer-events-none absolute -bottom-10 -left-32 w-[430px] text-[#D71920]/25" /><WaveLines className="pointer-events-none absolute -right-36 top-0 w-[430px] rotate-180 text-[#D71920]/25" />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-[480px]"><motion.h2 id="try-it-heading" variants={reveal} className="font-serif text-[clamp(2.8rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.055em]">Try It for 30 Days</motion.h2><motion.p variants={reveal} className="mt-6 text-[15px] leading-[1.68] text-white/72 sm:text-base">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless there&apos;s a manufacturer&apos;s error. The controller carries a 2-year warranty.</motion.p><motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><Link to="/product" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211E1D]">Shop Now · {price} <ArrowRight className="size-4" /></Link><Link to="/guarantee" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/45 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#211E1D]">Guarantee &amp; Warranty</Link></motion.div></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={imageReveal}><PulseImage src="/assets/pemf-active-life.webp" alt="Person walking outdoors with a FlexPulse knee applicator" containerClassName="aspect-[1.25/1] w-full overflow-hidden rounded-[1.25rem] border border-white/15 sm:rounded-[1.5rem] lg:aspect-[1.35/1]" className="h-full w-full object-cover" loading="lazy" /></motion.div>
        </div>
      </section>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent showClose={false} overlayClassName="bg-black/75 backdrop-blur-sm" className="w-[min(1000px,calc(100vw-2rem))] max-w-none bg-[#211E1D] p-3 sm:p-5">
          <DialogHeader className="sr-only"><DialogTitle>Dr. William Pawluk discussing PEMF</DialogTitle><DialogDescription>Video from The Dr. Oz Show</DialogDescription></DialogHeader>
          <DialogClose className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-white text-[#211E1D] shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]" aria-label="Close video"><X className="size-5" /></DialogClose>
          {videoOpen && <div className="aspect-video overflow-hidden rounded-xl bg-black"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`} title="Dr. William Pawluk discussing PEMF on The Dr. Oz Show" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
