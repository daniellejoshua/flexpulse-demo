import { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Clock3, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PulseImage } from "@/components/ui/PulseImage";

const resources = [
  ["Shipping & Handling", "/shipping"],
  ["Guarantee & Warranty", "/guarantee"],
  ["FAQ", "/faq"],
  ["User Guide", "/getting-started"],
] as const;

const mapsUrl = "https://www.google.com/maps/search/?api=1&query=3954+State+Highway+7%2C+Oneonta%2C+NY+13820";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function ElectromagneticWave() {
  const reducedMotion = useReducedMotion();

  return (
    <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-[58%] text-[#C71920] lg:block" viewBox="0 0 760 260" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.g animate={reducedMotion ? undefined : { x: [-10, 10] }} transition={{ duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }} opacity=".32">
        <path d="M-30 165C75 66 164 70 262 153C361 237 462 226 549 140C625 65 695 72 795 152" stroke="currentColor" strokeWidth="1.25" />
        <path d="M-30 191C75 92 164 96 262 179C361 263 462 252 549 166C625 91 695 98 795 178" stroke="currentColor" strokeWidth="1" />
        <path d="M-30 139C75 40 164 44 262 127C361 211 462 200 549 114C625 39 695 46 795 126" stroke="currentColor" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}

function SupportCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={fadeUp} className="rounded-[1.1rem] border border-[#E3DCD6] bg-white p-6 transition-colors duration-200 hover:border-[#CEC2BA] sm:p-7">
      <div className="flex gap-4">
        <span className="mt-0.5 text-[#C71920]">{icon}</span>
        <div className="min-w-0">
          <h2 className="text-[19px] font-semibold tracking-tight text-[#28211F]">{title}</h2>
          <div className="mt-3 text-[14px] leading-[1.65] text-[#625D59]">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}

function ContactInformation() {
  return (
    <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="order-2 space-y-4 lg:order-1">
      <SupportCard icon={<Clock3 className="size-6" strokeWidth={1.65} />} title="Support hours">
        Monday to Thursday 9:00 AM – 5:30 PM (EST)<br />
        Friday 9:00 AM – 5:00 PM (EST)
      </SupportCard>
      <SupportCard icon={<MapPin className="size-6" strokeWidth={1.65} />} title="Our location">
        3954 State Highway 7<br />
        Oneonta, NY 13820 USA
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="group mt-3 inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#C71920] transition-colors hover:text-[#A9141A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2">
          Open in Maps <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </SupportCard>
      <SupportCard icon={<BookOpen className="size-6" strokeWidth={1.65} />} title="Helpful resources">
        <nav aria-label="Helpful resources" className="-mt-1">
          {resources.map(([label, href], index) => (
            <Link key={href} to={href} className={`group flex min-h-11 items-center justify-between gap-3 text-sm font-medium text-[#413A37] transition-colors hover:text-[#C71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920] focus-visible:ring-offset-2 ${index ? "border-t border-[#EEE8E4]" : ""}`}>
              {label}
              <ArrowUpRight className="size-4 shrink-0 text-[#C71920] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </nav>
      </SupportCard>
    </motion.aside>
  );
}

type FieldErrors = Partial<Record<"firstName" | "email" | "category" | "message", string>>;

function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submissionError, setSubmissionError] = useState(false);

  const clearError = (field: keyof FieldErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmissionError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FieldErrors = {};
    if (!data.get("firstName")?.toString().trim()) nextErrors.firstName = "Enter your first name.";
    if (!data.get("email")?.toString().trim()) nextErrors.email = "Enter your email address.";
    if (!data.get("category")) nextErrors.category = "Choose an inquiry category.";
    if (!data.get("message")?.toString().trim()) nextErrors.message = "Tell us how we can help.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // The current project has no contact endpoint; never claim a message was sent.
    setSubmissionError(true);
  };

  const fieldClass = (field: keyof FieldErrors) => `h-12 rounded-lg border-[#DDD6D1] bg-white text-sm focus:border-[#C71920] focus:ring-[#C71920]/20 ${errors[field] ? "border-[#C71920]" : ""}`;
  const optionalFieldClass = "h-12 rounded-lg border-[#DDD6D1] bg-white text-sm focus:border-[#C71920] focus:ring-[#C71920]/20";

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }} className="order-1 rounded-[1.25rem] border border-[#E3DCD6] bg-white p-6 shadow-[0_12px_32px_rgba(48,35,27,.05)] sm:p-9 lg:order-2 lg:p-10">
      <p className="text-[11px] font-bold tracking-[.08em] text-[#C71920]">GET IN TOUCH</p>
      <h2 className="mt-3 font-serif text-[clamp(2rem,3.2vw,2.6rem)] leading-none tracking-[-.045em] text-[#28211F]">Send us a message</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#625D59]">We take pride in providing timely, customer-centric support to our users worldwide, so please don&apos;t hesitate to get in touch.</p>

      <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="firstName" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
            FIRST NAME <span className="text-[#C71920]">*</span>
            <Input id="firstName" name="firstName" autoComplete="given-name" placeholder="Enter your first name" required aria-invalid={Boolean(errors.firstName)} aria-describedby={errors.firstName ? "firstName-error" : undefined} onChange={() => clearError("firstName")} className={fieldClass("firstName")} />
            {errors.firstName && <span id="firstName-error" className="-mt-1 text-xs font-normal normal-case tracking-normal text-[#C71920]">{errors.firstName}</span>}
          </label>
          <label htmlFor="lastName" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
            LAST NAME
            <Input id="lastName" name="lastName" autoComplete="family-name" placeholder="Enter your last name" className={optionalFieldClass} />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label htmlFor="email" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
            EMAIL <span className="text-[#C71920]">*</span>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="your@email.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} onChange={() => clearError("email")} className={fieldClass("email")} />
            {errors.email && <span id="email-error" className="-mt-1 text-xs font-normal normal-case tracking-normal text-[#C71920]">{errors.email}</span>}
          </label>
          <label htmlFor="phone" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
            PHONE
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" className={optionalFieldClass} />
          </label>
        </div>
        <label htmlFor="category" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
          INQUIRY CATEGORY <span className="text-[#C71920]">*</span>
          <select id="category" name="category" required defaultValue="" aria-invalid={Boolean(errors.category)} aria-describedby={errors.category ? "category-error" : undefined} onChange={() => clearError("category")} className={`h-12 rounded-lg border bg-white px-4 text-sm text-[#625D59] outline-none transition-colors focus:border-[#C71920] focus:ring-2 focus:ring-[#C71920]/20 ${errors.category ? "border-[#C71920]" : "border-[#DDD6D1]"}`}>
            <option value="" disabled>What&apos;s this about?</option>
            <option value="ordering">Ordering</option>
            <option value="using-flexpulse">Using FlexPulse</option>
            <option value="support">Product support</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <span id="category-error" className="-mt-1 text-xs font-normal normal-case tracking-normal text-[#C71920]">{errors.category}</span>}
        </label>
        <label htmlFor="message" className="grid gap-2 text-[11px] font-bold tracking-[.05em] text-[#383230]">
          TELL US MORE <span className="text-[#C71920]">*</span>
          <textarea id="message" name="message" required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} onChange={() => clearError("message")} className={`min-h-30 w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm leading-relaxed text-[#201C1B] outline-none transition-colors focus:border-[#C71920] focus:ring-2 focus:ring-[#C71920]/20 ${errors.message ? "border-[#C71920]" : "border-[#DDD6D1]"}`} placeholder="Tell us what&apos;s going on (include your order number if you have one)" />
          {errors.message && <span id="message-error" className="-mt-1 text-xs font-normal normal-case tracking-normal text-[#C71920]">{errors.message}</span>}
        </label>
        {submissionError && <p role="alert" className="rounded-lg border border-[#E8C6C7] bg-[#FFF6F6] px-4 py-3 text-sm text-[#9F1B21]">Message delivery is unavailable right now. Please try again later.</p>}
        <div className="pt-1">
          <Button type="submit" className="group min-h-12 bg-[#C71920] px-7 text-sm hover:bg-[#A9141A]">
            <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Submit Message
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-[#625D59]">By submitting, you agree to our <Link to="/privacy" className="underline hover:text-[#C71920]">Privacy Policy</Link> and <Link to="/terms" className="underline hover:text-[#C71920]">Terms &amp; Condition</Link>.</p>
        </div>
      </form>
    </motion.div>
  );
}

