import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Heart, PackageCheck, ShieldCheck, ShoppingBag, SlidersHorizontal, Truck } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { flexPulseCharger, flexPulseCoil, flexPulseG2 } from "@/data/products";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";

type Category = "all" | "devices" | "coils" | "accessories";
type Sort = "featured" | "price-low" | "price-high" | "name";

const catalog = [
  { product: flexPulseG2, category: "devices" as const, label: "PEMF device", sale: "Save $291" },
  { product: flexPulseCoil, category: "coils" as const, label: "Accessory", sale: "" },
  { product: flexPulseCharger, category: "accessories" as const, label: "Accessory", sale: "" },
];
const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "devices", label: "Devices" },
  { value: "coils", label: "Coils" },
  { value: "accessories", label: "Accessories" },
];
const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function productPath(product: Product) {
  return product.id === flexPulseG2.id ? "/product" : `/product/${product.slug}`;
}

function Price({ product }: { product: Product }) {
  return <p className="text-2xl font-semibold tracking-tight text-[#D71920]">${product.price.toFixed(0)}</p>;
}

function AddToCartButton({ product, className = "" }: { product: Product; className?: string }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const handleAdd = () => {
    addItem(product, 1);
    setCartOpen(true);
    toast.success(`${product.name} added to your cart.`);
  };
  return <button type="button" onClick={handleAdd} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D71920] px-5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#B9121A] active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 ${className}`}><ShoppingBag className="size-4" /> Add to cart</button>;
}

