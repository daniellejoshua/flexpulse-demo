import { ArrowRight, BookOpen, FileText, HelpCircle, Package, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { SearchDocument, SearchType } from "./searchService";
import { getSnippet, normalizeQuery } from "./searchService";

const labels: Record<SearchType, string> = { product: "Product", article: "Article", page: "Page", faq: "FAQ", guide: "Guide" };
const icons: Record<Exclude<SearchType, "product" | "article">, LucideIcon> = { page: FileText, faq: HelpCircle, guide: BookOpen };

export function Highlight({ text, query }: { text: string; query: string }) {
  const terms = normalizeQuery(query).split(" ").filter(Boolean);
  if (!terms.length) return <>{text}</>;
  const expression = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return <>{text.split(expression).map((part, index) => terms.includes(part.toLowerCase()) ? <mark key={`${part}-${index}`} className="rounded bg-[#FBE4E4] px-0.5 text-inherit">{part}</mark> : part)}</>;
}

export function SearchResultVisual({ document }: { document: SearchDocument }) {
  const Icon = document.type === "product" ? Package : document.type === "article" ? BookOpen : icons[document.type];
  return document.image
    ? <img src={document.image} alt="" className="size-14 shrink-0 rounded-xl bg-[#F0EBE5] object-contain p-1.5 sm:size-16" loading="lazy" />
    : <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#FBE4E4] text-[#D71920]"><Icon className="size-5" /></span>;
}

export function SearchResultRow({ document, query, active, onNavigate }: { document: SearchDocument; query: string; active?: boolean; onNavigate?: () => void }) {
  return (
    <Link to={document.url} onClick={onNavigate} className={`group flex min-h-20 items-center gap-3 rounded-xl px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] ${active ? "bg-[#FBE4E4]" : "hover:bg-[#F8F5F2]"}`}>
      <SearchResultVisual document={document} />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[.12em] text-[#D71920]">{labels[document.type]}</span>
        <span className="mt-1 block truncate font-serif text-lg leading-tight"><Highlight text={document.title} query={query} /></span>
        <span className="mt-1 block line-clamp-1 text-sm text-[#625D59]"><Highlight text={getSnippet(document, query)} query={query} /></span>
      </span>
      <ArrowRight className="size-4 shrink-0 text-[#D71920] transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export const searchTypeLabels: Record<SearchType, string> = labels;
