import { Activity, ArrowRight, Braces, Database, Share2, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const policySections = [
  {
    title: "Definitions",
    text: "Client, Client Data, Personal Data, Public/Restricted Area, User, Visitor.",
    icon: Braces,
  },
  {
    title: "Information we collect",
    text: "User-provided information, information collected by clients, automatically collected information (cookies, beacons), integrated services, and information from other sources.",
    icon: Database,
  },
  {
    title: "How we use it",
    text: "Operations, improvements, communications, cookies and tracking, analytics.",
    icon: Activity,
  },
  {
    title: "To whom we disclose",
    text: "Unrestricted information, service providers, non-personally identifiable information, law enforcement/legal process, change of ownership.",
    icon: Share2,
  },
  {
    title: "Your choices",
    text: "Access, correction, deletion; navigation information; opting out of commercial communications.",
    icon: SlidersHorizontal,
  },
] as const;

function toId(title: string) {
  return `privacy-${title.toLowerCase().replace(/\s+/g, "-")}`;
}

function PrivacyGuarantee() {
  return (
    <section className="bg-[#F8F7F7] py-10 sm:py-12 lg:py-14" aria-labelledby="privacy-guarantee-heading">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-[20px] border border-[#E9E6E6] bg-white sm:grid-cols-[132px_1fr]">
          <div className="relative grid min-h-28 place-items-center overflow-hidden bg-[#FCEAEC] p-5">
            <div className="absolute size-32 rounded-full border border-[#D60016]/15" aria-hidden="true" />
            <ShieldCheck className="relative size-11 text-[#D60016]" strokeWidth={1.35} aria-hidden="true" />
          </div>
          <div className="p-5 sm:p-7">
            <h2 id="privacy-guarantee-heading" className="text-[clamp(1.55rem,2.5vw,2.15rem)] font-bold leading-[1.08] tracking-[-.045em] text-[#17191D]">Try It for <span className="text-[#D60016]">30 Days</span></h2>
            <p className="mt-3 max-w-[760px] text-sm leading-[1.65] text-[#626975] sm:text-[15px]">
              Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link to="/product" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D60016] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#A90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">Shop Now · $999 <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-[3px]" /></Link>
              <Link to="/guarantee" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C9CDD3] px-5 text-sm font-semibold text-[#30343B] transition-colors hover:border-[#D60016] hover:text-[#D60016] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">Guarantee &amp; Warranty</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = policySections.map(({ title }) => document.getElementById(toId(title))).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveSection(sections.indexOf(current.target as HTMLElement));
    }, { rootMargin: "-130px 0px -55% 0px", threshold: [0.05, 0.25] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    setActiveSection(index);
    const section = document.getElementById(toId(policySections[index].title));
    section?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${toId(policySections[index].title)}`);
  };

  return (
    <main className="bg-[#F8F7F7] text-[#17191D]">
      <section className="relative isolate overflow-hidden border-b border-[#E9E6E6] bg-[linear-gradient(115deg,#fff_0%,#FAF9F9_58%,#F3F4F6_100%)]" aria-labelledby="privacy-heading">
        <svg className="pointer-events-none absolute -right-20 top-0 hidden h-full w-[520px] text-[#D60016]/[.075] sm:block" viewBox="0 0 520 300" fill="none" aria-hidden="true">
          <path d="M-20 244C105 81 234 55 545 166M-40 280C115 112 279 93 555 205M-15 207C110 50 248 31 533 128" stroke="currentColor" strokeWidth="1.1" />
        </svg>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.42, ease: "easeOut" }} className="relative mx-auto w-full max-w-[1200px] px-5 py-11 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
          <p className="flex items-center gap-3 text-[11px] font-bold tracking-[.15em] text-[#D60016]"><span className="h-px w-8 bg-current" />LEGAL &amp; PRIVACY</p>
          <h1 id="privacy-heading" className="mt-4 text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold leading-[1.03] tracking-[-.06em]">Privacy Policy</h1>
          <p className="mt-5 max-w-[760px] text-[15px] leading-[1.7] text-[#626975] sm:text-base">
            This policy describes the information we gather on or through the Service, how we use and disclose it, and the steps we take to protect it. By visiting the site or purchasing, you accept the practices described here.
          </p>
        </motion.div>
      </section>

      <div className="sticky top-16 z-20 border-b border-[#E9E6E6] bg-white shadow-[0_5px_12px_rgba(23,25,29,.04)] lg:hidden">
        <nav className="px-5 py-3 sm:px-8" aria-label="Browse privacy policy sections">
          <p className="mb-2 text-[11px] font-bold tracking-[.13em] text-[#D60016]">BROWSE SECTIONS</p>
          <div className="flex snap-x gap-2 overflow-x-auto pb-1 pr-5 scroll-smooth [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {policySections.map(({ title }, index) => (
              <a key={title} href={`#${toId(title)}`} onClick={(event) => navigate(event, index)} className={`inline-flex h-9 shrink-0 snap-start items-center rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] ${activeSection === index ? "border-[#D60016] bg-[#D60016] text-white" : "border-[#E9E6E6] bg-white text-[#3F454E]"}`}>{title}</a>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] gap-7 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-14">
        <aside className="hidden lg:block">
          <nav className="sticky top-[116px] border-l border-[#E9E6E6] pl-5" aria-label="On this page">
            <p className="mb-4 text-[11px] font-bold tracking-[.13em] text-[#D60016]">ON THIS PAGE</p>
            <div className="space-y-1">
              {policySections.map(({ title }, index) => (
                <a key={title} href={`#${toId(title)}`} onClick={(event) => navigate(event, index)} className={`relative block py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2 ${activeSection === index ? "font-semibold text-[#D60016]" : "text-[#626975] hover:text-[#17191D]"}`}>
                  {activeSection === index && <motion.span layoutId="privacy-active-indicator" transition={{ duration: reduceMotion ? 0 : 0.22 }} className="absolute -left-[21px] inset-y-1 w-0.5 bg-[#D60016]" />}
                  {title}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 space-y-3 sm:space-y-4">
          {policySections.map(({ title, text, icon: Icon }, index) => (
            <motion.section
              key={title}
              id={toId(title)}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : Math.min(index * 0.035, 0.14), ease: "easeOut" }}
              className="scroll-mt-28 rounded-[16px] border border-[#E9E6E6] bg-white p-[18px] sm:p-6 lg:p-7"
            >
              <div className="flex gap-3 sm:gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FCEAEC] text-[#D60016] sm:size-11"><Icon className="size-5" strokeWidth={1.6} /></span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[.13em] text-[#D60016]">SECTION {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-1 text-[21px] font-bold leading-[1.15] tracking-[-.04em] text-[#17191D] sm:text-[24px]">{title}</h2>
                </div>
              </div>
              <div className="mt-5 border-t border-[#E9E6E6] pt-4">
                <p className="max-w-[760px] text-[14px] leading-[1.65] text-[#4F5661] sm:text-[15px] sm:leading-[1.7]">{text}</p>
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      <PrivacyGuarantee />
    </main>
  );
}
