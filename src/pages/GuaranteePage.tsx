import { BookOpen, ChevronRight, Clock3, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import TryItCta from "@/components/layout/TryItCta";

const summary = [
  ["Controller", "2-year warranty", ShieldCheck],
  ["Charging disc", "6-month warranty", PackageCheck],
  ["Coil applicators", "6-month warranty", PackageCheck],
  ["Returns", "Within 30 days of receipt; 20% restocking fee unless it’s a manufacturer’s error", Clock3],
  ["Return authorization", "RMA number required", Truck],
] as const;

const returnPolicy = [
  "If you are not satisfied with the FlexPulse PEMF device within 30 days, you may request a return for refund.",
  "Merchandise must be in excellent condition with all parts, accessories, and original packaging.",
  "If returned for any reason other than manufacturer’s error, a 20% restocking fee will apply, and it will be deducted from the refund. The customer is responsible for return shipping fees, which are non-refundable as well.",
  "The 30-day period starts from date of receipt, we can choose to extend the trial period for a fair reason within our discretion.",
  "If not satisfied in 30 days and if you would like to process return, please contact the office or via the website from where you made the purchase to obtain an RMA (Return Merchandise Authorization) number. Units returned without an issued RMA# will not be accepted.",
  "It is strongly suggested that Customers purchase insurance on the return shipment. If the package is damaged during the shipping process, the return will not be accepted. It is also suggested Customers get tracking and shipping confirmation when returning a product to ensure we receive the package. We are not responsible for packages lost during the return shipping process from the customer’s end.",
];

const helpLinks = [
  ["Contact Us", "Phone, opening hours and our office address.", "/contact", Truck],
  ["Shipping & Handling", "When orders ship, how, and how long delivery takes.", "/shipping", PackageCheck],
  ["FAQ", "Using, charging and caring for your FlexPulse.", "/faq", BookOpen],
  ["User Guide", "Set up your FlexPulse and pick a program.", "/getting-started", ShieldCheck],
] as const;

const reveal: Variants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .42, ease: "easeOut" } } };

export default function GuaranteePage() {
  return (
    <main className="bg-[#FAF8F6] text-[#211E1D]">
      <section className="border-b border-[#E8E1DB] bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-0">
          <p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">FLEXPULSE SUPPORT</p>
          <h1 className="mt-3 font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-[.92] tracking-[-.06em]">Guarantee &amp; Warranty</h1>
          <p className="mt-5 max-w-[720px] text-[16px] leading-relaxed text-[#625D59]">Every FlexPulse comes with a 30-day satisfaction guarantee, a 2-year warranty on the controller and a 6-month warranty on the charging disc and coil applicators.</p>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {summary.map(([title, value, Icon], index) => <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: reveal.hidden, visible: { ...reveal.visible, transition: { duration: .42, delay: index * .06 } } }} className="min-h-36 rounded-[18px] border border-[#E8E1DB] bg-[#FAF8F6] p-5"><Icon className="size-5 text-[#D71920]" strokeWidth={1.6} /><p className="mt-5 text-xs font-semibold text-[#625D59]">{title}</p><p className="mt-1 text-sm font-semibold leading-snug">{value}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F6]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:px-12 lg:py-20 xl:px-0">
          <nav className="sticky top-16 z-20 -mx-5 self-start bg-[#FAF8F6] px-5 py-3 sm:-mx-8 sm:px-8 lg:top-28 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0" aria-label="Guarantee sections"><div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:space-y-1 lg:overflow-visible"><a href="#satisfaction-guarantee" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#D71920] bg-[#FBE5E5] px-4 text-sm font-semibold text-[#D71920] lg:w-full lg:rounded-lg"><span className="text-xs">01</span>30-Day Guarantee</a><a href="#warranty" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#E8E1DB] px-4 text-sm font-semibold text-[#625D59] hover:border-[#D71920] hover:text-[#D71920] lg:w-full lg:rounded-lg"><span className="text-xs text-[#D71920]">02</span>Warranty</a></div></nav>
          <div className="min-w-0 space-y-14 sm:space-y-16">
            <motion.section id="satisfaction-guarantee" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} className="scroll-mt-28"><SectionHeading label="GUARANTEE & WARRANTY" title="30-Day Satisfaction Guarantee" />{returnPolicy.map((paragraph) => <p key={paragraph} className="mt-5 max-w-[760px] text-[15px] leading-[1.7] text-[#625D59]">{paragraph}</p>)}</motion.section>
            <motion.section id="warranty" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} className="scroll-mt-28"><SectionHeading label="GUARANTEE & WARRANTY" title="Warranty" /><div className="mt-5 max-w-[760px] space-y-5 text-[15px] leading-[1.7] text-[#625D59]"><p>The FlexPulse comes with a warranty which provides free servicing during its term starting from date of receipt, less shipping cost.</p><div className="rounded-[18px] border border-[#E8E1DB] bg-white p-5"><p className="font-semibold text-[#211E1D]">Warranty period on the FlexPulse components of the product is:</p><dl className="mt-4 divide-y divide-[#E8E1DB]"><WarrantyRow label="Controller" value="2 years" /><WarrantyRow label="Charging Disc" value="6-months" /><WarrantyRow label="Coil Applicators" value="6-months" /></dl></div><p>The warranty applies only if the product is non-functional due to a defect in production which is not present in other systems sold of the same model.</p><p>In case of servicing requirement which is outside the warranty, please contact us and we will make every effort to make it possible at minimal expense.</p><p>The FlexPulse G2 kit: control unit, coil pads, charging pad and carry case</p></div></motion.section>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E1DB] bg-[#F5F1EE]"><div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-0"><div className="border-b border-[#DED4CE] pb-6"><p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">NEED A HAND?</p><p className="mt-3 max-w-[650px] text-[15px] leading-relaxed text-[#625D59]">Monday to Thursday 9:00 AM – 5:30 PM and Friday 9:00 AM – 5:00 PM (EST), or start here.</p></div><div className="grid divide-y divide-[#DED4CE] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">{helpLinks.map(([title, description, href, Icon]) => <Link key={title} to={href} className="group flex min-h-44 flex-col justify-between py-6 sm:px-5 sm:first:pl-0 sm:last:pr-0 lg:min-h-48"><Icon className="size-6 text-[#D71920]" strokeWidth={1.6} /><div className="mt-8 flex items-end justify-between gap-3"><div><h3 className="font-semibold transition-colors group-hover:text-[#D71920]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#625D59]">{description}</p></div><ChevronRight className="size-4 shrink-0 text-[#D71920] transition-transform group-hover:translate-x-0.5" /></div></Link>)}</div></div></section>
      <TryItCta />
    </main>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return <div className="border-b border-[#E8E1DB] pb-4"><p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">{label}</p><h2 className="mt-2 font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-none tracking-[-.05em]">{title}</h2></div>;
}

function WarrantyRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 py-3 text-sm"><dt>{label}</dt><dd className="font-semibold text-[#211E1D]">{value}</dd></div>;
}
