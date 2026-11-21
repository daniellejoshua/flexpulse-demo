import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, HeartPulse, Layers3, Search, Zap } from "lucide-react";
import { motion } from "motion/react";
import { Link, useSearchParams } from "react-router-dom";
import { blogPosts } from "@/data/blog";

const posts = blogPosts;

const resources = [
  { icon: HeartPulse, title: "What Is PEMF Therapy?", href: "/pemf-therapy" },
  { icon: Layers3, title: "The Science", href: "/science" },
  { icon: Zap, title: "PEMF Reviews", href: "/reviews" },
  { icon: BookOpen, title: "User Guide", href: "/getting-started" },
];

function CategoryLabel({ children }: { children: string }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#D71920]">{children}</p>;
}

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const selectedCategory = searchParams.get("category") ?? "all";
  const categories = [...new Set(posts.map((post) => post.category))];
  const featured = posts[0];
  const visiblePosts = useMemo(() => posts.slice(1).filter((post) => {
    const categoryMatches = selectedCategory === "all" || post.category === selectedCategory;
    const queryMatches = post.title.toLowerCase().includes(query.trim().toLowerCase()) || post.category.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatches && queryMatches;
  }), [query, selectedCategory]);
  const articlesPerPage = 6;
  const pageCount = Math.ceil(visiblePosts.length / articlesPerPage);
  const pagedPosts = visiblePosts.slice((page - 1) * articlesPerPage, page * articlesPerPage);

  const setCategory = (category: string) => {
    setPage(1);
    setSearchParams(category === "all" ? {} : { category });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F7] pb-20 text-[#191716] sm:pb-24">
      <section className="relative overflow-hidden">
        <svg className="pointer-events-none absolute right-[-5%] top-0 h-full w-[60%] min-w-[520px] text-[#D71920]/10" viewBox="0 0 800 360" fill="none" aria-hidden="true">
          <path d="M97 309C277 74 511 80 758 231C812 264 852 275 902 244" stroke="currentColor" strokeWidth="50" />
          <path d="M239 345C400 159 576 168 774 280C819 306 853 311 891 293" stroke="currentColor" strokeWidth="17" />
        </svg>
        <div className="relative mx-auto max-w-[1280px] px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:px-12 lg:pt-24">
          <p className="text-xs font-bold tracking-[0.12em] text-[#D71920]">FLEXPULSE JOURNAL</p>
          <h1 className="mt-3 max-w-[760px] font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[.96] tracking-[-0.055em]">Insights for better wellness.</h1>
          <p className="mt-4 max-w-[700px] text-[15px] leading-relaxed text-[#66615F] sm:text-base">Explore PEMF research, practical guides, wellness insights, and real experiences.</p>

          <nav className="mt-7 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0" aria-label="Blog categories">
            <button type="button" onClick={() => setCategory("all")} className={`h-10 shrink-0 rounded-full px-5 text-sm font-semibold transition-colors ${selectedCategory === "all" ? "bg-[#D71920] text-white shadow-sm" : "border border-[#EDE8E5] bg-white text-[#191716] hover:bg-[#FFF1F1]"}`}>All Articles</button>
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setCategory(category)} className={`h-10 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors ${selectedCategory === category ? "border-[#D71920] bg-[#D71920] text-white shadow-sm" : "border-[#EDE8E5] bg-white text-[#191716] hover:bg-[#FFF1F1]"}`}>
                {category}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <section aria-labelledby="featured-story">
          <p id="featured-story" className="text-xs font-bold tracking-[0.12em] text-[#191716]">FEATURED STORY</p>
          <Link to="/blog/a-guide-to-pemf-therapy-gamma-waves" className="group mt-3 grid overflow-hidden rounded-2xl border border-[#EDE8E5] bg-white transition-colors hover:border-[#E0BFC0] lg:grid-cols-[55%_45%]">
            <div className="overflow-hidden">
              <img src={featured.image} alt="" className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] lg:aspect-auto" />
            </div>
            <div className="flex min-h-[280px] flex-col p-6 sm:p-8 lg:p-10">
              <CategoryLabel>{featured.category}</CategoryLabel>
              <h2 className="mt-4 font-serif text-[clamp(1.9rem,3vw,2.55rem)] leading-[1.04] tracking-[-0.045em]">{featured.title}</h2>
              <p className="mt-5 text-sm leading-relaxed text-[#66615F]">{featured.excerpt}</p>
              <p className="mt-auto pt-6 text-sm text-[#66615F]">{featured.date}</p>
            </div>
          </Link>
        </section>

        <section className="mt-14 sm:mt-18" aria-labelledby="latest-articles">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="latest-articles" className="font-serif text-[clamp(2rem,3.3vw,2.75rem)] tracking-[-0.045em]">Latest Articles</h2>
            <label className="flex h-11 w-full items-center gap-2 rounded-xl border border-[#EDE8E5] bg-white px-3 text-[#66615F] sm:w-72">
              <Search className="size-4 shrink-0" />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search articles..." className="min-w-0 flex-1 bg-transparent text-sm text-[#191716] outline-none placeholder:text-[#66615F]" />
            </label>
          </div>

          {visiblePosts.length ? (
            <motion.div layout className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
              {pagedPosts.map((post, index) => (
                <motion.article key={post.title} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: index * .05 }} className="group flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-[#EDE8E5] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E0BFC0]">
                  <div className="overflow-hidden">
                    <img src={post.image} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <CategoryLabel>{post.category}</CategoryLabel>
                    <h3 className="mt-3 font-serif text-[21px] leading-[1.16] tracking-[-0.035em]">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#66615F]">{post.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-6 text-xs text-[#66615F]">
                      <time>{post.date}</time>
                      <ArrowRight className="size-4 text-[#D71920] transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="mt-7 rounded-2xl border border-[#EDE8E5] bg-white p-8 text-center text-sm text-[#66615F]">No articles match your search.</div>
          )}
          {pageCount > 1 && (
            <nav className="mt-9 flex justify-center gap-2" aria-label="Blog pagination">
              <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="grid size-10 place-items-center rounded-full border border-[#EDE8E5] bg-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="size-4" /></button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button key={number} type="button" onClick={() => setPage(number)} aria-current={page === number ? "page" : undefined} className={`size-10 rounded-full text-sm font-semibold ${page === number ? "bg-[#D71920] text-white" : "border border-[#EDE8E5] bg-white text-[#191716]"}`}>{number}</button>
              ))}
              <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page === pageCount} className="grid size-10 place-items-center rounded-full border border-[#EDE8E5] bg-white disabled:cursor-not-allowed disabled:opacity-40" aria-label="Next page"><ChevronRight className="size-4" /></button>
            </nav>
          )}
        </section>

        <section className="mt-16 rounded-[1.5rem] bg-[#FFF0F1] p-6 sm:mt-20 sm:p-10 lg:p-12" aria-labelledby="start-here">
          <p className="text-xs font-bold tracking-[0.12em] text-[#D71920]">NEW TO FLEXPULSE?</p>
          <h2 id="start-here" className="mt-3 font-serif text-[clamp(2rem,3.5vw,3rem)] tracking-[-0.045em]">Start with the essentials.</h2>
          <p className="mt-2 text-sm text-[#66615F] sm:text-base">A simple introduction to PEMF technology and your FlexPulse device.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map(({ icon: Icon, title, href }) => (
              <Link key={title} to={href} className="group flex min-h-40 flex-col rounded-2xl border border-[#EDE8E5] bg-white p-5 transition-colors hover:border-[#E0BFC0]">
                <Icon className="size-6 text-[#D71920]" strokeWidth={1.7} />
                <h3 className="mt-5 font-semibold">{title}</h3>
                <ArrowRight className="mt-auto size-4 self-end text-[#D71920] transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
