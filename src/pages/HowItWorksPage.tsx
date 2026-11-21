import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Check,
  ChevronRight,
  CircleDot,
  FlaskConical,
  HeartPulse,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";

const highlights = [
  { label: "No electrodes, non-invasive", icon: Activity },
  { label: "Light and wearable", icon: Sparkles },
  { label: "Up to 12 hours per charge", icon: BatteryCharging },
  { label: "Made in Germany", icon: Check },
];

const steps = [
  {
    number: "01",
    title: "Choose where to place the coil",
    image: "/assets/man-knee-coil.webp",
    alt: "FlexPulse coil being positioned at the knee",
    position: "object-[42%_center]",
  },
  {
    number: "02",
    title: "Secure FlexPulse coil and begin a program",
    image: "/assets/flexpulse-controller-cozy.webp",
    alt: "FlexPulse controller set to a program",
    position: "object-center",
  },
  {
    number: "03",
    title: "Relax, or get on with your day, while the program runs",
    image: "/assets/woman-back-coil-kitchen.webp",
    alt: "Person wearing a FlexPulse coil while moving through the day",
    position: "object-center",
  },
];

const guides = [
  { title: "The Programs", description: "10 programs from 3 Hz to 1000 Hz.", to: "/programs", icon: Waves },
  { title: "Coil Placement", description: "Where the coils go.", to: "/coil-placement", icon: CircleDot },
  { title: "The Science", description: "The rationale behind programs.", to: "/science", icon: FlaskConical },
];

const entrance = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

function SectionIntro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[560px]">
      <h2 className="text-[clamp(2.1rem,3.6vw,3.25rem)] font-bold leading-[1.02] tracking-[-.055em] text-[#17191D]">{title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#626975] sm:text-base">{children}</p>
    </div>
  );
}

