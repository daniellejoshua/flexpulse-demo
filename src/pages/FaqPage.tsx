import { ArrowUpRight, BatteryCharging, BookOpen, CircleHelp, Headphones, ShieldCheck, Wrench } from "lucide-react";
import { motion, type Variants, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import TryItCta from "@/components/layout/TryItCta";

const groups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Using FlexPulse",
    items: [
      { q: "How do I use the FlexPulse G2 PEMF?", a: "Charge it, place the coils where you want them, then choose one of the 10 programs and a session time. See the User Guide for step-by-step setup." },
      { q: "What is this system most suited for?", a: "Everyday recovery, relaxation, sleep support, and focused work, depending on the program you choose." },
      { q: "Where do I place these coils?", a: "Almost anywhere on the body. See the Coil Placement page for examples and tips." },
      { q: "Should I use one or two coils?", a: "One coil gives full intensity; two coils share the unit’s intensity and drain the battery faster." },
      { q: "How do I know the FlexPulse is emitting pulsed electromagnetic fields?", a: "Use the included magnetic field detector to confirm output." },
    ],
  },
  {
    title: "Coils & charging",
    items: [
      { q: "How long do the coils last?", a: "Coils carry a 6-month manufacturer warranty and are replaceable." },
      { q: "Does this have rechargeable batteries?", a: "Yes, the control unit has an internal rechargeable battery with up to 12 hours of use." },
      { q: "Why can’t I charge the FlexPulse while using it?", a: "The unit does not run while charging; charge until the charger light turns green, then unplug." },
    ],
  },
  {
    title: "Orders & warranty",
    items: [
      { q: "What’s in the box when I order a FlexPulse G2 PEMF?", a: "Control unit, 2 applicators, wireless charge pad, belt clip case, magnetic field detector, travel case, blue lanyard, PEMF compression wrap, user manual, program descriptions, and quick start guide." },
      { q: "What makes this device different than others?", a: "Portable, up to 200 gauss, 10 programs from 3 to 1000 Hz, German-engineered, and wearable." },
      { q: "Is there a product warranty?", a: "2 years on the controller, 6 months on the charging disc and coils." },
    ],
  },
  {
    title: "Safety",
    items: [
      { q: "The Risks of PEMFs versus EMFs", a: "PEMF uses pulsed magnetic fields, not continuous EMF exposure. Read the contraindications and cautions before first use." },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      { q: "My FlexPulse unit is not working, what should I do?", a: "Check charge, coil connection, and program selection. Contact support if issues persist." },
      { q: "Having any other issues with your FlexPulse?", a: "Reach out via the Contact page; our team is happy to help." },
    ],
  },
];

const supportLinks = [
  { icon: Headphones, title: "Contact Us", description: "Get help from our support team.", href: "/contact" },
  { icon: BookOpen, title: "User Guide", description: "Follow the setup steps.", href: "/getting-started" },
  { icon: ShieldCheck, title: "Guarantee & Warranty", description: "Review coverage and returns.", href: "/guarantee" },
];
const mobileIcons = [CircleHelp, BatteryCharging, BookOpen, ShieldCheck, Wrench];

const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

function toId(title: string) {
  return `faq-${title.toLowerCase().replace(/\s*&\s*/g, "-").replace(/\s+/g, "-")}`;
}

