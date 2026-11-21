import { BookOpen, ChevronRight, Clock3, Globe2, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import TryItCta from "@/components/layout/TryItCta";

const summary = [
  ["Ships within", "1–2 business days after payment", Clock3],
  ["Carriers", "UPS or USPS", Truck],
  ["Signature", "Required on all deliveries", PackageCheck],
  ["International", "Import duties and taxes paid by the buyer", Globe2],
] as const;

const sections = [
  ["Processing", "We process and ship all orders within 1-2 business days after receipt of payment using the standard UPS or USPS shipping services.\n\nOrders are processed and shipped during regular business hours, Monday through Thursday from 9:00 AM – 4:00 PM Eastern Time (ET), excluding holidays."],
  ["Delivery times", "Once shipped, allow up to 14 business days for US delivery. Allow up to 3 weeks for international delivery."],
  ["Shipping costs", "Shipping is charged at the carrier’s rates for your address and the service you choose, and is shown at checkout before you pay."],
  ["International orders", "All international shipping inquiries should be made through our “contact us” form for international shipping quotes. International customers are responsible for import duties and taxes. EU orders may ship from EU depending on inventory."],
  ["Expedited shipping", "Expedited options are shown at checkout and charged at the carrier’s rates."],
  ["Signature on delivery", "Signature is required on all deliveries and if you do not want signature required, contact the shipping service’s local office with your shipment tracking number."],
] as const;

const helpLinks = [
  ["Contact Us", "Phone, opening hours and our office address.", "/contact", Truck],
  ["Guarantee & Warranty", "The 30-day return and what the warranty covers.", "/guarantee", ShieldCheck],
  ["FAQ", "Using, charging and caring for your FlexPulse.", "/faq", BookOpen],
  ["User Guide", "Set up your FlexPulse and pick a program.", "/getting-started", PackageCheck],
] as const;

const reveal: Variants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: .42, ease: "easeOut" } } };

export default function ShippingPage() {
  return (
    <main className="bg-[#FAF8F6] text-[#211E1D]">
      <section className="border-b border-[#E8E1DB] bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-0">
          <p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">FLEXPULSE SUPPORT</p>
          <h1 className="mt-3 font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-[.92] tracking-[-.06em]">Shipping &amp; Handling</h1>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map(([title, value, Icon], index) => <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: reveal.hidden, visible: { ...reveal.visible, transition: { duration: .42, delay: index * .06 } } }} className="min-h-36 rounded-[18px] border border-[#E8E1DB] bg-[#FAF8F6] p-5"><Icon className="size-5 text-[#D71920]" strokeWidth={1.6} /><p className="mt-5 text-xs font-semibold text-[#625D59]">{title}</p><p className="mt-1 text-sm font-semibold leading-snug">{value}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F6]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[220px_1fr] lg:gap-16 lg:px-12 lg:py-20 xl:px-0">
          <nav className="sticky top-16 z-20 -mx-5 self-start bg-[#FAF8F6] px-5 py-3 sm:-mx-8 sm:px-8 lg:top-28 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0" aria-label="Shipping sections"><div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:block lg:space-y-1 lg:overflow-visible">{sections.map(([title], index) => <a key={title} href={`#shipping-${index}`} className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] lg:w-full lg:rounded-lg ${index === 0 ? "border-[#D71920] bg-[#FBE5E5] text-[#D71920]" : "border-[#E8E1DB] text-[#625D59] hover:border-[#D71920] hover:text-[#D71920]"}`}><span className="text-xs text-[#D71920]">0{index + 1}</span>{title}</a>)}</div></nav>
          <div className="min-w-0 space-y-12 sm:space-y-14">
            {sections.map(([title, content], index) => <motion.section key={title} id={`shipping-${index}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={reveal} className="scroll-mt-28"><div className="border-b border-[#E8E1DB] pb-4"><p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">SHIPPING &amp; HANDLING</p><h2 className="mt-2 font-serif text-[clamp(1.9rem,3vw,2.7rem)] leading-none tracking-[-.05em]">{title}</h2></div><p className="mt-5 max-w-[760px] whitespace-pre-line text-[15px] leading-[1.7] text-[#625D59]">{content}</p></motion.section>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E1DB] bg-[#F5F1EE]">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-0">
          <div className="border-b border-[#DED4CE] pb-6"><p className="text-[11px] font-bold tracking-[.13em] text-[#D71920]">NEED A HAND?</p><p className="mt-3 max-w-[650px] text-[15px] leading-relaxed text-[#625D59]">Monday to Thursday 9:00 AM – 5:30 PM and Friday 9:00 AM – 5:00 PM (EST), or start here.</p></div>
          <div className="grid divide-y divide-[#DED4CE] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {helpLinks.map(([title, description, href, Icon]) => <Link key={title} to={href} className="group flex min-h-44 flex-col justify-between py-6 sm:px-5 sm:first:pl-0 sm:last:pr-0 lg:min-h-48"><Icon className="size-6 text-[#D71920]" strokeWidth={1.6} /><div className="mt-8 flex items-end justify-between gap-3"><div><h3 className="font-semibold transition-colors group-hover:text-[#D71920]">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#625D59]">{description}</p></div><ChevronRight className="size-4 shrink-0 text-[#D71920] transition-transform group-hover:translate-x-0.5" /></div></Link>)}
          </div>
        </div>
      </section>
      <TryItCta />
    </main>
  );
}
