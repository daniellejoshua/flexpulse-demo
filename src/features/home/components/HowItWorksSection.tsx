import { motion, type Variants } from "motion/react";
import { PulseImage } from "@/components/ui/PulseImage";
import HowItWorksStep from "./HowItWorksStep";
import { howItWorksSteps } from "./how-it-works.data";

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full scroll-mt-16 overflow-hidden bg-[#FAF6F4]" aria-labelledby="how-it-works-heading">
      <div className="relative mx-auto grid min-h-[480px] w-full max-w-[1440px] lg:grid-cols-[40%_60%]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative hidden min-h-[480px] overflow-hidden bg-[linear-gradient(90deg,#F3ECE9_0%,#FFFDFC_100%)] lg:block"
        >
          <PulseImage
            src="/assets/flexpulse-controller-cozy.webp"
            alt="Hand holding the FlexPulse G2 controller in a warm home setting"
            containerClassName="h-full w-full"
            className="h-full w-full object-cover object-[52%_center]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FFFDFC] via-[#FFFDFC]/60 to-transparent" />
        </motion.div>

        <div className="order-1 flex items-center bg-[#FFFDFC] px-5 py-16 sm:px-8 md:py-20 lg:order-none lg:px-12 lg:py-14 xl:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="w-full max-w-[780px] lg:text-left"
          >
            <motion.p variants={reveal} className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-[0.08em] text-primary lg:justify-start">
              <span className="h-px w-7 bg-primary" /> A SIMPLE, EFFECTIVE PROCESS
            </motion.p>
            <motion.h2
              id="how-it-works-heading"
              variants={reveal}
              className="mt-4 text-center text-[clamp(2.35rem,10vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.05em] text-ink lg:text-left"
            >
              How It Works
            </motion.h2>
            <motion.p variants={reveal} className="mx-auto mt-4 max-w-[680px] text-center text-[15px] leading-relaxed text-ink-soft sm:text-lg lg:mx-0 lg:text-left">
              In just a few steps, FlexPulse delivers targeted, low-frequency electromagnetic pulses to support your daily wellness routine.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative -mx-5 mt-8 h-[360px] overflow-hidden bg-[linear-gradient(90deg,#F3ECE9_0%,#FFFDFC_100%)] sm:-mx-8 sm:h-[420px] lg:hidden"
            >
              <PulseImage
                src="/assets/flexpulse-controller-cozy.webp"
                alt="Hand holding the FlexPulse G2 controller in a warm home setting"
                containerClassName="h-full w-full"
                className="h-full w-full object-cover object-[50%_center]"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, visible: { transition: { delayChildren: 0.18, staggerChildren: 0.1 } } }}
              className="mt-9 grid sm:grid-cols-3"
            >
              {howItWorksSteps.map((step, index) => (
                <HowItWorksStep key={step.number} step={step} isLast={index === howItWorksSteps.length - 1} variants={reveal} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