export default function FaqPage() {
  const [activeGroup, setActiveGroup] = useState(0);
  const reduceMotion = useReducedMotion();

  const selectGroup = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    event.preventDefault();
    setActiveGroup(index);
    const target = document.getElementById(toId(groups[index].title));
    target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${toId(groups[index].title)}`);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (!media.matches) return;
    const sections = groups.map((group) => document.getElementById(toId(group.title))).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
      if (current) setActiveGroup(sections.indexOf(current.target as HTMLElement));
    }, { rootMargin: "-120px 0px -55% 0px", threshold: [0.05, 0.2] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#FAF8F6] text-[#201C1B]">
      <section className="bg-white" aria-label="Frequently asked questions">
        <div className="relative overflow-hidden bg-[linear-gradient(115deg,#fff_0%,#FAF8F8_100%)] px-5 pb-6 pt-8 md:hidden">
          <svg className="pointer-events-none absolute -right-12 top-0 h-32 w-48 text-[#D60016]/10" viewBox="0 0 192 128" fill="none" aria-hidden="true"><path d="M8 91C54 27 107 29 181 76" stroke="currentColor" strokeWidth="1.5" /><path d="M-16 112C42 41 109 49 196 95" stroke="currentColor" strokeWidth="1" /></svg>
          <p className="relative flex items-center gap-2 text-[11px] font-semibold tracking-[.14em] text-[#D60016]"><span className="h-px w-7 bg-[#D60016]" />FLEXPULSE FAQ</p>
          <h1 className="relative mt-4 text-[clamp(1.9rem,9vw,2.15rem)] font-bold leading-[1.1] tracking-[-.045em]">Frequently Asked Questions</h1>
          <p className="relative mt-3 max-w-[34rem] text-sm leading-relaxed text-[#626975]">Find answers about using FlexPulse, safety, troubleshooting, warranty, and more.</p>
        </div>
        <div className="mx-auto grid w-full max-w-[1280px] gap-7 px-5 py-0 md:gap-10 md:px-8 md:py-20 lg:grid-cols-[250px_1fr] lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
          <nav className="sticky top-16 z-20 -mx-5 w-auto min-w-0 self-start border-y border-[#E8E1DB] bg-white px-5 py-2.5 shadow-[0_5px_12px_rgba(32,27,25,.04)] md:top-16 md:-mx-8 md:px-8 md:py-3 lg:top-28 lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none" aria-label="FAQ categories">
            <div className="flex snap-x gap-2 overflow-x-auto pr-5 scroll-smooth [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pr-8 lg:block lg:space-y-1 lg:overflow-visible lg:pr-0">
              {groups.map((group, index) => (
                <a key={group.title} href={`#${toId(group.title)}`} onClick={(event) => selectGroup(event, index)} className={`inline-flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-full border px-3.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] md:min-h-11 md:gap-3 md:px-4 md:text-sm lg:w-full lg:rounded-lg ${activeGroup === index ? "border-[#D60016] bg-[#D60016] text-white" : "border-[#E2D9D3] bg-white text-[#625D59] hover:border-[#C71920] hover:text-[#C71920]"}`}>
                  <span className={`text-[11px] ${activeGroup === index ? "text-white/80" : "text-[#C71920]"}`}>0{index + 1}</span>{group.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-10 pb-10 md:space-y-16 md:pb-0">
            {groups.map((group, groupIndex) => {
              const MobileIcon = mobileIcons[groupIndex];
              return (
              <motion.section key={group.title} id={toId(group.title)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={reveal} className="scroll-mt-28">
                <div className="flex items-end justify-between gap-4 border-b border-[#DCD3CD] pb-4">
                  <div>
                    <div className="flex items-center gap-3 md:block"><span className="grid size-11 place-items-center rounded-xl bg-[#FCEAEC] text-[#D60016] md:hidden"><MobileIcon className="size-5" /></span><p className="text-[11px] font-bold tracking-[0.13em] text-[#C71920] md:hidden">{group.title.toUpperCase()}</p><p className="hidden text-[11px] font-bold tracking-[0.13em] text-[#C71920] md:block">FLEXPULSE FAQ</p></div>
                    <h2 className="mt-3 text-[23px] font-bold leading-none tracking-[-0.04em] md:mt-2 md:font-serif md:text-[clamp(1.85rem,3vw,3.05rem)] md:tracking-[-0.05em]">{group.title}</h2>
                  </div>
                  <CircleHelp className="mb-1 hidden size-6 shrink-0 text-[#C71920] md:block" strokeWidth={1.5} />
                </div>
                <Accordion type="single" collapsible className="divide-y divide-[#E5DED8]">
                  {group.items.map((item, index) => (
                    <AccordionItem key={item.q} value={`${group.title}-${index}`} className="border-0 data-[state=open]:bg-[#FFF9F9] md:data-[state=open]:bg-transparent">
                      <AccordionTrigger className="min-h-14 gap-4 px-1 py-4 text-[15px] font-semibold leading-snug text-[#201C1B] hover:text-[#C71920] data-[state=open]:text-[#C71920] md:min-h-16 md:gap-6 md:px-0 md:py-5 md:text-[17px]">{item.q}</AccordionTrigger>
                      <AccordionContent className="max-w-[720px] px-1 text-[13px] leading-[1.65] text-[#626975] md:px-0 md:text-[15px] md:leading-[1.68] md:text-[#625D59]">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.section>
            ); })}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F8] px-5 py-8 md:hidden" aria-labelledby="mobile-faq-support-heading">
        <div className="rounded-[20px] bg-[#F4F0EC] p-5">
          <p className="text-[11px] font-bold tracking-[.13em] text-[#D60016]">NEED MORE HELP?</p>
          <h2 id="mobile-faq-support-heading" className="mt-2 text-[24px] font-bold leading-tight tracking-[-.04em]">We&apos;re here to help.</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#626975]">Explore a resource or contact our team for support with your FlexPulse.</p>
          <div className="mt-4 divide-y divide-[#DDD4CE]">
            {supportLinks.map(({ icon: Icon, title, description, href }) => <Link key={title} to={href} className="group flex min-h-16 items-center gap-3 py-3 first:pt-0 last:pb-0"><Icon className="size-5 shrink-0 text-[#D60016]" /><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#201C1B]">{title}</span><span className="mt-0.5 block text-xs leading-relaxed text-[#626975]">{description}</span></span><ArrowUpRight className="size-4 shrink-0 text-[#D60016] transition-transform group-active:translate-x-0.5 group-active:-translate-y-0.5" /></Link>)}
          </div>
        </div>
      </section>

      <section className="hidden border-y border-[#E5DED8] bg-[#F0EBE5] md:block" aria-labelledby="faq-support-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-0">
          <div className="flex flex-col justify-between gap-4 border-b border-[#D9D0CA] pb-7 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold tracking-[0.13em] text-[#C71920]">NEED MORE HELP?</p>
              <h2 id="faq-support-heading" className="mt-3 font-serif text-[clamp(2.25rem,3.5vw,3.6rem)] leading-none tracking-[-0.05em]">We&apos;re here to help.</h2>
            </div>
            <p className="max-w-[370px] text-[15px] leading-relaxed text-[#625D59]">Explore a resource or contact our team for support with your FlexPulse.</p>
          </div>
          <div className="grid divide-y divide-[#D9D0CA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {supportLinks.map(({ icon: Icon, title, description, href }) => (
              <Link key={title} to={href} className="group flex min-h-36 flex-col justify-between py-6 text-left sm:px-6 sm:first:pl-0 sm:last:pr-0">
                <Icon className="size-6 text-[#C71920]" strokeWidth={1.6} />
                <div className="mt-8 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-[#201C1B] transition-colors group-hover:text-[#C71920]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#625D59]">{description}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-[#C71920] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TryItCta compactOnMobile />
    </main>
  );
}
