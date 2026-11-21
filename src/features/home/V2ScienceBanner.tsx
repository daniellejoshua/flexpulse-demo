import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useShouldReduceMotion } from "@animate-ui/react/utils/motion";

const desktopMask = {
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,.42) 22%, #000 48%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,.42) 22%, #000 48%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%)",
  maskComposite: "intersect",
} as const;

const mobileMask = {
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, #000 14%, #000 80%, transparent 100%)",
} as const;

export default function V2ScienceBanner() {
  const reduceMotion = useShouldReduceMotion();
  const reveal = (y: number, delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_78%_48%,rgba(214,0,22,.10),transparent_48%),linear-gradient(110deg,#fff_0%,#f8f9fb_42%,#f1f3f7_100%)] text-[#17191D]">
      <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-[61%] text-[#D60016]/25 lg:block" viewBox="0 0 780 620" fill="none" aria-hidden="true">
        <path d="M34 412C196 342 264 486 398 393C529 301 608 219 794 271" stroke="currentColor" strokeDasharray="2 9" strokeWidth="1.5" />
        <path d="M82 464C231 387 292 526 428 432C549 348 657 301 790 340" stroke="currentColor" strokeDasharray="2 11" strokeWidth="1" />
      </svg>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[68%] lg:block"
        style={desktopMask}
        aria-hidden="true"
      >
        <img src="/assets/flexpulse-pemf-science-banner.webp" alt="" width="2172" height="724" loading="lazy" className="size-full object-cover object-[69%_center] mix-blend-screen" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[600px] lg:grid-cols-[42%_58%] lg:px-12 lg:py-20 xl:min-h-[640px] xl:px-0">
        <div className="max-w-[520px]">
          <motion.p {...reveal(10)} className="text-[11px] font-semibold tracking-[.18em] text-[#D60016]">
            THE SCIENCE OF PEMF
          </motion.p>
          <motion.h2 {...reveal(20, .06)} className="mt-5 text-[clamp(2rem,4.3vw,4rem)] font-bold leading-[1.05] tracking-[-.055em]">
            Electromagnetic Pulses for Natural Recovery
          </motion.h2>
          <motion.p {...reveal(12, .15)} className="mt-6 max-w-[520px] text-[16px] leading-[1.6] text-[#626975] sm:text-lg">
            Explore how FlexPulse PEMF technology supports everyday wellness, recovery, and relaxation.
          </motion.p>
          <motion.div {...reveal(10, .25)} className="mt-8">
            <Link to="/science" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D60016] px-7 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">
              Explore the Research <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 h-[300px] sm:h-[360px] lg:hidden"
          style={mobileMask}
          aria-hidden="true"
        >
          <img src="/assets/flexpulse-pemf-science-banner.webp" alt="" width="2172" height="724" loading="lazy" className="size-full object-cover object-[67%_center] mix-blend-screen" />
        </motion.div>
      </div>
    </section>
  );
}
