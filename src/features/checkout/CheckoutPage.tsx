import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, ChevronDown, ChevronUp, Info, Minus, Package, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";

type CheckoutDetails = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const countries = ["United States", "Canada", "United Kingdom", "Australia", "Other"];

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const count = useCartStore((state) => state.count());
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submittedItems, setSubmittedItems] = useState(items);
  const reduceMotion = useReducedMotion();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutDetails>({
    defaultValues: { country: "United States" },
  });

  if (complete) {
    return <Confirmation items={submittedItems} reduceMotion={reduceMotion} />;
  }

  if (!items.length) {
    return (
      <CheckoutShell>
        <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
          <ShoppingBag className="size-10 text-[#D71920]" strokeWidth={1.5} />
          <h1 className="mt-6 font-serif text-4xl tracking-[-0.05em] text-[#211E1D]">Your cart is empty</h1>
          <p className="mt-3 max-w-sm text-[#625D59]">Add a FlexPulse product to your cart to get started.</p>
          <Link to="/shop" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#D71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Continue Shopping</Link>
        </main>
      </CheckoutShell>
    );
  }

  const submit = async () => {
    setSubmittedItems(items);
    clear();
    setComplete(true);
  };

  return (
    <CheckoutShell>
      <main className="bg-[#FAF8F6] px-5 py-9 text-[#211E1D] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
        <div className="mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="text-sm text-[#625D59]"><Link to="/shop" className="hover:text-[#D71920]">Shop</Link><span className="mx-2">/</span><span>Checkout</span></nav>
          <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-serif text-[clamp(2.6rem,4vw,3.25rem)] leading-none tracking-[-0.06em]">Checkout</h1>
              <p className="mt-3 text-[15px] text-[#625D59]">Review your order and enter your details to complete the demo checkout.</p>
            </div>
            <Progress complete={complete} />
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#E8E1DB] bg-[#F5F1EE] px-4 py-3 text-sm text-[#625D59]"><Info className="mt-0.5 size-4 shrink-0 text-[#D71920]" /><p><strong className="font-semibold text-[#211E1D]">Demo checkout</strong> — No real payment will be processed.</p></div>

          <form onSubmit={handleSubmit(submit)} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.38fr)_minmax(350px,1fr)] lg:gap-8">
            <div className="space-y-6">
              <MobileSummary open={summaryOpen} setOpen={setSummaryOpen} items={items} subtotal={subtotal} count={count} />
              <section className="rounded-[18px] border border-[#E8E1DB] bg-white p-5 sm:p-7">
                <h2 className="font-serif text-[1.65rem] tracking-[-0.04em]">Contact Information</h2>
                <p className="mt-1 text-sm text-[#625D59]">We&apos;ll use this information for your demo order details.</p>
                <Field label="Email address" error={errors.email?.message}>
                  <input type="email" autoComplete="email" aria-invalid={!!errors.email} className={inputClass} {...register("email", { required: "Enter your email address.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." } })} />
                </Field>
              </section>

              <section className="rounded-[18px] border border-[#E8E1DB] bg-white p-5 sm:p-7">
                <h2 className="font-serif text-[1.65rem] tracking-[-0.04em]">Shipping Address</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="First name" error={errors.firstName?.message}><input autoComplete="given-name" aria-invalid={!!errors.firstName} className={inputClass} {...register("firstName", { required: "Enter your first name." })} /></Field>
                  <Field label="Last name" error={errors.lastName?.message}><input autoComplete="family-name" aria-invalid={!!errors.lastName} className={inputClass} {...register("lastName", { required: "Enter your last name." })} /></Field>
                  <div className="sm:col-span-2"><Field label="Address line 1" error={errors.address?.message}><input autoComplete="street-address" aria-invalid={!!errors.address} className={inputClass} {...register("address", { required: "Enter your address." })} /></Field></div>
                  <div className="sm:col-span-2"><Field label="Apartment, suite, or unit (optional)"><input autoComplete="address-line2" className={inputClass} {...register("apartment")} /></Field></div>
                  <Field label="City" error={errors.city?.message}><input autoComplete="address-level2" aria-invalid={!!errors.city} className={inputClass} {...register("city", { required: "Enter your city." })} /></Field>
                  <Field label="State / Province / Region" error={errors.region?.message}><input autoComplete="address-level1" aria-invalid={!!errors.region} className={inputClass} {...register("region", { required: "Enter your region." })} /></Field>
                  <Field label="Postal code" error={errors.postalCode?.message}><input autoComplete="postal-code" aria-invalid={!!errors.postalCode} className={inputClass} {...register("postalCode", { required: "Enter your postal code." })} /></Field>
                  <Field label="Country" error={errors.country?.message}><select autoComplete="country-name" aria-invalid={!!errors.country} className={inputClass} {...register("country", { required: "Choose your country." })}>{countries.map((country) => <option key={country}>{country}</option>)}</select></Field>
                </div>
              </section>

              <section className="rounded-[18px] border border-[#E8E1DB] bg-[#F5F1EE] p-5 sm:p-7">
                <div className="flex gap-3"><Info className="mt-0.5 size-5 shrink-0 text-[#D71920]" /><div><h2 className="font-serif text-[1.45rem] tracking-[-0.04em]">Demo Checkout</h2><p className="mt-2 text-sm leading-relaxed text-[#625D59]">This is a frontend demonstration. No payment gateway is connected, and no real payment will be charged.</p></div></div>
              </section>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-6"><OrderSummary items={items} count={count} subtotal={subtotal} setQuantity={setQuantity} removeItem={removeItem} submitting={isSubmitting} /></div>
            </aside>
            <div className="lg:hidden"><OrderButton submitting={isSubmitting} /></div>
          </form>
        </div>
      </main>
    </CheckoutShell>
  );
}