function FeaturedCard({ item }: { item: (typeof catalog)[number] }) {
  const { product, label, sale } = item;
  return (
    <motion.article layout variants={reveal} className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#E8E1DB] bg-white shadow-[0_8px_24px_rgba(45,28,28,0.035)] transition-colors duration-300 hover:border-[#d4c5bc]">
      <Link to={productPath(product)} className="relative block overflow-hidden bg-[#F8F5F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D71920]" aria-label={`View ${product.name}`}>
        <span className="absolute left-5 top-5 z-10 rounded-full bg-[#D71920] px-3 py-1.5 text-xs font-semibold text-white">{sale}</span>
        <img src={product.images[0]} alt={product.name} className="aspect-[1.15/1] w-full object-contain p-5 transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.025] sm:p-7" />
      </Link>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-bold tracking-[.11em] text-[#D71920]">{label.toUpperCase()}</p>
        <Link to={productPath(product)} className="mt-3 w-fit text-[clamp(1.7rem,3vw,2.25rem)] font-semibold leading-none tracking-[-.045em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">{product.name}</Link>
        <p className="mt-4 max-w-[490px] text-[15px] leading-relaxed text-[#625D59]">{product.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4"><Price product={product} /><span className="text-lg text-[#8A827D] line-through">$1,290</span><AddToCartButton product={product} className="ml-auto" /><span className="grid size-11 place-items-center rounded-full border border-[#d9d0ca] text-[#403835]" aria-hidden="true"><Heart className="size-5" /></span></div>
      </div>
    </motion.article>
  );
}

function AccessoryCard({ item }: { item: (typeof catalog)[number] }) {
  const { product, label, sale } = item;
  return (
    <motion.article layout variants={reveal} className="group grid overflow-hidden rounded-[1.25rem] border border-[#E8E1DB] bg-white shadow-[0_8px_24px_rgba(45,28,28,0.035)] transition-colors duration-300 hover:border-[#d4c5bc] sm:grid-cols-[.8fr_1.2fr]">
      <Link to={productPath(product)} className="relative block min-h-48 overflow-hidden bg-[#F8F5F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D71920]" aria-label={`View ${product.name}`}>
        {sale && <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#D71920]">{sale}</span>}
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain p-5 transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]" loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold tracking-[.11em] text-[#D71920]">{label.toUpperCase()}</p>
        <Link to={productPath(product)} className="mt-2 w-fit text-xl font-semibold leading-tight tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">{product.name}</Link>
        <p className="mt-2 text-sm leading-relaxed text-[#625D59]">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5"><Price product={product} /><AddToCartButton product={product} className="ml-auto px-4" /><span className="grid size-10 place-items-center rounded-full border border-[#d9d0ca] text-[#403835]" aria-hidden="true"><Heart className="size-4" /></span></div>
      </div>
    </motion.article>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const reduceMotion = useReducedMotion();
  const products = useMemo(() => {
    const filtered = catalog.filter((item) => category === "all" || item.category === category);
    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.product.price - b.product.price;
      if (sort === "price-high") return b.product.price - a.product.price;
      if (sort === "name") return a.product.name.localeCompare(b.product.name);
      return catalog.indexOf(a) - catalog.indexOf(b);
    });
  }, [category, sort]);
  const useFeaturedLayout = category === "all" && sort === "featured";
  const featured = useFeaturedLayout ? products.find((item) => item.product.id === flexPulseG2.id) : undefined;
  const accessories = featured ? products.filter((item) => item.product.id !== flexPulseG2.id) : products;

  return (
    <main className="overflow-hidden bg-[#FAF8F6] text-[#211E1D]">
      <section aria-labelledby="catalog-heading">
        <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16 xl:px-0">
          <motion.div initial={reduceMotion ? false : "hidden"} animate="visible" variants={stagger}>
            <motion.nav variants={reveal} aria-label="Breadcrumb" className="text-sm text-[#625D59]"><Link to="/" className="hover:text-[#D71920]">Home</Link><span className="px-2">›</span><span>Shop</span></motion.nav>
            <motion.h1 id="shop-heading" variants={reveal} className="mt-6 font-serif text-[clamp(2.75rem,5vw,4.25rem)] leading-[.95] tracking-[-.055em]">Shop FlexPulse</motion.h1>
            <motion.p variants={reveal} className="mt-4 max-w-[660px] text-[16px] leading-[1.65] text-[#625D59]">PEMF devices and accessories for everyday recovery, relaxation, and performance.</motion.p>
          </motion.div>
          <div className="mt-10 flex flex-col justify-between gap-5 border-b border-[#E8E1DB] pb-6 sm:flex-row sm:items-center">
            <div className="min-w-0 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><div className="flex w-max gap-2" role="group" aria-label="Filter products">{categories.map((item) => <button key={item.value} type="button" onClick={() => setCategory(item.value)} className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 ${category === item.value ? "border-[#D71920] bg-[#D71920] text-white" : "border-[#d9d0ca] bg-white text-[#403835] hover:border-[#D71920]"}`}>{item.label}</button>)}</div></div>
            <label className="flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#d9d0ca] bg-white px-4 text-sm font-medium text-[#403835]"><SlidersHorizontal className="size-4 text-[#D71920]" /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="bg-transparent pr-1 outline-none"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option></select><ChevronDown className="pointer-events-none -ml-5 size-4" /></label>
          </div>
          <h2 id="catalog-heading" className="sr-only">Product catalog</h2>
          <AnimatePresence mode="wait">
            <motion.div key={`${category}-${sort}`} initial={reduceMotion ? false : "hidden"} animate="visible" exit={reduceMotion ? undefined : "hidden"} variants={stagger} className="mt-8 grid gap-5 lg:grid-cols-2 lg:items-stretch">
              {featured && <FeaturedCard item={featured} />}
              <div className={`grid gap-5 ${featured ? "" : "lg:col-span-2 lg:grid-cols-2"}`}>{accessories.map((item) => <AccessoryCard key={item.product.id} item={item} />)}</div>
              {!products.length && <div className="rounded-2xl border border-dashed border-[#d9d0ca] bg-white px-6 py-14 text-center text-[#625D59] lg:col-span-2">No products are available in this category.</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="border-y border-[#E8E1DB] bg-white" aria-label="Shopping support">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 xl:px-0">
          {[[Truck, "Shipping", "Ships within 1–2 business days."], [PackageCheck, "Returns", "Returns accepted within 30 days."], [ShieldCheck, "Warranty", "2 years on the controller."], [ArrowRight, "Support", "Help when you need it."]].map(([Icon, title, text], index) => { const BenefitIcon = Icon as typeof Truck; return <Link key={title as string} to={["/shipping", "/guarantee", "/guarantee", "/contact"][index]} className="group flex gap-3 border-[#E8E1DB] text-left lg:border-r lg:pr-6 last:lg:border-0"><BenefitIcon className="mt-0.5 size-5 shrink-0 text-[#D71920]" strokeWidth={1.7} /><span><span className="block font-semibold">{title as string}</span><span className="mt-1 block text-sm leading-relaxed text-[#625D59]">{text as string}</span></span></Link>; })}
        </div>
      </section>
    </main>
  );
}
