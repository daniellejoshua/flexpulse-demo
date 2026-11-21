import { motion, type Variants } from "motion/react";
import { House, Laptop, Plane } from "lucide-react";
import { PulseImage } from "@/components/ui/PulseImage";

const moments = [
  { icon: House, title: "At Home", description: "Your personal recovery space." },
  { icon: Laptop, title: "At Work", description: "Support your wellness routine." },
  { icon: Plane, title: "On the Go", description: "Wellness that travels with you." },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function WellnessLifestyleSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFF8F8]" aria-labelledby="wellness-heading">
      <div className="relative mx-auto min-h-[470px] w-full max-w-[1440px] lg:grid lg:grid-cols-[42%_58%]">
        <div className="relative z-10 flex items-center px-5 pb-9 pt-16 sm:px-8 md:py-20 lg:py-14 lg:pl-12 lg:pr-3 xl:pl-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="max-w-[520px]"
          >
            <motion.p variants={rise} className="text-[11px] font-bold tracking-[0.08em] text-primary">
              EVERYDAY WELLNESS, REAL RESULTS
            </motion.p>
            <motion.h2
              id="wellness-heading"
              variants={rise}
              className="mt-3 max-w-[500px] text-balance text-[clamp(2.15rem,9vw,3.25rem)] font-extrabold leading-[0.94] tracking-[-0.05em] text-ink"
            >
              Wellness Support That Fits Your Life
            </motion.h2>
            <motion.p variants={rise} className="mt-5 max-w-[410px] text-[15px] leading-relaxed text-ink-soft sm:text-base">
              A simple, effective way to help your body recharge, recover, and feel its best — wherever life takes you.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-5 h-[min(75vw,430px)] min-h-[280px] overflow-hidden rounded-[1.15rem] sm:mx-8 lg:absolute lg:inset-y-0 lg:left-[42%] lg:right-0 lg:mx-0 lg:h-auto lg:rounded-none"
        >
          <PulseImage
            src="/assets/flexpulse-wellness.webp"
            alt="Woman relaxing comfortably with FlexPulse wellness equipment"
            containerClassName="h-full w-full"
            className="h-full w-full object-cover object-[68%_center]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#FFF8F8] via-[#FFF8F8]/55 to-transparent lg:block" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, visible: { transition: { delayChildren: 0.14, staggerChildren: 0.08 } } }}
          className="relative z-10 grid grid-cols-1 divide-y divide-border px-5 py-7 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:absolute lg:bottom-0 lg:left-0 lg:w-[42%] lg:bg-transparent lg:px-12 lg:pb-10 lg:pt-4 xl:px-16"
        >
          {moments.map((moment) => (
            <motion.div key={moment.title} variants={rise} className="py-4 sm:px-4 sm:py-0 sm:first:pl-0">
              <moment.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
              <h3 className="mt-3 font-semibold text-ink">{moment.title}</h3>
              <p className="mt-1 max-w-[135px] text-sm leading-snug text-ink-soft">{moment.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