const inputClass = "mt-2 h-12 w-full rounded-xl border border-[#E8E1DB] bg-white px-3 text-[15px] text-[#211E1D] outline-none transition focus:border-[#D71920] focus:ring-2 focus:ring-[#D71920]/15 aria-[invalid=true]:border-[#D71920]";

function CheckoutShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#FAF8F6]"><header className="sticky top-0 z-30 border-b border-[#E8E1DB] bg-white/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12"><Link to="/" aria-label="FlexPulse home"><img src="/assets/flexpulse-logo.webp" alt="FlexPulse" className="h-10 w-auto object-contain" /></Link><p className="hidden text-sm font-semibold text-[#625D59] sm:block">Checkout</p><div className="flex items-center gap-4 text-sm"><Link to="/shop" className="font-medium text-[#625D59] hover:text-[#D71920]">Back to Shop</Link><span className="hidden items-center gap-1.5 text-[#625D59] sm:flex"><ShieldCheck className="size-4 text-[#D71920]" />Demo Checkout</span></div></div></header>{children}<footer className="border-t border-white/10 bg-[#211E1D] px-5 py-7 text-sm text-white/70 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} FlexPulse</span><nav className="flex flex-wrap gap-x-5 gap-y-2"><Link to="/contact">Contact Support</Link><Link to="/shipping">Shipping &amp; Handling</Link><Link to="/guarantee">Guarantee &amp; Warranty</Link><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms</Link></nav></div></footer></div>;
}

function Progress({ complete }: { complete: boolean }) {
  const stages = ["Information", "Review", "Confirmation"];
  const active = complete ? 3 : 1;
  return <div className="w-full max-w-[380px]"><p className="text-sm font-semibold text-[#625D59] sm:hidden">Step {active} of 3 — {stages[active - 1]}</p><div className="hidden items-center sm:flex">{stages.map((stage, index) => <div key={stage} className="flex flex-1 items-center last:flex-none"><motion.span animate={{ backgroundColor: index < active ? "#D71920" : "#FFFFFF", color: index < active ? "#FFFFFF" : "#625D59", borderColor: index < active ? "#D71920" : "#E8E1DB" }} transition={{ duration: .25 }} className="grid size-7 place-items-center rounded-full border text-xs font-semibold">{index < active - 1 ? <Check className="size-4" /> : index + 1}</motion.span><span className="ml-2 whitespace-nowrap text-xs font-medium text-[#625D59]">{stage}</span>{index < stages.length - 1 && <span className="mx-3 h-px flex-1 bg-[#E8E1DB]" />}</div>)}</div></div>;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-[#211E1D]">{label} <span className={label.includes("optional") ? "hidden" : "text-[#D71920]"} aria-hidden="true">*</span>{children}{error && <span role="alert" className="mt-1.5 block text-xs text-[#D71920]">{error}</span>}</label>;
}

function MobileSummary({ open, setOpen, items, subtotal, count }: { open: boolean; setOpen: (open: boolean) => void; items: ReturnType<typeof useCartStore.getState>["items"]; subtotal: number; count: number }) {
  return <section className="overflow-hidden rounded-[18px] border border-[#E8E1DB] bg-white lg:hidden"><button type="button" onClick={() => setOpen(!open)} className="flex min-h-14 w-full items-center justify-between px-5 text-left text-sm font-semibold"><span>Order Summary ({count} {count === 1 ? "item" : "items"})</span><span className="flex items-center gap-3">{money.format(subtotal)} {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}</span></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .22 }} className="overflow-hidden"><div className="border-t border-[#E8E1DB] px-5 pb-5 pt-3">{items.map((item) => <div key={item.product.id} className="flex justify-between py-2 text-sm"><span>{item.product.name} × {item.quantity}</span><strong>{money.format(item.product.price * item.quantity)}</strong></div>)}<div className="mt-2 flex justify-between border-t border-[#E8E1DB] pt-3 text-sm"><span>Subtotal</span><strong>{money.format(subtotal)}</strong></div></div></motion.div>}</AnimatePresence></section>;
}

