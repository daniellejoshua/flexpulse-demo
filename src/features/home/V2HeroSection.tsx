import { ArrowRight, BedDouble, BriefcaseBusiness, Layers3, Play, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useShouldReduceMotion } from "@animate-ui/react/utils/motion";

const features = [
  { label: "Portable & Easy to Use", icon: BriefcaseBusiness },
  { label: "10 Wellness Programs", icon: Layers3 },
  { label: "Daily Recovery Support", icon: Zap },
  { label: "Better Sleep & Relaxation", icon: BedDouble },
];

interface V2HeroSectionProps {
  onWatchDemo: () => void;
}

export default function V2HeroSection({ onWatchDemo }: V2HeroSectionProps) {
  const reduceMotion = useShouldReduceMotion();
  const reveal = (y: number, delay = 0, duration = 0.5) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_76%_48%,rgba(214,0,22,.09),transparent_44%),linear-gradient(115deg,#fff_0%,#f8f9fb_42%,#eef1f6_100%)]">
      <svg className="pointer-events-none absolute right-[-8%] top-1/2 hidden h-[760px] w-[760px] -translate-y-1/2 text-[#D60016]/20 lg:block" viewBox="0 0 760 760" fill="none" aria-hidden="true">
        <circle cx="380" cy="380" r="184" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="380" cy="380" r="264" stroke="currentColor" strokeWidth="1" />
        <circle cx="380" cy="380" r="342" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden h-36 w-44 bg-[radial-gradient(circle,rgba(109,119,134,.42)_1px,transparent_1.5px)] bg-[size:17px_17px] opacity-30 lg:block" aria-hidden="true" />
      <svg className="pointer-events-none absolute bottom-0 left-0 h-32 w-full text-[#D60016]/20" viewBox="0 0 1440 128" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 99C164 55 305 121 519 82C738 42 873 89 1045 62C1204 37 1317 13 1440 45" stroke="currentColor" strokeWidth="1.25" />
        <path d="M0 113C176 78 318 132 529 101C721 72 890 116 1068 79C1215 48 1323 33 1440 63" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[700px] lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-12 xl:min-h-[740px] xl:px-16">
        <div className="relative z-10 flex max-w-[560px] flex-col justify-center lg:min-h-[540px]">
          <motion.p {...reveal(10, 0, .4)} className="flex items-center gap-4 text-xs font-semibold tracking-[.18em] text-[#D60016] sm:text-sm">
            <span className="h-px w-11 bg-[#D60016]" />
            PEMF WELLNESS TECHNOLOGY
          </motion.p>
          <motion.h1 {...reveal(20, .06, .65)} className="mt-7 text-[clamp(2.45rem,5vw,4.25rem)] font-bold leading-[1.05] tracking-[-.055em] text-[#17191D] xl:text-[4.5rem]">
            Advanced Recovery<br />Through <span className="text-[#D60016] italic">PEMF</span>
          </motion.h1>
          <motion.p {...reveal(12, .15)} className="mt-6 max-w-[540px] text-base leading-[1.6] text-[#626975] sm:text-lg">
            A powerful PEMF device designed for everyday wellness, recovery, and better performance — at home, at work, or on the go.
          </motion.p>
          <motion.div {...reveal(12, .25)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link to="/product" className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#D60016] px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">
              Shop FlexPulse G2 <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </Link>
            <button type="button" onClick={onWatchDemo} className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#B9C0CA] bg-white/65 px-7 text-base font-semibold text-[#17191D] transition-colors duration-200 hover:border-[#D60016] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">
              <span className="grid size-5 place-items-center rounded-full border border-current transition-transform duration-200 group-hover:translate-x-0.5"><Play className="ml-0.5 size-2.5 fill-current" /></span>
              Watch How It Works
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: .97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : .85, delay: .12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-8 flex min-h-[330px] w-full max-w-[680px] items-end justify-center sm:min-h-[400px] lg:mt-0 lg:min-h-[540px]"
        >
          <div className="absolute bottom-[8%] h-[15%] w-[72%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(105,116,132,.24)_0%,rgba(105,116,132,.09)_42%,transparent_72%)] blur-xl" aria-hidden="true" />
          <div className="absolute bottom-[10%] h-[13%] w-[78%] rounded-[50%] border border-[#E2E6EC] bg-[linear-gradient(180deg,#F9FAFC_0%,#E9EDF2_100%)] shadow-[inset_0_6px_10px_rgba(255,255,255,.9),0_16px_24px_rgba(93,104,121,.13)]" aria-hidden="true">
            <span className="absolute inset-x-[12%] bottom-[-1px] h-px bg-[#D60016]/35" />
          </div>
          <img src="/assets/hero-kit.webp" alt="FlexPulse G2 complete portable PEMF system" width="1254" height="1254" fetchPriority="high" className="relative z-10 mb-[4%] w-[88%] max-w-[620px] object-contain" />
        </motion.div>

        <motion.div {...reveal(10, .34)} className="col-span-full mt-8 grid grid-cols-2 border-t border-[#DDE1E7] pt-5 sm:grid-cols-4 lg:mt-0 lg:pt-6">
          {features.map(({ label, icon: Icon }, index) => (
            <motion.div key={label} {...reveal(8, .38 + index * .08, .35)} className={`flex min-h-12 items-center gap-3 px-2 text-xs font-semibold leading-snug text-[#3D424B] sm:px-4 sm:text-sm ${index > 0 ? "border-l border-[#DDE1E7]" : ""}`}>
              <Icon className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.7} />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
