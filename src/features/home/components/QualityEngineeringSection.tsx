import { motion } from "motion/react";
import { Activity, ArrowRight, FlaskConical, Layers3, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import EngineeringCollage from "./EngineeringCollage";
import EngineeringMetric from "./EngineeringMetric";

const metrics = [
  { icon: FlaskConical, value: "30+", label: "Years of PEMF research" },
  { icon: Layers3, value: "10K+", label: "Devices worldwide" },
  { icon: Activity, value: "200+", label: "Gauss output" },
  { icon: ShieldCheck, value: "2yr", label: "Controller warranty" },
];

export default function QualityEngineeringSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#FAF6F4] py-16 sm:py-24 lg:py-28 xl:py-30" aria-labelledby="quality-engineering-heading">
      <svg className="pointer-events-none absolute -left-20 top-24 h-44 w-72 text-primary/10" viewBox="0 0 288 176" fill="none" aria-hidden="true">
        <path d="M-18 119C55 37 143 39 219 119C246 148 270 150 307 117" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-21 144C52 62 140 64 216 144C243 173 267 175 304 142" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="pointer-events-none absolute -right-16 bottom-18 h-28 w-52 text-primary/10" viewBox="0 0 208 112" fill="none" aria-hidden="true">
        <path d="M3 78C47 29 101 31 147 78C165 96 184 96 208 76" stroke="currentColor" strokeWidth="1.5" />
      </svg>

        <div className="relative mx-auto grid w-full max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-[45%_55%] lg:items-center lg:gap-16 lg:px-16 xl:gap-20 xl:px-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="max-w-[600px]"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
            className="inline-flex rounded-full border-[1.5px] border-primary px-5 py-2 text-[11px] font-bold tracking-[0.06em] text-primary"
          >
            BUILT TO A HIGHER STANDARD
          </motion.p>
          <motion.h2
            id="quality-engineering-heading"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
            className="mt-5 text-balance text-[clamp(2.35rem,10vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.06em] text-[#171515]"
          >
            Quality Engineering
          </motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
            className="mt-5 max-w-[590px] text-[15px] leading-[1.6] text-[#5D5755] sm:mt-6 sm:text-[19px]"
          >
            Every FlexPulse device is precision-manufactured to the highest standards. From circuit board to coil pad, quality is engineered into every component.
          </motion.p>
          <motion.div
            variants={{ hidden: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: 0.08 } } }}
            className="mt-9 grid grid-cols-2 border-y border-[#E6DDDA] sm:mt-11"
          >
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`${index % 2 === 0 ? "border-r border-[#E6DDDA] pr-3 sm:pr-6" : "pl-3 sm:pl-6"} ${index < 2 ? "border-b border-[#E6DDDA]" : ""}`}
              >
                <EngineeringMetric {...metric} />
              </div>
            ))}
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
            className="mt-9"
          >
            <Link
              to="/product"
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-primary px-8 text-[15px] font-semibold text-[#171515] transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              View Full Specs
              <ArrowRight className="size-4 text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:text-white" />
            </Link>
          </motion.div>
        </motion.div>

        <EngineeringCollage />
      </div>
    </section>
  );
}
