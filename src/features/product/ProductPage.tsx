import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Activity, BatteryCharging, Check, ChevronLeft, ChevronRight, Globe2, Package, Plus, ShieldCheck, ShoppingBag, Truck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { flexPulseCharger, flexPulseCoil, flexPulseG2 } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";

const originalPrice = 1290;
const information = [
  { id: "box", icon: Package, title: "What’s in the Box", description: "Everything included with your FlexPulse G2." },
  { id: "specs", icon: Activity, title: "Specifications", description: "Technical details and performance." },
  { id: "shipping", icon: Truck, title: "Shipping & Returns", description: "Delivery, returns, and important conditions." },
  { id: "warranty", icon: ShieldCheck, title: "Warranty", description: "Controller and accessory coverage." },
] as const;

type InformationId = typeof information[number]["id"];

export default function ProductPage() {
  const product = flexPulseG2;
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [openInformation, setOpenInformation] = useState<InformationId | null>(null);
  const [added, setAdded] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const discount = originalPrice - product.price;

  useEffect(() => {
    const target = purchaseRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const selectImage = (next: number) => setImageIndex((next + product.images.length) % product.images.length);
  const addToCart = () => {
    addItem(product, quantity);
    setCartOpen(true);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <main className="overflow-hidden bg-[#FAF8F6] pb-28 text-[#211E1D] lg:pb-0">
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-6 sm:px-8 lg:px-12 lg:pb-16">
        <nav aria-label="Breadcrumb" className="text-sm text-[#625D59]">
          <Link to="/" className="hover:text-[#D71920]">Home</Link><span className="mx-2">/</span><Link to="/shop" className="hover:text-[#D71920]">Shop</Link><span className="mx-2">/</span><span>FlexPulse G2</span>
        </nav>

        <section className="mt-6 grid gap-9 lg:mt-8 lg:grid-cols-[.92fr_1fr] lg:gap-12">
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5 }} className="min-w-0">
            <div className="relative aspect-square overflow-hidden rounded-[22px] border border-[#E8E1DB] bg-white p-7 sm:p-10">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-[#FBE5E5] px-3 py-1.5 text-xs font-semibold text-[#B9121A]">Save {money(discount)}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={product.images[imageIndex]} initial={reduceMotion ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: .25 }} src={product.images[imageIndex]} alt={`${product.name} product view ${imageIndex + 1}`} className="h-full w-full object-contain" fetchPriority={imageIndex === 0 ? "high" : undefined} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; if (start !== null && end !== undefined && Math.abs(start - end) > 45) selectImage(imageIndex + (start > end ? 1 : -1)); touchStart.current = null; }} />
              </AnimatePresence>
              {product.images.length > 1 && <><button type="button" onClick={() => selectImage(imageIndex - 1)} aria-label="Previous product image" className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[#E8E1DB] bg-white/95 text-[#211E1D] hover:border-[#D71920]"><ChevronLeft className="size-5" /></button><button type="button" onClick={() => selectImage(imageIndex + 1)} aria-label="Next product image" className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-[#E8E1DB] bg-white/95 text-[#211E1D] hover:border-[#D71920]"><ChevronRight className="size-5" /></button></>}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Product image gallery">
              {product.images.map((image, index) => <button key={image} type="button" onClick={() => setImageIndex(index)} aria-label={`View product image ${index + 1}`} aria-pressed={imageIndex === index} className={`size-[72px] shrink-0 overflow-hidden rounded-xl border bg-white p-1.5 transition sm:size-20 ${imageIndex === index ? "border-2 border-[#D71920]" : "border-[#E8E1DB] hover:border-[#C8BDB5]"}`}><img src={image} alt="" className="h-full w-full object-contain" loading="lazy" /></button>)}
            </div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: reduceMotion ? 0 : .08 }} className="lg:pt-3">
            <p className="text-xs font-bold tracking-[.14em] text-[#D71920]">PORTABLE PEMF SYSTEM</p>
            <h1 className="mt-3 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[.9] tracking-[-.065em]">FlexPulse G2</h1>
            <div className="mt-5 flex items-baseline gap-3"><strong className="text-[clamp(1.9rem,3vw,2.5rem)] tracking-[-.05em] text-[#D71920]">{money(product.price)}</strong><span className="text-base text-[#625D59] line-through">{money(originalPrice)}</span></div>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#D71920]"><Plus className="size-4" />Black Friday Deal · Includes complimentary 30-minute consultation</p>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.65] text-[#625D59]">{product.description}</p>
            <div className="mt-7 grid grid-cols-2 divide-x divide-y divide-[#E8E1DB] overflow-hidden rounded-xl border border-[#E8E1DB] sm:grid-cols-4 sm:divide-y-0">
              <Feature icon={Activity} label="10 Programs" /><Feature icon={Zap} label="Up to 200 Gauss" /><Feature icon={BatteryCharging} label="Rechargeable Battery" /><Feature icon={ShieldCheck} label="2-Year Controller Warranty" />
            </div>
            <div ref={purchaseRef} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Quantity value={quantity} onChange={setQuantity} />
              <motion.button whileTap={{ scale: .98 }} type="button" onClick={addToCart} className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-full bg-[#D71920] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2"><ShoppingBag className="size-4" />{added ? "Added to Cart" : "Add to Cart"}</motion.button>
            </div>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#625D59]"><Globe2 className="mt-0.5 size-4 shrink-0 text-[#D71920]" />Outside the US or Canada? <Link to="/contact" className="font-semibold text-[#D71920] hover:underline">Contact us</Link> to discuss purchasing options.</p>
          </motion.div>
        </section>

        <section className="mt-12 border-y border-[#E8E1DB] py-2 lg:mt-16">
          <div className="grid divide-y divide-[#E8E1DB] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {information.map(({ id, icon: Icon, title, description }) => <button key={id} type="button" onClick={() => setOpenInformation((current) => current === id ? null : id)} aria-expanded={openInformation === id} aria-controls={`${id}-panel`} className={`flex min-h-24 items-center gap-3 px-3 py-4 text-left transition-colors hover:bg-white ${openInformation === id ? "bg-white" : ""}`}><Icon className="size-5 shrink-0 text-[#D71920]" strokeWidth={1.6} /><span><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block text-xs leading-relaxed text-[#625D59]">{description}</span></span></button>)}
          </div>
          <AnimatePresence initial={false}>{openInformation && <motion.div id={`${openInformation}-panel`} role="region" aria-label={information.find((item) => item.id === openInformation)?.title} initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: .28 }} className="overflow-hidden"><InfoPanel id={openInformation} /></motion.div>}</AnimatePresence>
        </section>

        <section className="mt-12 lg:mt-16">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="font-serif text-[clamp(2rem,3vw,2.7rem)] tracking-[-.05em]">Complete Your Setup</h2><p className="mt-2 text-sm text-[#625D59]">Explore compatible FlexPulse accessories.</p></div><Link to="/shop" className="text-sm font-semibold text-[#D71920] hover:underline">Shop all accessories</Link></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2"><Accessory product={flexPulseCoil} /><Accessory product={flexPulseCharger} /></div>
        </section>
      </div>

      <AnimatePresence>{showSticky && <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: 16 }} transition={{ duration: .25 }} className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E8E1DB] bg-white/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(33,30,29,.08)] lg:hidden"><div className="mx-auto flex max-w-lg items-center gap-3"><strong className="shrink-0 text-lg text-[#D71920]">{money(product.price)}</strong><motion.button whileTap={{ scale: .98 }} type="button" onClick={addToCart} className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#D71920] text-sm font-semibold text-white"><ShoppingBag className="size-4" />Add to Cart</motion.button></div></motion.div>}</AnimatePresence>
    </main>
  );
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function Feature({ icon: Icon, label }: { icon: typeof Activity; label: string }) {
  return <div className="flex min-h-20 flex-col items-center justify-center gap-2 p-3 text-center"><Icon className="size-5 text-[#D71920]" strokeWidth={1.6} /><span className="text-xs font-semibold leading-tight">{label}</span></div>;
}