function FieldRings() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      animate={reduceMotion ? undefined : { opacity: [0.4, 0.72, 0.4], scale: [0.985, 1, 0.985] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 h-full w-full text-[#D60016]/35"
      viewBox="0 0 680 500"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="370" cy="255" rx="112" ry="112" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="370" cy="255" rx="166" ry="166" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="370" cy="255" rx="220" ry="220" stroke="currentColor" strokeWidth="0.8" />
    </motion.svg>
  );
}

function GuaranteeIllustration() {
  return (
    <svg viewBox="0 0 250 220" fill="none" aria-hidden="true" className="w-full max-w-[230px] text-[#D60016]">
      <circle cx="125" cy="110" r="88" stroke="currentColor" strokeOpacity=".12" />
      <circle cx="125" cy="110" r="64" stroke="currentColor" strokeOpacity=".18" />
      <path d="M125 52 174 71v39c0 35-20 58-49 70-29-12-49-35-49-70V71l49-19Z" fill="white" stroke="currentColor" strokeWidth="1.5" />
      <path d="m103 113 15 15 31-35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HowItWorksPage() {
  const reduceMotion = useReducedMotion();
  const stagger = reduceMotion ? 0 : 0.1;

  return (
    <main className="overflow-hidden bg-white text-[#17191D]">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_83%_52%,rgba(214,0,22,.07),transparent_36%),linear-gradient(115deg,#fff_0%,#fafbfc_60%,#f0f3f7_100%)]" aria-labelledby="how-it-works-heading">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-8 lg:px-12 lg:py-[72px] xl:px-16">
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
            className="relative z-10 max-w-[610px]"
          >
            <motion.p variants={entrance} transition={{ duration: 0.4 }} className="flex items-center gap-3 text-[11px] font-bold tracking-[.15em] text-[#D60016]">
              <span className="h-px w-8 bg-current" /> HOW IT WORKS
            </motion.p>
            <motion.h1 id="how-it-works-heading" variants={entrance} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="mt-5 text-[clamp(3rem,5.25vw,4.35rem)] font-bold leading-[1.04] tracking-[-.065em] text-[#17191D]">
              Simple, Effective <span className="text-[#D60016] italic">PEMF</span> Therapy
            </motion.h1>
            <motion.p variants={entrance} transition={{ duration: 0.45 }} className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-[#626975] sm:text-[17px]">
              The FlexPulse puts 10 programs, from 3 Hz to 1000 Hz, into a controller that fits in your pocket. Several programs are set to brainwave frequency bands.
            </motion.p>
            <motion.div variants={entrance} transition={{ duration: 0.45 }} className="mt-7 grid max-w-[600px] gap-2 sm:grid-cols-2">
              {highlights.map(({ label, icon: Icon }) => (
                <div key={label} className="flex min-h-12 items-center gap-3 rounded-xl border border-[#E9E6E6] bg-white/85 px-3 text-sm font-medium text-[#323741] shadow-[0_2px_8px_rgba(27,34,44,.025)]">
                  <Icon className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.7} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={entrance} transition={{ duration: 0.45 }} className="mt-7">
              <Link to="/product" className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#D60016] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#A90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">
                Shop Now · $999 <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex min-h-[330px] w-full max-w-[660px] items-end justify-center sm:min-h-[390px] lg:min-h-[490px]"
          >
            <FieldRings />
            <div className="absolute bottom-[10%] h-[13%] w-[77%] rounded-[50%] border border-[#E1E5EA] bg-[linear-gradient(180deg,#FAFBFC_0%,#E8EDF2_100%)] shadow-[inset_0_7px_10px_rgba(255,255,255,.92),0_18px_28px_rgba(80,91,108,.13)]" aria-hidden="true">
              <span className="absolute inset-x-[13%] bottom-[-1px] h-px bg-[#D60016]/35" />
            </div>
            <div className="absolute bottom-[7%] h-[12%] w-[68%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(75,83,96,.22),transparent_68%)] blur-xl" aria-hidden="true" />
            <img src="/assets/flexpulse-front.webp" alt="FlexPulse G2 controller" width="600" height="1048" fetchPriority="high" className="relative z-10 mb-[11%] h-[78%] w-auto max-w-[55%] object-contain drop-shadow-[0_18px_16px_rgba(30,35,42,.17)]" />
            <div className="absolute bottom-[4%] left-[8%] z-10 hidden rounded-full border border-[#DFE3E8] bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#4D5562] shadow-sm sm:block">3 Hz – 1000 Hz</div>
            <div className="absolute right-[6%] top-[20%] z-10 hidden rounded-full border border-[#DFE3E8] bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#4D5562] shadow-sm sm:block">10 pre-set programs</div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F8FA] py-14 sm:py-16 lg:py-20" aria-labelledby="steps-heading">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionIntro title="Three Simple Steps">Get started with FlexPulse in just a few minutes.</SectionIntro>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }} className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {steps.map((step, index) => (
              <motion.article key={step.number} variants={entrance} transition={{ duration: 0.45, ease: "easeOut" }} whileHover={reduceMotion ? undefined : { y: -3 }} className="group relative min-h-[220px] overflow-hidden rounded-[20px] border border-[#E9E6E6] bg-white transition-shadow duration-200 hover:shadow-[0_12px_26px_rgba(30,35,42,.07)]">
                <div className="relative grid min-h-[220px] grid-cols-[1.05fr_.95fr]">
                  <div className="relative z-10 flex flex-col justify-between p-5 sm:p-6">
                    <span className="grid size-8 place-items-center rounded-full bg-[#FCEAEC] text-[11px] font-bold text-[#D60016]">{step.number}</span>
                    <h3 className="max-w-[205px] text-[17px] font-semibold leading-[1.25] tracking-[-.025em] text-[#17191D]">{step.title}</h3>
                  </div>
                  <img src={step.image} alt={step.alt} loading="lazy" width="900" height="600" className={`h-full w-full ${step.position} object-cover`} />
                  <div className="pointer-events-none absolute inset-y-0 left-[35%] w-1/4 bg-gradient-to-r from-white via-white/35 to-transparent" aria-hidden="true" />
                </div>
                {index < steps.length - 1 && <motion.div initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ delay: reduceMotion ? 0 : 0.25 + index * 0.1, duration: 0.25 }} className="absolute -right-[18px] top-1/2 z-20 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-[#E9E6E6] bg-white text-[#D60016] lg:grid"><ChevronRight className="size-4" /></motion.div>}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="guides-heading">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionIntro title="Explore the Guides">Everything you need to get the most from FlexPulse.</SectionIntro>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }} className="mt-8 grid gap-3 md:grid-cols-3">
            {guides.map(({ title, description, to, icon: Icon }) => (
              <motion.div key={to} variants={entrance} transition={{ duration: 0.4 }}>
                <Link to={to} className="group flex min-h-[174px] flex-col rounded-[18px] border border-[#E9E6E6] bg-white p-5 transition-colors duration-200 hover:border-[#E5B6BB] hover:bg-[#FFF9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2 sm:p-6">
                  <Icon className="size-5 text-[#D60016]" strokeWidth={1.65} />
                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-.025em] text-[#17191D]">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#626975]">{description}</p>
                    </div>
                    <ArrowRight className="mb-1 size-4 shrink-0 text-[#D60016] transition-transform duration-200 group-hover:translate-x-[3px]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F8F8FA] py-14 sm:py-16 lg:py-[72px]" aria-labelledby="guarantee-heading">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="overflow-hidden rounded-[22px] border border-[#E9E6E6] bg-white lg:grid lg:grid-cols-[35%_65%]">
            <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.5 }} className="relative grid min-h-[220px] place-items-center overflow-hidden bg-[#FCEAEC] p-7 sm:min-h-[250px]">
              <div className="absolute size-[280px] rounded-full border border-[#D60016]/10" aria-hidden="true" />
              <div className="absolute size-[190px] rounded-full border border-[#D60016]/15" aria-hidden="true" />
              <GuaranteeIllustration />
            </motion.div>
            <motion.div initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }} className="p-6 sm:p-8 lg:p-10">
              <motion.h2 id="guarantee-heading" variants={entrance} transition={{ duration: 0.4 }} className="text-[clamp(2rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-.055em] text-[#17191D]">Try It for <span className="text-[#D60016]">30 Days</span></motion.h2>
              <motion.p variants={entrance} transition={{ duration: 0.4 }} className="mt-4 max-w-[700px] text-[15px] leading-[1.7] text-[#626975] sm:text-base">
                Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.
              </motion.p>
              <motion.div variants={entrance} transition={{ duration: 0.4 }} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/product" className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#D60016] px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#A90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">Shop Now · $999 <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" /></Link>
                <Link to="/guarantee" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C9CDD3] px-6 text-sm font-semibold text-[#30343B] transition-colors duration-200 hover:border-[#D60016] hover:text-[#D60016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">Guarantee &amp; Warranty</Link>
              </motion.div>
              <motion.div variants={entrance} transition={{ duration: 0.4 }} className="mt-8 grid divide-y divide-[#E9E6E6] border-y border-[#E9E6E6] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex min-h-16 items-center gap-3 py-3 sm:px-4 sm:first:pl-0"><HeartPulse className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.7} /><span className="text-xs font-semibold text-[#3C4149]">30-Day Return</span></div>
                <div className="flex min-h-16 items-center gap-3 py-3 sm:px-4"><ShieldCheck className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.7} /><span className="text-xs font-semibold text-[#3C4149]">2-Year Warranty — Controller</span></div>
                <div className="flex min-h-16 items-center gap-3 py-3 sm:px-4 sm:last:pr-0"><ScanLine className="size-4 shrink-0 text-[#D60016]" strokeWidth={1.7} /><span className="text-xs font-semibold text-[#3C4149]">6-Month Warranty — Charging Disc &amp; Coils</span></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