function OrderSummary({ items, count, subtotal, setQuantity, removeItem, submitting }: { items: ReturnType<typeof useCartStore.getState>["items"]; count: number; subtotal: number; setQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; submitting: boolean }) {
  return <section className="rounded-[20px] border border-[#E8E1DB] bg-white p-6 shadow-[0_12px_32px_rgba(33,30,29,.05)]"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#FCE9E9] text-[#D71920]"><ShoppingBag className="size-5" /></span><div><h2 className="font-serif text-[1.7rem] tracking-[-0.04em]">Order Summary</h2><p className="text-xs text-[#625D59]">{count} {count === 1 ? "item" : "items"}</p></div></div><div className="mt-5 divide-y divide-[#E8E1DB] border-y border-[#E8E1DB]">{items.map((item) => <article key={item.product.id} className="flex gap-3 py-5"><div className="grid size-20 shrink-0 place-items-center rounded-xl bg-[#F5F1EE] p-2"><img src={item.product.images[0]} alt="" className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="text-sm font-semibold">{item.product.name}</h3><button type="button" onClick={() => removeItem(item.product.id)} className="text-[#625D59] hover:text-[#D71920]" aria-label={`Remove ${item.product.name}`}><Trash2 className="size-4" /></button></div><p className="mt-1 text-xs text-[#625D59]">{money.format(item.product.price)} each</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-[#E8E1DB]"><button type="button" onClick={() => setQuantity(item.product.id, item.quantity - 1)} className="grid size-8 place-items-center" aria-label={`Decrease ${item.product.name} quantity`}><Minus className="size-3" /></button><span className="w-7 text-center text-sm font-semibold" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span><button type="button" onClick={() => setQuantity(item.product.id, item.quantity + 1)} className="grid size-8 place-items-center" aria-label={`Increase ${item.product.name} quantity`}><Plus className="size-3" /></button></div><strong className="text-sm">{money.format(item.product.price * item.quantity)}</strong></div></div></article>)}</div><div className="space-y-3 py-5 text-sm"><div className="flex justify-between"><span className="text-[#625D59]">Subtotal</span><span>{money.format(subtotal)}</span></div><div className="flex justify-between"><span className="text-[#625D59]">Shipping</span><span className="text-[#625D59]">Not calculated in demo</span></div><div className="flex justify-between"><span className="text-[#625D59]">Tax</span><span className="text-[#625D59]">Not calculated in demo</span></div></div><div className="flex justify-between border-t border-[#E8E1DB] pt-5"><span className="font-serif text-xl">Total</span><strong className="text-2xl tracking-[-0.04em]">{money.format(subtotal)}</strong></div><div className="mt-6"><OrderButton submitting={submitting} /></div><div className="mt-7 grid grid-cols-3 divide-x divide-[#E8E1DB] text-center text-[11px] leading-relaxed text-[#625D59]"><Link to="/shipping" className="px-2"><Truck className="mx-auto mb-2 size-4 text-[#D71920]" />Shipping info</Link><Link to="/guarantee" className="px-2"><Package className="mx-auto mb-2 size-4 text-[#D71920]" />30-day returns</Link><Link to="/guarantee" className="px-2"><ShieldCheck className="mx-auto mb-2 size-4 text-[#D71920]" />2-year warranty</Link></div></section>;
}

function OrderButton({ submitting }: { submitting: boolean }) {
  return <motion.button whileTap={{ scale: .98 }} type="submit" disabled={submitting} className="flex min-h-14 w-full items-center justify-center rounded-full bg-[#D71920] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B9121A] disabled:cursor-wait disabled:opacity-70">{submitting ? "Completing demo order…" : "Place Demo Order"}</motion.button>;
}

function Confirmation({ items, reduceMotion }: { items: ReturnType<typeof useCartStore.getState>["items"]; reduceMotion: boolean | null }) {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  return <CheckoutShell><main className="mx-auto flex min-h-[65vh] max-w-2xl items-center px-5 py-16 sm:px-8"><motion.section initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }} className="w-full rounded-[20px] border border-[#E8E1DB] bg-white p-7 text-center shadow-[0_12px_32px_rgba(33,30,29,.05)] sm:p-10"><motion.span initial={reduceMotion ? false : { scale: .75 }} animate={{ scale: 1 }} transition={{ delay: .12, duration: .25 }} className="mx-auto grid size-14 place-items-center rounded-full bg-[#FCE9E9] text-[#D71920]"><Check className="size-7" /></motion.span><h1 className="mt-6 font-serif text-4xl tracking-[-0.05em]">Demo Order Complete</h1><p className="mx-auto mt-3 max-w-md text-[#625D59]">Your demo checkout has been completed. No payment was processed.</p><div className="mt-8 divide-y divide-[#E8E1DB] border-y border-[#E8E1DB] text-left">{items.map((item) => <div key={item.product.id} className="flex justify-between py-4 text-sm"><span>{item.product.name} × {item.quantity}</span><strong>{money.format(item.product.price * item.quantity)}</strong></div>)}<div className="flex justify-between py-4"><span className="font-serif text-lg">Demo total</span><strong>{money.format(subtotal)}</strong></div></div><Link to="/shop" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#D71920] px-6 text-sm font-semibold text-white hover:bg-[#B9121A]">Return to Shop</Link></motion.section></main></CheckoutShell>;
}
