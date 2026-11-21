import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { Highlight, SearchResultVisual, searchTypeLabels } from "@/features/search/SearchParts";
import { getSnippet, search, searchDocuments, type SearchSort, type SearchType } from "@/features/search/searchService";

const types: Array<SearchType | "all"> = ["all", "product", "article", "page", "faq", "guide"];
const topics = [...new Set(searchDocuments.flatMap((document) => document.topics))];

function Filters({ type, topics: selectedTopics, setType, setTopics, clear }: { type?: SearchType; topics: string[]; setType: (type?: SearchType) => void; setTopics: (topics: string[]) => void; clear: () => void }) {
  return <div className="space-y-7">
    <fieldset><legend className="text-sm font-bold">Content type</legend><div className="mt-3 space-y-2">{types.map((item) => <label key={item} className="flex min-h-8 items-center gap-3 text-sm text-[#403835]"><input type="radio" name="content-type" checked={(item === "all" && !type) || item === type} onChange={() => setType(item === "all" ? undefined : item)} className="size-4 accent-[#D71920]" />{item === "all" ? "All types" : searchTypeLabels[item]}</label>)}</div></fieldset>
    <fieldset><legend className="text-sm font-bold">Topics</legend><div className="mt-3 space-y-2">{topics.map((topic) => <label key={topic} className="flex min-h-8 items-center gap-3 text-sm text-[#403835]"><input type="checkbox" checked={selectedTopics.includes(topic)} onChange={() => setTopics(selectedTopics.includes(topic) ? selectedTopics.filter((value) => value !== topic) : [...selectedTopics, topic])} className="size-4 rounded accent-[#D71920]" />{topic}</label>)}</div></fieldset>
    <button type="button" onClick={clear} className="text-sm font-semibold text-[#D71920] hover:underline">Clear filters</button>
  </div>;
}

