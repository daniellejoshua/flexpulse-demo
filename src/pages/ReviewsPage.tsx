import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ExternalLink, Quote, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { reviews } from "@/data/reviews";
import { PulseImage } from "@/components/ui/PulseImage";

const googleReviewsUrl = "https://goo.gl/8Bq57t";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function reviewBody(body: string) {
  return body.replace(" (Placeholder review — not verified customer feedback.)", "");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#E3A900]" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-3.5" fill={index < rating ? "currentColor" : "none"} strokeWidth={1.7} />
      ))}
    </div>
  );
}

function ElectromagneticWaves() {
  const reducedMotion = useReducedMotion();

  return (
    <svg className="pointer-events-none absolute bottom-0 left-0 hidden h-48 w-full text-[#C71920]/35 lg:block" viewBox="0 0 1440 190" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.g
        animate={reducedMotion ? undefined : { x: [-14, 14], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        <path d="M-20 148C146 39 298 50 459 140C612 225 786 215 936 117C1103 8 1271 22 1460 119" stroke="currentColor" strokeWidth="1" />
        <path d="M-20 170C146 61 298 72 459 162C612 247 786 237 936 139C1103 30 1271 44 1460 141" stroke="currentColor" strokeWidth="1" />
        <path d="M-20 125C146 16 298 27 459 117C612 202 786 192 936 94C1103 -15 1271 -1 1460 96" stroke="currentColor" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}

function FeaturedTestimonial() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const review = reviews[index];

  useEffect(() => {
    if (reducedMotion || reviews.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % reviews.length), 7000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }} className="relative mx-auto w-full max-w-[600px]">
      <div className="relative rounded-[1.25rem] border border-[#E5DED8] bg-[#F8F5F2] p-6 sm:rounded-[1.5rem] sm:p-10">
        <Quote className="size-8 text-[#C71920]" strokeWidth={1.45} aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={review.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            <div className="mt-5"><Stars rating={review.rating} /></div>
            <p className="mt-5 max-w-[450px] font-serif text-[clamp(1.7rem,2.6vw,2.45rem)] leading-[1.14] tracking-[-0.035em] text-[#28211F]">“{reviewBody(review.body)}”</p>
            <div className="mt-8 flex items-center gap-3 border-t border-[#DDD4CE] pt-5">
              <span className="grid size-9 place-items-center rounded-full bg-[#ECE5DF] text-[11px] font-bold text-[#625D59]">{review.author.charAt(0)}</span>
              <p className="text-sm font-semibold text-[#28211F]">{review.author}</p>
              <span className="text-xs text-[#766E68]">Sample feedback</span>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex gap-2" aria-label="Featured review controls">
          {reviews.map((item, itemIndex) => (
            <button key={item.id} type="button" onClick={() => setIndex(itemIndex)} className={`min-h-11 min-w-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] ${itemIndex === index ? "text-[#C71920]" : "text-[#CFC5BE]"}`} aria-label={`Show review by ${item.author}`} aria-current={itemIndex === index ? "true" : undefined}>
              <span className="block h-1.5 w-6 rounded-full bg-current" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ReviewCard({ review, className, hiddenFromAssistiveTech = false }: { review: (typeof reviews)[number]; className?: string; hiddenFromAssistiveTech?: boolean }) {
  return (
    <motion.article aria-hidden={hiddenFromAssistiveTech || undefined} variants={fadeUp} className={`flex h-[300px] flex-col overflow-hidden rounded-[1.15rem] border border-[#E0D8D2] bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#C9BDB5] hover:shadow-[0_10px_24px_rgba(45,34,26,.06)] sm:p-8 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <Stars rating={review.rating} />
        <span className="rounded-full bg-[#F5F1ED] px-2.5 py-1 text-[10px] font-semibold text-[#776D66]">Sample feedback</span>
      </div>
      <h3 className="mt-6 line-clamp-2 text-xl font-semibold tracking-tight text-[#28211F]">{review.title}</h3>
      <p className="mt-3 line-clamp-4 text-[15px] leading-[1.68] text-[#625D59]">{reviewBody(review.body)}</p>
      <footer className="mt-auto flex items-center gap-3 border-t border-[#E5DED8] pt-6">
        <span className="grid size-8 place-items-center rounded-full bg-[#F1EBE6] text-[11px] font-bold text-[#625D59]">{review.author.charAt(0)}</span>
        <span className="text-sm font-semibold text-[#37302C]">{review.author}</span>
      </footer>
    </motion.article>
  );
}

function GuaranteeSection() {
  return (
    <section className="bg-[#1D1A19] text-[#F8F5F2]" aria-labelledby="guarantee-heading">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="max-w-[500px]">
          <motion.h2 id="guarantee-heading" variants={fadeUp} className="font-serif text-[clamp(2.8rem,4.4vw,4.25rem)] leading-[.94] tracking-[-0.055em]">Try It for 30 Days</motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-[15px] leading-[1.68] text-[#C6BFBA] sm:text-base">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/product" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A9141A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A19]">Shop Now · $999 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/guarantee" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/45 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A19]">Guarantee &amp; Warranty</Link>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: "easeOut" }}>
          <PulseImage src="/assets/pemf-active-life.webp" alt="Person walking outdoors with a FlexPulse knee applicator" containerClassName="aspect-[1.3/1] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

export default function ReviewsPage() {
  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#28211F]">
      <section className="relative isolate overflow-hidden bg-[#1D1A19] text-[#F8F5F2]" aria-labelledby="reviews-heading">
        <ElectromagneticWaves />
        <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[42%_58%] lg:items-center lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-[440px]">
            <motion.p variants={fadeUp} className="text-[12px] font-semibold tracking-[0.13em] text-[#E65C61]">FLEXPULSE COMMUNITY</motion.p>
            <motion.h1 id="reviews-heading" variants={fadeUp} className="mt-4 font-serif text-[clamp(3.2rem,6.1vw,5.5rem)] leading-[.9] tracking-[-0.065em]">Customer<br />Reviews</motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-[420px] text-[15px] leading-[1.65] text-[#C6BFBA] sm:text-[17px]">Read how people fit FlexPulse into their own routines, whether at home, during recovery, or on the move.</motion.p>
            <motion.a variants={fadeUp} href={googleReviewsUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#F8F5F2] px-5 text-sm font-semibold text-[#28211F] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A19]">
              <span className="grid size-5 place-items-center rounded-full bg-[#4285F4] text-xs font-bold text-white">G</span>
              Read reviews on Google <ExternalLink className="size-3.5" />
            </motion.a>
          </motion.div>
          <FeaturedTestimonial />
        </div>
      </section>

      <section className="bg-white" aria-labelledby="community-heading">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[40%_60%] lg:items-center lg:gap-16 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="max-w-[470px]">
            <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.13em] text-[#C71920]">EVERYDAY FLEXIBILITY</motion.p>
            <motion.h2 id="community-heading" variants={fadeUp} className="mt-4 font-serif text-[clamp(2.6rem,4.6vw,4.25rem)] leading-[.95] tracking-[-.055em]">Made for the shape of real life.</motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-[15px] leading-[1.7] text-[#625D59] sm:text-base">FlexPulse is designed to travel easily between the quiet parts of a day: a desk break, a training bag, an evening wind-down.</motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-[15px] leading-[1.7] text-[#625D59] sm:text-base">Experiences vary from person to person. The entries below are clearly marked as sample content until verified customer reviews are available.</motion.p>
          </motion.div>
          <div className="grid grid-cols-[1.45fr_1fr] gap-3 sm:gap-4">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: "easeOut" }} className="row-span-2 overflow-hidden rounded-[1rem] sm:rounded-[1.15rem]">
              <PulseImage src="/assets/man-knee-coil.webp" alt="Person wearing a FlexPulse coil around their knee" containerClassName="h-full min-h-[370px] w-full" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.025]" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }} className="overflow-hidden rounded-[1rem] sm:rounded-[1.15rem]">
              <PulseImage src="/assets/flexpulse-controller-cozy.webp" alt="FlexPulse controller in a home setting" containerClassName="h-[calc((100%-0.75rem)/2)] min-h-[178px] w-full" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.025]" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.22, ease: "easeOut" }} className="overflow-hidden rounded-[1rem] sm:rounded-[1.15rem]">
              <PulseImage src="/assets/woman-back-coil-kitchen.webp" alt="Person wearing a FlexPulse coil at home" containerClassName="h-[calc((100%-0.75rem)/2)] min-h-[178px] w-full" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.025]" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F1ED]" aria-labelledby="words-heading">
        <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-0">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={stagger} className="max-w-[620px]">
            <motion.p variants={fadeUp} className="text-[11px] font-bold tracking-[0.13em] text-[#C71920]">UNVERIFIED SAMPLE CONTENT</motion.p>
            <motion.h2 id="words-heading" variants={fadeUp} className="mt-3 font-serif text-[clamp(2.7rem,4.5vw,4.4rem)] leading-[.95] tracking-[-.055em]">In their own words</motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-[1.7] text-[#625D59] sm:text-base">These examples show how this area will read when customer feedback is published. They are not verified customer testimonials.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="review-marquee-viewport mt-10 overflow-hidden" role="region" aria-label="Sample customer feedback carousel">
            <div className="review-marquee flex w-max gap-5 pr-5 md:gap-6 md:pr-6">
              {reviews.map((review) => <ReviewCard key={review.id} review={review} className="w-[min(84vw,390px)] shrink-0" />)}
              {reviews.map((review) => <ReviewCard key={`${review.id}-repeat`} review={review} hiddenFromAssistiveTech className="w-[min(84vw,390px)] shrink-0" />)}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#FAF8F6]" aria-labelledby="share-heading">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col justify-between gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:px-12 xl:px-0">
          <div className="max-w-[620px]">
            <h2 id="share-heading" className="font-serif text-[clamp(2.25rem,3.6vw,3.3rem)] leading-none tracking-[-.05em]">Have a FlexPulse story to share?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#625D59]">Tell us how FlexPulse fits into your routine.</p>
          </div>
          <Link to="/contact" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-[#C71920] px-6 text-sm font-semibold text-[#C71920] transition-colors hover:bg-[#C71920] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">Send your review <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>

      <GuaranteeSection />
    </main>
  );
}
