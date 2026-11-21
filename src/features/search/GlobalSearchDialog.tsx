import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Dialog as RadixDialog } from "radix-ui";
import { search } from "./searchService";
import { SearchResultRow } from "./SearchParts";

const suggestions = ["FlexPulse G2", "PEMF Therapy", "FlexPulse Coil", "Shipping", "Warranty"];
const quickLinks = [["Shop", "/shop"], ["PEMF Therapy", "/pemf-therapy"], ["Blog", "/blog"], ["FAQ", "/faq"], ["Contact", "/contact"]];

function useMobileSheet() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(max-width: 639px)");
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 639px)").matches,
    () => false,
  );
}

export function GlobalSearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const mobileSheet = useMobileSheet();
  const response = useMemo(() => search({ query: debouncedQuery, limit: 7 }), [debouncedQuery]);
  const showViewAll = Boolean(query.trim() && response.results.length);
  const surfaceInitial = mobileSheet ? { opacity: 0, y: 32, filter: "blur(4px)" } : { opacity: 0, y: 12, scale: .985, filter: "blur(5px)" };
  const surfaceExit = mobileSheet ? { opacity: 0, y: 32, filter: "blur(3px)" } : { opacity: 0, y: 8, scale: .985, filter: "blur(3px)" };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 240);
    return () => window.clearTimeout(timeout);
  }, [query]);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const editable = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || (event.target as HTMLElement | null)?.isContentEditable;
      if ((event.key === "/" && !editable) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [onOpenChange]);

  const viewAll = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    onOpenChange(false);
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal forceMount>
        <AnimatePresence>
          {open && <motion.div initial={reduceMotion ? false : { opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(4px)" }} exit={reduceMotion ? undefined : { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: .16, ease: [0.4, 0, 1, 1] } }} transition={{ duration: reduceMotion ? 0 : .2, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-50 bg-[rgba(20,17,16,.45)]"><RadixDialog.Overlay forceMount className="size-full" /></motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {open && <motion.div initial={reduceMotion ? false : surfaceInitial} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} exit={reduceMotion ? undefined : { ...surfaceExit, transition: { duration: .16, ease: [0.4, 0, 1, 1] } }} transition={{ duration: reduceMotion ? 0 : .24, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 z-50 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:max-w-[700px] sm:-translate-x-1/2 sm:-translate-y-1/2"><RadixDialog.Content forceMount className="flex max-h-[min(85vh,720px)] w-full flex-col overflow-hidden rounded-t-[22px] border border-[#E8E1DB] bg-[#FFFCFA] p-0 shadow-[0_-16px_48px_rgba(20,17,16,.18)] focus:outline-none sm:max-h-[min(80vh,720px)] sm:rounded-[22px] sm:shadow-[0_24px_65px_rgba(20,17,16,.24)]">
          <RadixDialog.Title className="sr-only">Search FlexPulse</RadixDialog.Title>
          <RadixDialog.Description className="sr-only">Search FlexPulse products, articles, pages, frequently asked questions, and guides.</RadixDialog.Description>
          <div className="sticky top-0 z-10 flex min-h-16 items-center gap-3 border-b border-[#E8E1DB] bg-[#FFFCFA] px-4 sm:px-5">
            <Search className="size-5 shrink-0 text-[#D71920]" />
            <input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setSelected(0); }} onKeyDown={(event) => {
              if (event.key === "ArrowDown" && response.results.length) { event.preventDefault(); setSelected((current) => Math.min(current + 1, response.results.length - 1)); }
              if (event.key === "ArrowUp" && response.results.length) { event.preventDefault(); setSelected((current) => Math.max(current - 1, 0)); }
              if (event.key === "Enter") { event.preventDefault(); if (response.results[selected]) { navigate(response.results[selected].url); onOpenChange(false); } else viewAll(); }
            }} placeholder="Search products, articles, pages..." className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#8A827D] sm:text-lg" aria-controls="global-search-results" aria-activedescendant={response.results[selected] ? `result-${response.results[selected].id}` : undefined} />
            {query && <button type="button" onClick={() => setQuery("")} className="grid size-10 place-items-center rounded-full text-[#625D59] hover:bg-[#F0EBE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]" aria-label="Clear search"><X className="size-4" /></button>}
            <kbd className="hidden rounded border border-[#E8E1DB] px-1.5 py-0.5 text-[10px] text-[#625D59] sm:block">ESC</kbd>
          </div>
          <div id="global-search-results" className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4" role="listbox" aria-label="Search results">
            {!query.trim() ? <div className="space-y-6 p-2 sm:p-3">
              <section><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#625D59]">Popular searches</p><div className="mt-3 flex flex-wrap gap-2">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setQuery(suggestion)} className="min-h-10 rounded-full border border-[#E8E1DB] bg-white px-4 text-sm font-medium hover:border-[#D71920] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]">{suggestion}</button>)}</div></section>
              <section><p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#625D59]">Quick links</p><div className="mt-2 grid sm:grid-cols-2">{quickLinks.map(([label, url]) => <button key={url} type="button" onClick={() => { navigate(url); onOpenChange(false); }} className="min-h-11 rounded-lg px-3 text-left text-sm font-semibold hover:bg-[#F8F5F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]">{label}</button>)}</div></section>
            </div> : response.results.length ? <><p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[.12em] text-[#625D59]">{response.total} result{response.total === 1 ? "" : "s"}</p>{response.results.map((document, index) => <div id={`result-${document.id}`} key={document.id} role="option" aria-selected={selected === index}><SearchResultRow document={document} query={query} active={selected === index} onNavigate={() => onOpenChange(false)} /></div>)}</> : <div className="px-4 py-10 text-center"><p className="font-serif text-xl">No results found for “{query}”</p><p className="mt-2 text-sm leading-relaxed text-[#625D59]">Try a different keyword or browse our products and resources.</p><div className="mt-5 flex justify-center gap-4 text-sm font-semibold text-[#D71920]"><button type="button" onClick={() => { navigate("/shop"); onOpenChange(false); }}>Shop</button><button type="button" onClick={() => { navigate("/faq"); onOpenChange(false); }}>FAQ</button></div></div>}
          </div>
          {showViewAll && <div className="shrink-0 border-t border-[#E8E1DB] bg-[#FFFCFA] p-3 sm:p-4"><button type="button" onClick={viewAll} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#D71920] px-4 text-sm font-semibold text-white hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">View all results for “{query}”</button></div>}
          </RadixDialog.Content></motion.div>}
        </AnimatePresence>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
