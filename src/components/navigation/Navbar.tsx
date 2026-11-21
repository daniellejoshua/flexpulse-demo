import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, BookOpen, ChevronDown, Layers3, Menu, Search, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Drawer } from "@/components/ui/Drawer";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils/cn";
import { GlobalSearchDialog } from "@/features/search/GlobalSearchDialog";

interface NavigationItem {
  label: string;
  href: string;
  hasMenu?: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews" },
  { label: "PEMF Therapy", href: "/pemf-therapy", hasMenu: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const pemfLinks = [
  { icon: Activity, title: "What Is PEMF?", description: "The basics of pulsed electromagnetic fields.", href: "/pemf-therapy" },
  { icon: Layers3, title: "Benefits & Applications", description: "Common ways PEMF is studied and used for wellness.", href: "/how-it-works" },
  { icon: BookOpen, title: "Research & Science", description: "Explore the research behind PEMF.", href: "/science" },
];

function CartButton() {
  const count = useCartStore((s) => s.count());
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  return (
    <button
      type="button"
      className="relative grid size-11 place-items-center rounded-full text-[#171515] transition-colors hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={() => setCartOpen(true)}
      aria-label={`Open cart${count ? `, ${count} items` : ""}`}
    >
      <ShoppingBag className="size-5" strokeWidth={1.8} />
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pemfOpen, setPemfOpen] = useState(false);
  const [mobilePemfOpen, setMobilePemfOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((current) => current === nextScrolled ? current : nextScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const closeOnOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPemfOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPemfOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.header
      ref={headerRef}
      animate={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.96)" : "#FAF8F6",
        boxShadow: scrolled ? "0 4px 16px rgba(0, 0, 0, 0.04)" : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[#EDE7E4] backdrop-blur-md",
        scrolled ? "lg:border-b" : "lg:border-b-0",
      )}
    >
      <motion.div
        animate={{ height: desktop ? (scrolled ? 72 : 92) : 64 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-16"
      >
        <Link to="/" className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <img src="/assets/flexpulse-logo.webp" alt="FlexPulse" className="w-[8.25rem] sm:w-40 lg:hidden" />
          <motion.img
            src="/assets/flexpulse-logo.webp"
            alt="FlexPulse"
            animate={{ width: scrolled ? 180 : 220 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden h-auto lg:block"
          />
        </Link>

        <nav className="relative hidden justify-self-center lg:flex" aria-label="Primary navigation">
          <motion.div
            animate={{ height: scrolled ? 50 : 56, paddingInline: scrolled ? 8 : 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-0.5 rounded-full border border-[#EDE7E4] bg-white shadow-[0_4px_18px_rgba(30,24,22,0.04)]"
          >
            {navigationItems.map((item) => (
              item.hasMenu ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPemfOpen((value) => !value)}
                  className={cn("relative inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium text-[#171515] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", (pemfOpen || isActive(item.href)) && "text-primary", scrolled && "px-3 text-[14px]")}
                  aria-expanded={pemfOpen}
                  aria-haspopup="menu"
                >
                  {isActive(item.href) && <motion.span layoutId="active-nav-pill" className="absolute inset-0 rounded-full bg-[#FBE5E7]" transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }} />}
                  <span className={cn("relative z-10", isActive(item.href) && "font-semibold text-[#B9000B]")}>{item.label}</span>
                  <ChevronDown className={cn("relative z-10 size-3.5 transition-transform", pemfOpen && "rotate-180")} />
                </button>
              ) : (
                <Link key={item.label} to={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={cn("relative inline-flex h-11 items-center rounded-full px-3.5 text-[15px] font-medium text-[#171515] transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", scrolled && "px-3 text-[14px]")}>
                  {isActive(item.href) && <motion.span layoutId="active-nav-pill" className="absolute inset-0 rounded-full bg-[#FBE5E7]" transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }} />}
                  <span className={cn("relative z-10", isActive(item.href) && "font-semibold text-[#B9000B]")}>{item.label}</span>
                </Link>
              )
            ))}
          </motion.div>

          <AnimatePresence>
            {pemfOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute left-1/2 top-[calc(100%+12px)] grid w-[720px] -translate-x-1/2 grid-cols-[1.1fr_.9fr] gap-5 rounded-[22px] border border-[#EEE7E4] bg-[#FFFCFA] p-6 shadow-[0_18px_42px_rgba(45,28,28,0.14)]"
                role="menu"
              >
                <div className="space-y-1">
                  {pemfLinks.map(({ icon: Icon, title, description, href }) => (
                    <Link key={title} to={href} onClick={() => setPemfOpen(false)} className="flex gap-3 rounded-2xl p-3 transition-colors hover:bg-[#FFF1F1]" role="menuitem">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FCE9E9] text-primary"><Icon className="size-5" strokeWidth={1.8} /></span>
                      <span>
                        <span className="block text-sm font-semibold text-[#171515]">{title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-[#6B6461]">{description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-[#FCE9E9] p-5">
                  <svg className="absolute -right-8 top-3 h-24 w-32 text-primary/15" viewBox="0 0 128 96" fill="none" aria-hidden="true"><path d="M4 67C35 27 72 28 104 67C116 81 122 81 132 71" stroke="currentColor" strokeWidth="2" /><path d="M-2 85C30 45 67 46 99 85C111 99 117 99 127 89" stroke="currentColor" strokeWidth="2" /></svg>
                  <img src="/assets/flexpulse-front.webp" alt="FlexPulse G2 controller" className="relative h-24 w-full object-contain object-center" loading="lazy" />
                  <h2 className="relative mt-3 text-lg font-bold tracking-[-0.03em] text-[#171515]">A Practical Guide to PEMF</h2>
                  <p className="relative mt-1 text-sm leading-relaxed text-[#6B6461]">Learn how PEMF works and explore the FlexPulse G2.</p>
                  <Link to="/pemf-therapy" onClick={() => setPemfOpen(false)} className="relative mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Read the Guide</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

         <div className="flex items-center justify-end gap-2 sm:gap-3">
           <button type="button" onClick={() => setSearchOpen(true)} className="hidden size-11 place-items-center rounded-full text-[#171515] transition-colors hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:grid" aria-label="Search FlexPulse"><Search className="size-5" strokeWidth={1.8} /></button>
           <button type="button" onClick={() => setSearchOpen(true)} className="grid size-11 place-items-center rounded-full text-[#171515] transition-colors hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden" aria-label="Search FlexPulse"><Search className="size-5" strokeWidth={1.8} /></button>
           <CartButton />
          <Link to="/shop" className="hidden h-12 shrink-0 items-center whitespace-nowrap rounded-full bg-primary px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:inline-flex">Shop Now</Link>
          <button type="button" className="grid size-11 place-items-center rounded-full text-[#171515] hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
        </div>
      </motion.div>

      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} side="right" className="w-[90vw] max-w-[380px] bg-[#FFFCFA]">
        <div className="flex h-full flex-col px-5 pb-6 pt-6">
            <div className="flex items-center justify-between gap-3 pr-12">
             <img src="/assets/flexpulse-logo.webp" alt="FlexPulse" className="w-36" />
             <button type="button" onClick={() => { setMobileOpen(false); setSearchOpen(true); }} className="grid size-11 place-items-center rounded-full text-[#171515] hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Search FlexPulse"><Search className="size-5" /></button>
          </div>
          <nav className="mt-8 space-y-1" aria-label="Mobile navigation">
            {navigationItems.map((item) => item.hasMenu ? (
              <div key={item.label}>
                <button type="button" onClick={() => setMobilePemfOpen((value) => !value)} className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 text-left text-lg font-semibold text-[#171515] hover:bg-[#FFF1F1]" aria-expanded={mobilePemfOpen}>
                  PEMF Therapy <ChevronDown className={cn("size-4 transition-transform", mobilePemfOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobilePemfOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-3">
                    {pemfLinks.map((link) => <Link key={link.title} to={link.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-3 text-sm font-medium text-[#6B6461] hover:bg-[#FFF1F1]">{link.title}</Link>)}
                  </motion.div>}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} aria-current={isActive(item.href) ? "page" : undefined} className={cn("flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-[#171515] hover:bg-[#FFF1F1]", isActive(item.href) && "bg-[#FBE5E7] text-[#B91C22]")}>{item.label}</Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-[#EEE7E4] pt-5">
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="mt-4 flex h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-white hover:bg-primary-dark">Shop Now</Link>
          </div>
        </div>
      </Drawer>
      <GlobalSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.header>
  );
}
