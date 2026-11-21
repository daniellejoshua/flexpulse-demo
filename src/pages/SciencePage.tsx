import { useState } from "react";
import { Activity, ArrowRight, BookOpen, ChevronUp, ExternalLink } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { PulseImage } from "@/components/ui/PulseImage";

const references = [
  {
    citation: "Sun X, et al. (2022). Efficacy of pulsed electromagnetic field on pain and physical function in patients with low back pain: A systematic review and meta-analysis. Clinical Rehabilitation, 36(5), 636–649. doi:10.1177/02692155221074052.",
    url: "https://pubmed.ncbi.nlm.nih.gov/35077249/",
  },
  {
    citation: "Kull P, et al. (2025). Efficacy of pulsed electromagnetic field therapy on pain and physical function in patients with non-specific low back pain: a systematic review. Wiener Medizinische Wochenschrift, 175(1–2), 11–12. doi:10.1007/s10354-023-01025-5.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37999784/",
  },
  {
    citation: "Yang X, et al. (2020). Effects of Pulsed Electromagnetic Field Therapy on Pain, Stiffness, Physical Function, and Quality of Life in Patients with Osteoarthritis: A Systematic Review and Meta-Analysis of Randomized Placebo-Controlled Trials. Physical Therapy, 100(7), 1118–1131. doi:10.1093/ptj/pzaa054.",
    url: "https://pubmed.ncbi.nlm.nih.gov/32251502/",
  },
  {
    citation: "Schmid MR, et al. (2012). Sleep EEG alterations: effects of pulsed magnetic fields versus pulse-modulated radio frequency electromagnetic fields. Journal of Sleep Research, 21(6), 620–629. doi:10.1111/j.1365-2869.2012.01025.x.",
    url: "https://pubmed.ncbi.nlm.nih.gov/22724534/",
  },
  {
    citation: "Jeon HS, et al. (2015). Effects of pulsed electromagnetic field therapy on delayed-onset muscle soreness in biceps brachii. Physical Therapy in Sport, 16(1), 34–39. doi:10.1016/j.ptsp.2014.02.006.",
    url: "https://pubmed.ncbi.nlm.nih.gov/24906295/",
  },
  {
    citation: "Keriven H, et al. (2023). Effects of peripheral electromagnetic stimulation after an eccentric exercise-induced delayed-onset muscle soreness protocol in professional soccer players: a randomized controlled trial. Frontiers in Physiology, 14, 1206293. doi:10.3389/fphys.2023.1206293.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37465698/",
  },
  {
    citation: "Grote V, et al. (2007). Short-term effects of pulsed electromagnetic fields after physical exercise are dependent on autonomic tone before exposure. European Journal of Applied Physiology, 101(4), 495–502. doi:10.1007/s00421-007-0520-x.",
    url: "https://pubmed.ncbi.nlm.nih.gov/17674028/",
  },
];

const guides = [
  { title: "How It Works", description: "What the FlexPulse does and how it makes its magnetic field.", to: "/how-it-works" },
  { title: "The Programs", description: "10 programs from 3 Hz to 1000 Hz.", to: "/programs" },
  { title: "Coil Placement", description: "Applying the coils to different parts.", to: "/coil-placement" },
];

