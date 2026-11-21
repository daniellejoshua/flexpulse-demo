import { motion, type Variants } from "motion/react";
import { Activity, ArrowRight, Layers3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { PulseImage } from "@/components/ui/PulseImage";
import ScienceHighlight from "./ScienceHighlight";

const highlights = [
  { icon: Activity, title: "Targeted PEMF Output", description: "Delivers low-frequency pulses for whole-body support." },
  { icon: Layers3, title: "Program Control", description: "10 built-in programs with simple navigation." },
  { icon: ShieldCheck, title: "Safe & Convenient", description: "Designed for everyday use at home, work, or travel." },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function EngineeredWellnessSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#352724]" aria-labelledby="engineered-wellness-heading">
      <PulseImage
        src="/assets/flexpulse-engineered-wellness.webp"
        alt="FlexPulse circular coil positioned on a woman's upper shoulder"
        containerClassName="absolute inset-0 hidden h-full w-full lg:block"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(36,29,27,.94)_0%,rgba(53,39,36,.78)_29%,rgba(53,39,36,.05)_58%,rgba(36,29,27,.78)_100%)] lg:block" />

      <div className="relative mx-auto w-full max-w-[1440px] lg:grid lg:min-h-[480px] lg:grid-cols-[35%_40%_25%] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="px-5 py-16 sm:px-8 md:py-20 lg:py-12 lg:pl-12 lg:pr-3 xl:pl-16"
        >
          <motion.p variants={rise} className="text-xs font-bold tracking-[0.12em] text-[#FF8C91]">THE FLEXPULSE APPROACH</motion.p>
          <motion.h2
            id="engineered-wellness-heading"
            variants={rise}
            className="mt-3 text-[clamp(2.2rem,9vw,2.75rem)] font-extrabold leading-[1.03] tracking-[-0.05em] text-white"
          >
            Thoughtfully<br /><span className="whitespace-nowrap">Engineered Wellness</span>
          </motion.h2>
          <motion.p variants={rise} className="mt-5 max-w-[390px] text-[15px] leading-relaxed text-[#E4DAD7]">
            A portable PEMF solution that delivers controlled electromagnetic fields to support your body&apos;s natural recovery processes.
          </motion.p>
          <motion.div variants={rise} className="mt-7 hidden lg:block">
            <Link
              to="/science"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/80 px-5 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary/20"
            >
              Explore the Science
              <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative h-[360px] overflow-hidden sm:h-[430px] lg:hidden">
          <PulseImage
            src="/assets/flexpulse-engineered-wellness.webp"
            alt="FlexPulse circular coil positioned on a woman's upper shoulder"
            containerClassName="h-full w-full"
            className="h-full w-full object-cover object-[60%_center]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#352724] to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { delayChildren: 0.14, staggerChildren: 0.1 } } }}
          className="space-y-7 bg-[#241D1B]/90 px-5 py-10 sm:px-8 lg:col-start-3 lg:space-y-8 lg:bg-transparent lg:px-8 lg:py-12 xl:px-12"
        >
          {highlights.map((highlight) => (
            <motion.div key={highlight.title} variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }}>
              <ScienceHighlight {...highlight} />
            </motion.div>
          ))}
          <Link
            to="/science"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-white/80 px-5 text-sm font-semibold text-white transition-colors hover:border-primary hover:bg-primary/20 lg:hidden"
          >
            Explore the Science
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
