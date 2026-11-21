import { Coins, Link2, UserRoundPlus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const statistics = [["15%", "Commission on every sale"], ["$193.50", "Per FlexPulse G2 at full price"], ["30 days", "To buy after clicking your link"], ["Free", "To join"]];
const steps = [{ title: "Apply", icon: UserRoundPlus }, { title: "Share your link", icon: Link2 }, { title: "Earn 15%", icon: Coins }];

export default function AffiliatePage() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => reduceMotion ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: .45, delay } };

  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#211E1D]">
      <section className="relative isolate border-b border-[#E8E1DB]">
        <WaveLines />
        <div className="relative mx-auto max-w-[1320px] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-24">
          <motion.p {...reveal()} className="text-xs font-bold tracking-[.14em] text-[#D71920]">AFFILIATE PROGRAM</motion.p>
          <motion.h1 {...reveal(.06)} className="mt-4 max-w-[960px] text-[clamp(3rem,5.1vw,4rem)] font-semibold leading-[1.06] tracking-[-.055em]">Earn 15% on every FlexPulse you refer</motion.h1>
          <motion.p {...reveal(.12)} className="mt-5 max-w-[620px] text-[16px] leading-[1.65] text-[#625D59]">Share FlexPulse with your audience. When someone buys through your link within 30 days, you earn 15%.</motion.p>
          <motion.div {...reveal(.18)} className="mt-7 flex flex-wrap gap-3">
            <Button className="h-12 px-7 text-sm">Apply to join</Button>
            <Button variant="outline" className="h-12 px-7 text-sm">Log in</Button>
          </motion.div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
            {statistics.map(([value, description], index) => <motion.div key={description} {...reveal(index * .07)} whileHover={reduceMotion ? undefined : { y: -2 }} className="min-h-[142px] rounded-[18px] border border-[#E8E1DB] bg-white p-5 transition-shadow hover:shadow-[0_8px_20px_rgba(33,30,29,.06)] sm:p-6"><p className="text-[clamp(1.65rem,2.5vw,2rem)] font-bold tracking-[-.045em] text-[#D71920]">{value}</p><p className="mt-3 max-w-[170px] text-sm leading-relaxed text-[#625D59]">{description}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F1EE] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
        <div className="mx-auto max-w-[1320px]">
          <motion.h2 {...reveal()} className="text-[clamp(2.25rem,3.3vw,2.8rem)] font-semibold tracking-[-.05em]">How it works</motion.h2>
          <div className="relative mt-7 grid gap-4 md:grid-cols-3 md:gap-6">
            <motion.div initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: .55 }} className="absolute left-[16%] right-[16%] top-1/2 hidden h-px origin-left bg-[#D71920]/35 md:block" />
            {steps.map(({ title, icon: Icon }, index) => <motion.article key={title} {...reveal(index * .1)} className="relative z-10 flex min-h-40 flex-col justify-between rounded-[18px] border border-[#E8E1DB] bg-white p-6 sm:p-7"><span className="grid size-10 place-items-center rounded-xl border border-[#F1C1C2] bg-[#FFF8F8] text-[#D71920]"><Icon className="size-5" strokeWidth={1.6} /></span><h3 className="mt-8 text-xl font-semibold tracking-[-.03em]">{title}</h3></motion.article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E1DB] bg-[#FAF8F6] px-5 py-14 text-center sm:px-8 sm:py-18 lg:px-12 lg:py-20">
        <motion.div {...reveal()} className="mx-auto max-w-[710px]">
          <h2 className="text-[clamp(2.25rem,3.5vw,2.9rem)] font-semibold tracking-[-.05em]">Try It for 30 Days</h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#625D59]">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3"><Button onClick={() => { window.location.href = "/product"; }} className="h-12 px-7 text-sm">Shop Now · $999</Button><Link to="/guarantee"><Button variant="outline" className="h-12 px-7 text-sm">Guarantee &amp; Warranty</Button></Link></div>
        </motion.div>
      </section>
    </main>
  );
}

function WaveLines() {
  const reduceMotion = useReducedMotion();
  return <motion.svg animate={reduceMotion ? undefined : { x: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-[-150px] top-[-40px] hidden h-[450px] w-[720px] text-[#D71920]/[.09] lg:block" viewBox="0 0 720 450" fill="none" aria-hidden="true"><path d="M196 440C299 319 330 97 689 17" stroke="currentColor" strokeWidth="1.2" /><path d="M228 455C329 331 376 131 717 48" stroke="currentColor" strokeWidth="1.2" /><path d="M265 460C364 340 415 166 730 79" stroke="currentColor" strokeWidth="1.2" /><path d="M305 460C404 350 449 200 730 112" stroke="currentColor" strokeWidth="1.2" /></motion.svg>;
}