function WaveDecoration({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 360 110" fill="none" aria-hidden="true">
      <path d="M-10 74C36 74 43 27 89 27s44 57 91 57 45-57 91-57 45 47 99 47" stroke="currentColor" strokeWidth="1.2" />
      <path d="M-10 89c46 0 53-47 99-47s44 57 91 57 45-57 91-57 45 47 99 47" stroke="currentColor" strokeWidth=".8" />
    </svg>
  );
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function SciencePage() {
  const [referencesOpen, setReferencesOpen] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#201C1B]">
      <section className="relative isolate overflow-hidden bg-[#FAF8F6]" aria-labelledby="science-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative z-10 max-w-[535px]">
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-[11px] font-bold tracking-[.13em] text-[#C71920]">THE SCIENCE</motion.p>
            <motion.h1 id="science-heading" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mt-4 font-serif text-[clamp(3.55rem,5.7vw,4.75rem)] leading-[.9] tracking-[-.065em]">The Science</motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mt-6 max-w-[490px] text-[17px] leading-[1.62] text-[#625D59]">
              The FlexPulse is designed to provide a variety of frequencies to accomplish different stimulation goals, most typically based on understanding brainwave frequency patterns.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mt-8">
              <Link to="/product" className="inline-flex min-h-11 items-center rounded-full bg-[#C71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#AA151B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">Shop Now · $999</Link>
            </motion.div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative mx-auto w-full max-w-[650px]">
            <svg className="pointer-events-none absolute inset-0 h-full w-full text-[#C71920]/35" viewBox="0 0 660 460" fill="none" aria-hidden="true">
              <circle cx="410" cy="234" r="92" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="410" cy="234" r="142" stroke="currentColor" strokeWidth="1.25" />
              <circle cx="410" cy="234" r="194" stroke="currentColor" />
            </svg>
            <PulseImage src="/assets/pemf-electrode.png" alt="FlexPulse applicator held in a hand" containerClassName="relative mx-auto aspect-[1.35/1] w-full" className="h-full w-full object-contain p-1 sm:p-3" fetchPriority="high" />
          </motion.div>
        </div>
        <WaveDecoration className="pointer-events-none absolute bottom-0 right-[-65px] w-[min(52vw,600px)] text-[#C71920]/20" />
      </section>

      <section className="bg-white" aria-label="Scientific explanations">
        <div className="mx-auto grid w-full max-w-[1280px] divide-y divide-[#E2DAD5] px-5 sm:px-8 lg:grid-cols-2 lg:divide-x lg:divide-y-0 lg:px-12 xl:px-0">
          <Reveal className="py-14 lg:pr-16 lg:py-20">
            <span className="grid size-12 place-items-center rounded-full bg-[#FCE9E9] text-[#C71920]"><Activity className="size-6" strokeWidth={1.6} /></span>
            <h2 className="mt-6 font-serif text-[clamp(2.55rem,4vw,4rem)] leading-[.96] tracking-[-.055em]">Brainwave entrainment</h2>
            <p className="mt-6 max-w-[510px] text-[15px] leading-[1.68] text-[#625D59] sm:text-base">The frequencies and their respective frequency bands have been primarily selected based on brainwave entrainment. A steady, rhythmic signal at a chosen frequency may be followed by the brain, similar to entrainment seen with rhythmic light and sound.</p>
            <p className="mt-4 max-w-[510px] text-[15px] leading-[1.68] text-[#625D59] sm:text-base">PEMF needs no electrodes on the skin, and its magnetic field passes through clothing.</p>
          </Reveal>
          <Reveal className="py-14 lg:pl-16 lg:py-20">
            <span className="grid size-12 place-items-center rounded-full bg-[#FCE9E9] text-[#C71920]"><BookOpen className="size-6" strokeWidth={1.6} /></span>
            <h2 className="mt-6 font-serif text-[clamp(2.55rem,4vw,4rem)] leading-[.96] tracking-[-.055em]">The research</h2>
            <p className="mt-6 max-w-[510px] text-[15px] leading-[1.68] text-[#625D59] sm:text-base">EEG studies have looked for this kind of entrainment with PEMF. Behavioral and neurophysiological changes have been reported after exposure to extremely low frequency PEMFs in animals and humans, including increased neurotransmission in nerve cell cultures.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#1D1A19] py-16 text-[#F8F5F2] sm:py-20 lg:py-24" aria-labelledby="research-heading">
        <WaveDecoration className="pointer-events-none absolute left-[-150px] top-12 w-[400px] text-[#C71920]/35" />
        <WaveDecoration className="pointer-events-none absolute bottom-16 right-[-180px] w-[460px] rotate-180 text-[#C71920]/35" />
        <div className="relative mx-auto w-full max-w-[1050px] px-5 sm:px-8 lg:px-0">
          <Reveal className="mx-auto max-w-[650px] text-center">
            <h2 id="research-heading" className="font-serif text-[clamp(2.45rem,4vw,3.5rem)] leading-[.96] tracking-[-.055em]">Research Behind PEMF</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#B8B0AC] sm:text-base">Explore peer-reviewed research related to the applications above.</p>
          </Reveal>

          <Reveal className="mt-10 sm:mt-12">
            <div className="overflow-hidden rounded-[14px] border border-white/20 bg-white/[.035]">
              <button type="button" onClick={() => setReferencesOpen((open) => !open)} aria-expanded={referencesOpen} aria-controls="pemf-references" className="flex min-h-14 w-full items-center justify-between gap-4 px-5 text-left text-sm font-semibold transition-colors hover:bg-white/[.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:px-6">
                <span>All References ({references.length})</span>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[.08em] text-[#F8F5F2]">{referencesOpen ? "HIDE REFERENCES" : "SHOW REFERENCES"}<motion.span animate={{ rotate: referencesOpen ? 0 : 180 }} transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}><ChevronUp className="size-4" /></motion.span></span>
              </button>
              <AnimatePresence initial={false}>
                {referencesOpen && (
                  <motion.div id="pemf-references" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeInOut" }} className="overflow-hidden border-t border-white/15">
                    {references.map((reference, index) => (
                      <article key={reference.url} className="grid gap-3 border-b border-white/15 px-5 py-5 transition-colors duration-200 last:border-b-0 hover:bg-white/[.055] sm:px-6 md:grid-cols-[24px_1fr_auto] md:items-start md:gap-5">
                        <span className="text-sm font-semibold text-white/90">{index + 1}</span>
                        <p className="text-sm leading-[1.6] text-[#F8F5F2]">{reference.citation}</p>
                        <a href={reference.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-[#F3C6C9] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:justify-self-end">View on PubMed <ExternalLink className="size-3.5" /></a>
                      </article>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="border-t border-white/15 bg-white/[.025] px-5 py-5 text-[13px] leading-[1.6] text-[#B8B0AC] sm:px-6">
                <strong className="font-semibold text-[#F8F5F2]">Research Notice:</strong> The studies referenced above evaluate pulsed electromagnetic field (PEMF) technologies using a variety of devices, treatment parameters, frequencies, intensities, and protocols. These studies are provided for general educational purposes and should not be interpreted as clinical evidence for the FlexPulse device specifically. FlexPulse is not intended to diagnose, treat, cure, or prevent any disease.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#FAF8F6] py-16 sm:py-20 lg:py-24" aria-labelledby="guides-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 xl:px-0">
          <Reveal><h2 id="guides-heading" className="font-serif text-[clamp(2.55rem,4.1vw,4.35rem)] leading-[.96] tracking-[-.055em]">Guides</h2></Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.to} to={guide.to} className="group rounded-2xl border border-[#DED5CF] bg-white p-6 transition-colors duration-200 hover:border-[#C71920] hover:bg-[#FFFDFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">
                <ArrowRight className="size-5 text-[#C71920] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.7} />
                <h3 className="mt-8 text-lg font-semibold">{guide.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#625D59]">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0EBE5] py-16 sm:py-20 lg:py-24" aria-labelledby="try-it-heading">
        <Reveal className="mx-auto flex w-full max-w-[720px] flex-col items-center px-5 text-center sm:px-8">
          <h2 id="try-it-heading" className="font-serif text-[clamp(2.65rem,4.25vw,4.25rem)] leading-[.96] tracking-[-.055em]">Try It for 30 Days</h2>
          <p className="mt-6 text-[15px] leading-[1.68] text-[#625D59] sm:text-base">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to="/product" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#C71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#AA151B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">Shop Now · $999</Link>
            <Link to="/guarantee" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#A99D96] px-6 text-sm font-semibold text-[#383230] transition-colors hover:border-[#C71920] hover:text-[#C71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">Guarantee &amp; Warranty</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