function LocationMap() {
  return (
    <section className="bg-[#F3ECE8]" aria-label="FlexPulse location">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-0">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative">
          <div className="relative z-10 mb-4 rounded-xl border border-[#E3DCD6] bg-white p-5 lg:absolute lg:left-6 lg:top-6 lg:mb-0 lg:w-[270px]">
            <p className="text-sm font-semibold text-[#28211F]">3954 State Highway 7<br />Oneonta, NY 13820 USA</p>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="group mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-[#C71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C71920]">
              Open in Maps <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
          <div className="overflow-hidden rounded-[1.15rem] border border-[#DDD4CE] bg-white">
            <iframe title="FlexPulse location in Oneonta, New York" src="https://www.google.com/maps?q=3954+State+Highway+7,+Oneonta,+NY+13820&output=embed" className="h-[230px] w-full border-0 grayscale-[.18] sm:h-[280px] lg:h-[310px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="bg-[#FAF8F6]" aria-labelledby="guarantee-heading">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-0">
        <div className="grid overflow-hidden rounded-[1.35rem] bg-[#1D1A19] text-[#F8F5F2] lg:grid-cols-[55%_45%]">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, ease: "easeOut" }} className="p-7 sm:p-10 lg:p-12">
            <h2 id="guarantee-heading" className="font-serif text-[clamp(2.7rem,4.3vw,3.75rem)] leading-[.95] tracking-[-.055em]">Try It for 30 Days</h2>
            <p className="mt-6 max-w-[570px] text-[15px] leading-[1.68] text-[#C6BFBA] sm:text-base">Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/product" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#A9141A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A19]">Shop Now · $999 <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" /></Link>
              <Link to="/guarantee" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/45 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1A19]">Guarantee &amp; Warranty</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, ease: "easeOut" }} className="min-h-[260px] p-4 pt-0 lg:min-h-0 lg:p-4 lg:pl-0">
            <PulseImage src="/assets/pemf-active-life.webp" alt="Person enjoying an active day with FlexPulse therapy" containerClassName="h-full w-full overflow-hidden rounded-[1rem]" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#211D1C]">
      <section className="relative isolate overflow-hidden border-b border-[#E5DED8] bg-[linear-gradient(110deg,#FAF8F6_15%,#F3ECE8)]" aria-labelledby="contact-heading">
        <ElectromagneticWave />
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="relative mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px] xl:px-0">
          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="text-[12px] font-semibold tracking-[.08em] text-[#C71920]">FLEXPULSE SUPPORT</motion.p>
          <motion.h1 id="contact-heading" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="mt-3 font-serif text-[clamp(2.7rem,5.2vw,4.75rem)] leading-[1.05] tracking-[-.06em]">We&apos;re here to help.</motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: "easeOut" } } }} className="mt-5 max-w-[600px] text-[15px] leading-[1.65] text-[#66615E] sm:text-[17px]">Have questions or need assistance ordering or using your FlexPulse portable PEMF system? Fill out the form and our team will be happy to help.</motion.p>
        </motion.div>
      </section>

      <section aria-label="Contact FlexPulse support">
        <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[38%_62%] lg:gap-8 lg:px-12 lg:py-24 xl:px-0">
          <ContactInformation />
          <ContactForm />
        </div>
      </section>

      <LocationMap />

      <section className="bg-white" aria-label="FlexPulse product support">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 px-5 py-14 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:px-12 xl:px-0">
          <PulseImage src="/assets/flexpulse-front.webp" alt="FlexPulse G2 controller" containerClassName="h-28 w-28 shrink-0 self-start lg:self-auto" className="h-full w-full object-contain" loading="lazy" />
          <div className="hidden h-24 w-px bg-[#E2DBD5] lg:block" />
          <p className="max-w-[760px] text-[15px] leading-[1.7] text-[#625D59] sm:text-base">FlexPulse PEMF devices are high intensity wearable PEMF therapy systems. Our 30-day satisfaction guarantee is hardly ever used, because we do our best to help you get the most from your FlexPulse.</p>
        </motion.div>
      </section>

      <GuaranteeSection />
    </main>
  );
}
