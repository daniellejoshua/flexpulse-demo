import { ArrowRight, Flower2, Grid2X2, Play, Power, RefreshCw, PersonStanding, Waves } from "lucide-react";
import { motion } from "motion/react";
import { useShouldReduceMotion } from "@animate-ui/react/utils/motion";

const benefits = [
  { icon: PersonStanding, title: "Faster Recovery", description: "Get back to doing what you love." },
  { icon: Waves, title: "Pain Relief", description: "Experience lasting comfort." },
  { icon: Flower2, title: "Better Wellness", description: "Support your long-term health." },
  { icon: RefreshCw, title: "Active Lifestyle", description: "Stay consistent and perform better." },
];

const steps = [
  { icon: Power, title: "Set Up", description: "Attach the pads and power on." },
  { icon: Grid2X2, title: "Choose a Program", description: "Select a wellness program for your goal." },
  { icon: Play, title: "Relax & Recover", description: "Let FlexPulse do the work." },
];

export default function V2BenefitsAndHowItWorksSection() {
  const reduceMotion = useShouldReduceMotion();

  return (
    <section className="bg-[#F8F9FB] px-5 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 border-y border-[#E5E7EB] py-8 md:grid-cols-4 lg:grid-cols-[24fr_repeat(4,19fr)] lg:py-9">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="col-span-2 mb-8 max-w-[280px] md:col-span-4 lg:col-span-1 lg:mb-0 lg:pr-8"
          >
            <p className="text-[11px] font-bold tracking-[0.16em] text-primary">REAL BENEFITS</p>
            <h2 className="mt-3 text-[clamp(1.65rem,2.5vw,2.25rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#17191D]">Support Your<br className="hidden lg:block" /> Wellness Goals</h2>
          </motion.div>
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className={`group flex min-h-[116px] flex-col items-center justify-center px-3 text-center transition-colors hover:text-primary md:col-span-1 ${index > 0 ? "border-l border-[#E5E7EB]" : "md:border-l lg:border-l"}`}
            >
              <Icon className="size-6 text-primary transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={1.6} />
              <h3 className="mt-3 text-sm font-semibold text-[#272B32]">{title}</h3>
              <p className="mt-1 max-w-[145px] text-xs leading-relaxed text-[#6B7280]">{description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[48fr_52fr] lg:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="aspect-[1.6/1] overflow-hidden rounded-[20px]"
          >
            <img src="/assets/flexpulse-relaxing-headband.png" alt="Woman relaxing with a FlexPulse headband on a sofa" width="1680" height="945" className="h-full w-full object-cover object-center" loading="lazy" />
          </motion.div>

          <div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="text-[11px] font-bold tracking-[0.16em] text-primary"
            >
              SIMPLE TO USE
            </motion.p>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="mt-3 max-w-[560px] text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.06] tracking-[-0.05em] text-[#17191D]"
            >
              A Smarter Recovery Routine in 3 Steps
            </motion.h2>

            <div className="relative mt-7 grid gap-3 pl-7 sm:grid-cols-3 sm:pl-0">
              <div className="absolute bottom-6 left-3 top-6 w-px bg-primary/35 sm:hidden" aria-hidden="true" />
              {steps.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.1 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative min-h-[164px] rounded-2xl border border-[#E1E5EB] bg-white/70 p-4 text-center shadow-[0_5px_12px_rgba(54,64,79,.035)] transition-colors hover:border-primary/35"
                >
                  <span className="absolute -left-3 top-4 grid size-6 place-items-center rounded-full bg-primary text-[11px] font-bold text-white sm:-top-3 sm:left-3">{index + 1}</span>
                  <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#FCE9EB] text-primary"><Icon className="size-5" strokeWidth={1.7} /></span>
                  <h3 className="mt-3 text-sm font-semibold text-[#252A31]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{description}</p>
                  {index < steps.length - 1 && <ArrowRight className="absolute -right-[18px] top-1/2 hidden size-4 -translate-y-1/2 text-primary sm:block" aria-hidden="true" />}
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