function ResultCard({ document, query }: { document: ReturnType<typeof search>["results"][number]; query: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const product = document.type === "product" ? products.find((item) => item.id === document.id) : undefined;
  const addToCart = () => {
    if (!product) return;
    addItem(product, 1);
    setCartOpen(true);
    toast.success(`${product.name} added to your cart.`);
  };
  return <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .28, ease: [0.22, 1, 0.36, 1] }} className="group flex gap-4 rounded-[18px] border border-[#E8E1DB] bg-white p-4 transition-colors hover:border-[#D9C5C3] hover:bg-[#FFFCFA] sm:gap-5 sm:p-5">
    <Link to={document.url} className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"><SearchResultVisual document={document} /></Link>
    <div className="min-w-0 flex-1">
      <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#D71920]">{searchTypeLabels[document.type]}</p>
      <Link to={document.url} className="mt-1 block w-fit font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-tight tracking-[-.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"><Highlight text={document.title} query={query} /></Link>
      <p className="mt-2 text-sm leading-relaxed text-[#625D59]"><Highlight text={getSnippet(document, query)} query={query} /></p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {document.type === "product" ? <><span className="text-lg font-semibold text-[#D71920]">${document.price?.toFixed(0)}</span>{document.originalPrice && <span className="text-sm text-[#8A827D] line-through">${document.originalPrice}</span>}<button type="button" onClick={addToCart} className="min-h-10 rounded-full bg-[#D71920] px-4 text-sm font-semibold text-white hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Add to cart</button></> : <Link to={document.url} className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#D71920] hover:underline">{document.type === "faq" ? "View answer" : document.type === "article" ? "Read article" : "View page"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link>}
      </div>
    </div>
  </motion.article>;
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [draft, setDraft] = useState(params.get("q") ?? "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const query = params.get("q") ?? "";
  const type = types.includes(params.get("type") as SearchType) ? params.get("type") as SearchType | null : null;
  const selectedTopics = params.getAll("topic").filter((topic) => topics.includes(topic));
  const sort = (params.get("sort") as SearchSort) || "relevance";
  const page = Math.max(Number(params.get("page")) || 1, 1);
  const response = search({ query, type: type ?? undefined, topics: selectedTopics, sort, page, limit: 10 });
  const update = (changes: Record<string, string | string[] | undefined>) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => {
      next.delete(key);
      if (Array.isArray(value)) value.forEach((item) => next.append(key, item));
      else if (value) next.set(key, value);
    });
    if (!("page" in changes)) next.delete("page");
    setParams(next);
  };
  const setType = (value?: SearchType) => update({ type: value });
  const setTopics = (value: string[]) => update({ topic: value });
  const clear = () => update({ type: undefined, topic: [], sort: undefined });
  const submit = (event: React.FormEvent) => { event.preventDefault(); update({ q: draft.trim() || undefined, page: undefined }); };
  const changePage = (nextPage: number) => { update({ page: String(nextPage) }); requestAnimationFrame(() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" })); };

  return <main className="min-h-screen bg-[#FAF8F6] text-[#211E1D]">
    <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-[#625D59]"><Link to="/" className="hover:text-[#D71920]">Home</Link><span className="px-2">›</span><span>Search</span></nav>
      <h1 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-[-.055em]">Search Results</h1>
      {query && <p className="mt-4 text-[15px] text-[#625D59]">Showing {response.total} result{response.total === 1 ? "" : "s"} for <span className="font-semibold text-[#D71920]">“{query}”</span></p>}
      <form onSubmit={submit} className="mt-8 flex flex-col gap-2 rounded-2xl border border-[#E8E1DB] bg-white p-2 sm:flex-row sm:items-center">
        <label className="flex min-h-12 min-w-0 flex-1 items-center gap-3 px-3"><Search className="size-5 shrink-0 text-[#D71920]" /><span className="sr-only">Search FlexPulse</span><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search products, articles, pages..." className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#8A827D]" />{draft && <button type="button" onClick={() => setDraft("")} className="grid size-10 place-items-center rounded-full hover:bg-[#F0EBE5]" aria-label="Clear search"><X className="size-4" /></button>}</label>
        <button className="min-h-12 rounded-xl bg-[#D71920] px-6 text-sm font-semibold text-white hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2">Search</button>
      </form>
      {query && <div className="mt-6 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0" aria-label="Result categories">{types.map((item) => { const active = item === "all" ? !type : type === item; const count = item === "all" ? Object.values(response.countsByType).reduce((total, value) => total + value, 0) : response.countsByType[item]; return <button key={item} type="button" onClick={() => setType(item === "all" ? undefined : item)} className={`h-10 shrink-0 rounded-full border px-4 text-sm font-semibold ${active ? "border-[#D71920] bg-[#D71920] text-white" : "border-[#E8E1DB] bg-white hover:border-[#D71920]"}`}>{item === "all" ? "All results" : searchTypeLabels[item]} ({count})</button>; })}</div>}
      {!query ? <div className="mt-12 rounded-2xl border border-dashed border-[#E8E1DB] bg-white px-6 py-16 text-center"><p className="font-serif text-2xl">Find what you need.</p><p className="mt-2 text-sm text-[#625D59]">Search products, articles, answers, and guides across FlexPulse.</p></div> : <div id="search-results" className="mt-8 grid gap-8 lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden rounded-2xl border border-[#E8E1DB] bg-white p-5 lg:block"><Filters type={type ?? undefined} topics={selectedTopics} setType={setType} setTopics={setTopics} clear={clear} /></aside>
        <section>
          <div className="mb-4 flex items-center justify-between gap-3"><button type="button" onClick={() => setMobileFiltersOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8E1DB] bg-white px-4 text-sm font-semibold lg:hidden"><SlidersHorizontal className="size-4 text-[#D71920]" /> Filters</button><label className="ml-auto flex min-h-11 items-center gap-2 text-sm text-[#625D59]">Sort by <select value={sort} onChange={(event) => update({ sort: event.target.value })} className="rounded-full border border-[#E8E1DB] bg-white px-3 py-2 text-[#211E1D] outline-none"><option value="relevance">Relevance</option><option value="newest">Newest</option><option value="oldest">Oldest</option>{type === "product" && <><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></>}</select></label></div>
          <AnimatePresence mode="wait">{response.results.length ? <motion.div key={`${query}-${type}-${selectedTopics.join("-")}-${page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">{response.results.map((document) => <ResultCard key={document.id} document={document} query={query} />)}</motion.div> : <div className="rounded-2xl border border-[#E8E1DB] bg-white px-6 py-14 text-center"><p className="font-serif text-2xl">No results found for “{query}”</p><p className="mt-2 text-sm text-[#625D59]">Try a different keyword or clear your filters.</p><button type="button" onClick={clear} className="mt-5 text-sm font-semibold text-[#D71920] hover:underline">Clear filters</button></div>}</AnimatePresence>
          {response.totalPages > 1 && <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Search result pagination"><button type="button" disabled={response.page === 1} onClick={() => changePage(response.page - 1)} className="grid size-10 place-items-center rounded-full border border-[#E8E1DB] bg-white disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="size-4" /></button>{Array.from({ length: response.totalPages }, (_, index) => index + 1).map((number) => <button key={number} type="button" onClick={() => changePage(number)} aria-current={response.page === number ? "page" : undefined} className={`size-10 rounded-full text-sm font-semibold ${response.page === number ? "bg-[#D71920] text-white" : "border border-[#E8E1DB] bg-white"}`}>{number}</button>)}<button type="button" disabled={response.page === response.totalPages} onClick={() => changePage(response.page + 1)} className="grid size-10 place-items-center rounded-full border border-[#E8E1DB] bg-white disabled:opacity-40" aria-label="Next page"><ChevronRight className="size-4" /></button></nav>}
        </section>
      </div>}
    </div>
    <Dialog open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}><DialogContent className="top-auto bottom-0 max-h-[85vh] max-w-none translate-y-0 rounded-b-none rounded-t-[24px] border-[#E8E1DB] bg-[#FFFCFA] p-6 sm:max-w-none"><DialogTitle className="font-serif text-2xl">Filters</DialogTitle><div className="mt-6 overflow-y-auto"><Filters type={type ?? undefined} topics={selectedTopics} setType={setType} setTopics={setTopics} clear={clear} /></div><button type="button" onClick={() => setMobileFiltersOpen(false)} className="mt-6 min-h-12 w-full rounded-xl bg-[#D71920] text-sm font-semibold text-white">Apply filters</button></DialogContent></Dialog>
  </main>;
}