function Quantity({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  return <div className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#E8E1DB] bg-white px-2"><button type="button" disabled={value <= 1} onClick={() => onChange(value - 1)} aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full hover:bg-[#F5F1EE] disabled:cursor-not-allowed disabled:opacity-35">−</button><span className="w-9 text-center text-sm font-semibold" aria-live="polite">{value}</span><button type="button" onClick={() => onChange(Math.min(99, value + 1))} aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full hover:bg-[#F5F1EE]">+</button></div>;
}

function InfoPanel({ id }: { id: InformationId }) {
  const product = flexPulseG2;
  if (id === "box") return <div className="border-t border-[#E8E1DB] bg-white px-4 py-6 sm:px-6"><ul className="grid gap-x-8 gap-y-3 text-sm text-[#625D59] sm:grid-cols-2 lg:grid-cols-3">{product.packageContents.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#D71920]" />{item}</li>)}</ul></div>;
  if (id === "specs") return <div className="border-t border-[#E8E1DB] bg-white px-4 py-4 sm:px-6"><dl className="grid sm:grid-cols-2 sm:gap-x-10">{product.details.map((detail) => <div key={detail.label} className="flex justify-between gap-4 border-b border-[#E8E1DB] py-3 text-sm"><dt className="text-[#625D59]">{detail.label}</dt><dd className="text-right font-medium">{detail.value}</dd></div>)}</dl></div>;
  if (id === "shipping") return <div className="border-t border-[#E8E1DB] bg-white px-4 py-6 text-sm leading-relaxed text-[#625D59] sm:px-6"><p>International customers are responsible for applicable import duties and taxes. Orders ship via FedEx, UPS, or USPS within 1–2 business days, subject to the published policy. A signature is required where specified. <Link to="/shipping" className="font-semibold text-[#D71920] hover:underline">Shipping &amp; Handling</Link></p><p className="mt-4">Returns are accepted within 30 days when the product meets the published condition requirements and includes all parts, accessories, and original packaging. Return shipping may be the customer&apos;s responsibility; a 20% restocking fee applies unless the manufacturer&apos;s-error exception applies. An RMA is required. <Link to="/guarantee" className="font-semibold text-[#D71920] hover:underline">Guarantee &amp; Warranty</Link></p></div>;
  return <div className="border-t border-[#E8E1DB] bg-white px-4 py-6 text-sm leading-relaxed text-[#625D59] sm:px-6">The FlexPulse G2 controller is covered by a two-year warranty. The charging disc and accessories are covered for six months. <Link to="/guarantee" className="font-semibold text-[#D71920] hover:underline">Read the warranty terms</Link>.</div>;
}

function Accessory({ product }: { product: typeof flexPulseCoil }) {
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  return <article className="group flex gap-4 rounded-[18px] border border-[#E8E1DB] bg-white p-4 transition-colors hover:border-[#C8BDB5]"><Link to={`/product/${product.slug}`} className="grid size-24 shrink-0 place-items-center rounded-xl bg-[#F5F1EE] p-2"><img src={product.images[0]} alt="" className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]" loading="lazy" /></Link><div className="flex min-w-0 flex-1 flex-col"><Link to={`/product/${product.slug}`} className="text-[16px] font-semibold hover:text-[#D71920]">{product.name}</Link><p className="mt-1 text-sm leading-relaxed text-[#625D59]">{product.description}</p><div className="mt-auto flex items-center justify-between gap-3 pt-3"><strong>{money(product.price)}</strong><button type="button" onClick={() => { addItem(product); setCartOpen(true); }} className="min-h-10 rounded-full border border-[#D71920] px-4 text-xs font-semibold text-[#D71920] transition-colors hover:bg-[#D71920] hover:text-white">Add to Cart</button></div></div></article>;
}
