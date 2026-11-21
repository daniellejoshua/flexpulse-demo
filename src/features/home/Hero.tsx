import { motion } from "motion/react";
import { ArrowRight, BedDouble, BriefcaseBusiness, Layers3, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PulseImage } from "@/components/ui/PulseImage";
import { useUiStore } from "@/stores/uiStore";

const badges = [
  { label: "Portable & Easy to Use", icon: BriefcaseBusiness, position: "left-[3%] top-[31%]" },
  { label: "10 Wellness Programs", icon: Layers3, position: "left-[0%] top-[56%]" },
  { label: "Daily Recovery Support", icon: Zap, position: "right-[2%] top-[32%]" },
  { label: "Better Sleep & Relaxation", icon: BedDouble, position: "right-[0%] top-[57%]" },
];

function HeroWaves() {
  return (
    <div className="relative -mt-8 h-[96px] overflow-hidden sm:h-[128px]" aria-hidden="true">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0 103C238 34 386 151 698 91C979 37 1152 48 1440 103V160H0Z" fill="#FFE1E3" />
        <path d="M0 122C250 62 452 143 739 105C997 71 1179 11 1440 80V160H0Z" fill="#FF7B83" />
        <path d="M0 139C219 78 474 139 700 125C958 108 1199 46 1440 78V160H0Z" fill="#D9000D" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const setDemoOpen = useUiStore((s) => s.setDemoOpen);

  return (
    <section className="w-full overflow-hidden bg-[#FFF8F8]">
      <div className="relative mx-auto max-w-[1440px] px-5 pb-1 pt-6 sm:px-8 sm:pt-7 lg:px-12 lg:pb-0 lg:pt-4 xl:px-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="relative z-10 text-center"
        >
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
            className="text-[clamp(2.25rem,10vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.06em] text-ink"
          >
            Recover Smarter,
            <br />
            <span className="text-primary italic">Live Better.</span>
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="mx-auto mt-4 max-w-[340px] text-[15px] leading-relaxed text-ink-soft sm:max-w-[540px] sm:text-base"
          >
            A powerful PEMF device designed for everyday wellness, recovery, and better performance — at home, at work, or on the go.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" className="group" onClick={() => (window.location.href = "/product")}>
              Shop FlexPulse G2 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-ink hover:text-white" onClick={() => setDemoOpen(true)}>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-white"><Play className="h-3 w-3 fill-current" /></span>
              Watch the Demo
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto mt-4 h-[370px] max-w-[1120px] sm:mt-0 sm:h-[480px] lg:h-[510px]">
          <div className="absolute left-1/2 top-[52%] h-[245px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#FF3B45_0%,#FFB2B7_42%,#FFF4F4_68%,transparent_72%)] sm:h-[360px] sm:w-[570px] lg:h-[400px] lg:w-[700px]" />
          <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1120 510" fill="none" aria-hidden="true">
            <path d="M194 190C310 185 339 262 458 300" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M144 312C288 311 335 332 454 339" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M924 192C815 189 774 258 663 299" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M970 318C829 312 771 334 664 343" stroke="#FFFFFF" strokeWidth="1.5" />
            {[[194,190],[144,312],[924,192],[970,318]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="#D9000D" />)}
          </svg>

          <div className="absolute -bottom-[1%] left-1/2 z-[1] w-full max-w-[590px] -translate-x-1/2 sm:w-[72%] lg:-bottom-[9%] lg:w-[560px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.22 }}
              className="relative z-10 h-auto w-full"
            >
              <PulseImage
                src="/assets/hero-kit.webp"
                alt="FlexPulse G2 complete portable PEMF system"
                containerClassName="h-auto w-full"
                className="h-auto w-full object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </div>

          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, x: index < 2 ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.56 + index * 0.08 }}
              className={`absolute z-20 hidden items-center gap-3 rounded-full border border-primary/10 bg-white/90 px-4 py-3 text-sm font-semibold shadow-[0_6px_20px_rgba(70,20,25,0.08)] backdrop-blur-sm lg:flex ${badge.position}`}
            >
              <badge.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} />
              {badge.label}
            </motion.div>
          ))}
        </div>

        <div className="relative z-20 -mt-1 grid grid-cols-2 gap-x-3 gap-y-2 pb-4 lg:hidden">
          {badges.map((badge) => (
            <div key={badge.label} className="flex min-h-14 items-center gap-2 border-t border-primary/10 py-2 text-left text-xs font-semibold leading-snug">
              <badge.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
              {badge.label}
            </div>
          ))}
        </div>
      </div>

      <HeroWaves />
    </section>
  );
}
