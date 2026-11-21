import { Activity, BatteryCharging, ShieldCheck, ShoppingBag, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShouldReduceMotion } from "@animate-ui/react/utils/motion";
import { flexPulseG2 } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";

const gallery = [
  { src: "/assets/hero-kit.webp", alt: "FlexPulse G2 complete system with travel case", label: "Complete FlexPulse G2 kit" },
  { src: "/assets/flexpulse-front.webp", alt: "FlexPulse G2 controller", label: "FlexPulse G2 controller" },
  { src: "/assets/pemf-electrode.png", alt: "FlexPulse PEMF applicator", label: "FlexPulse applicator" },
  { src: flexPulseG2.images[0], alt: "FlexPulse G2 portable PEMF system", label: "FlexPulse G2 system" },
];

const highlights = [
  { icon: Activity, title: "Advanced PEMF Output", description: "Up to 200 gauss of output." },
  { icon: BatteryCharging, title: "Rechargeable Battery", description: "Up to 12 hours of use." },
  { icon: Zap, title: "Multiple Programs", description: "10 programs from 3–1,000 Hz." },
  { icon: ShieldCheck, title: "Warranty Protection", description: "2 years on the control unit." },
];

function money(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export default function V2FeaturedProductSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const reduceMotion = useShouldReduceMotion();
  const product = flexPulseG2;

  const addToCart = () => {
    addItem(product);
    setCartOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#F8F9FB] px-5 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
      <svg className="pointer-events-none absolute left-0 top-10 hidden h-48 w-80 text-primary/15 lg:block" viewBox="0 0 320 190" fill="none" aria-hidden="true">
        <path d="M-25 144C61 76 137 75 220 143c49 40 89 42 125 19" stroke="currentColor" />
        <path d="M-25 166C61 98 137 97 220 165c49 40 89 42 125 19" stroke="currentColor" />
      </svg>
      <svg className="pointer-events-none absolute bottom-4 right-0 hidden h-40 w-72 text-primary/15 lg:block" viewBox="0 0 288 160" fill="none" aria-hidden="true">
        <path d="M-10 95c77-59 146-58 218 0 43 34 75 35 105 16" stroke="currentColor" />
        <path d="M-10 118c77-59 146-58 218 0 43 34 75 35 105 16" stroke="currentColor" />
      </svg>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative mx-auto grid max-w-[1280px] gap-8 rounded-[24px] border border-white/80 bg-[linear-gradient(135deg,#F7F9FC_0%,#EEF1F6_100%)] p-5 shadow-[0_22px_55px_rgba(54,64,79,.1)] sm:p-8 lg:grid-cols-[46fr_30fr_24fr] lg:gap-9 lg:rounded-[30px] lg:p-10"
      >
        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="order-2 flex gap-2 overflow-x-auto pb-1 sm:order-1 sm:flex-col sm:overflow-visible">
              {gallery.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`View ${image.label}`}
                  aria-pressed={imageIndex === index}
                  className={`size-16 shrink-0 overflow-hidden rounded-xl border bg-white p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:size-[72px] ${imageIndex === index ? "border-2 border-primary" : "border-[#CBD2DC] hover:border-[#9FA9B7]"}`}
                >
                  <img src={image.src} alt="" className="h-full w-full object-contain" loading={index === 0 ? "eager" : "lazy"} />
                </button>
              ))}
            </div>
            <div className="relative order-1 aspect-square min-w-0 overflow-hidden rounded-[22px] border border-white/70 bg-[radial-gradient(ellipse_at_center,#F9FBFD_0%,#E5EAF2_72%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.8)] sm:order-2 sm:p-8">
              <div className="pointer-events-none absolute inset-x-[14%] bottom-[10%] h-[15%] rounded-[50%] bg-[#9ba8b8]/20 blur-xl" aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={gallery[imageIndex].src}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  src={gallery[imageIndex].src}
                  alt={gallery[imageIndex].alt}
                  width="1254"
                  height="1254"
                  fetchPriority={imageIndex === 0 ? "high" : undefined}
                  className="relative z-10 h-full w-full object-contain"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center lg:py-4">
          <span className="w-fit rounded-full bg-[#FCE9EB] px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-primary">FEATURED PRODUCT</span>
          <h2 className="mt-5 text-[clamp(2rem,3.2vw,2.85rem)] font-bold leading-none tracking-[-0.055em] text-[#17191D]">FlexPulse <span className="text-primary">G2</span></h2>
          <p className="mt-3 text-lg font-medium text-[#3E444E] sm:text-xl">Complete PEMF Therapy Kit</p>
          <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-[#5A626E]">{product.description}</p>
          <p className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[#17191D]">{money(product.price, product.currency)}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={addToCart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white shadow-[0_9px_18px_rgba(214,0,22,.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <ShoppingBag className="size-4" />
              Add to Cart
            </button>
            <Link to="/product" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B9C1CC] bg-white/40 px-5 text-sm font-semibold text-[#272C34] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#808A99] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">View Details</Link>
          </div>
        </div>

        <div className="min-w-0 border-t border-[#CDD3DC] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {highlights.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className={`flex items-center gap-3 py-4 first:pt-0 lg:py-5 ${index > 0 ? "border-t border-[#D8DDE5]" : ""}`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#FCE9EB] text-primary"><Icon className="size-5" strokeWidth={1.7} /></span>
              <span><span className="block text-sm font-semibold text-[#20242A]">{title}</span><span className="mt-0.5 block text-xs leading-relaxed text-[#68717D]">{description}</span></span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
