import { motion, type Variants } from "motion/react";
import FlexPulseVideoPlayer from "./FlexPulseVideoPlayer";
import ProgramHighlight from "./ProgramHighlight";

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function FlexPulseDemoSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F2EF]" aria-labelledby="flexpulse-demo-heading">
      <div className="absolute left-0 right-0 top-0 h-12 -translate-y-px overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 0H1440V37C1120 92 815 69 565 45C310 21 126 47 0 83Z" fill="#352724" />
        </svg>
      </div>
      <svg className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-72 text-primary/10" viewBox="0 0 280 220" fill="none" aria-hidden="true">
        <path d="M-20 170C53 84 135 88 211 170C239 200 266 202 300 169" stroke="currentColor" strokeWidth="2" />
        <path d="M-12 194C61 108 143 112 219 194C247 224 274 226 308 193" stroke="currentColor" strokeWidth="2" />
      </svg>
      <svg className="pointer-events-none absolute right-0 top-24 h-44 w-28 text-primary/10" viewBox="0 0 160 80" fill="none" aria-hidden="true">
        <path d="M0 57C38 13 84 17 124 57C139 72 149 73 160 61" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-9 px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:grid-cols-[55%_45%] lg:gap-14 lg:px-12 lg:pb-28 lg:pt-32 xl:px-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="order-2 lg:order-none"
        >
          <FlexPulseVideoPlayer />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="order-1 flex flex-col justify-center lg:order-none lg:pl-2"
        >
          <motion.h2
            id="flexpulse-demo-heading"
            variants={rise}
            className="text-[clamp(2.3rem,10vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.05em] text-[#171514]"
          >
            See the FlexPulse<br /><span className="text-primary">in Action</span>
          </motion.h2>
          <motion.div variants={rise} className="mt-6 h-1 w-16 rounded-full bg-primary" />
          <motion.p variants={rise} className="mt-6 max-w-[480px] text-[15px] leading-[1.65] text-[#5F5B58] sm:text-lg">
            Watch how easy it is to set up and start your first PEMF therapy session. The FlexPulse G2 is designed for simplicity: just select a program, place the coils, and let the device do the rest.
          </motion.p>
          <motion.div variants={rise} className="mt-8">
            <ProgramHighlight />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
