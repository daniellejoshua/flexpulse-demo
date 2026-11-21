import { blogPosts } from "@/data/blog";
import { products } from "@/data/products";

export type SearchType = "product" | "article" | "page" | "faq" | "guide";
export type SearchSort = "relevance" | "newest" | "oldest" | "price-low" | "price-high";

export type SearchDocument = {
  id: string;
  type: SearchType;
  title: string;
  description: string;
  content: string;
  url: string;
  image?: string;
  topics: string[];
  updatedAt?: string;
  price?: number;
  originalPrice?: number;
};

export type SearchRequest = {
  query: string;
  type?: SearchType;
  topics?: string[];
  sort?: SearchSort;
  page?: number;
  limit?: number;
};

export type SearchResponse = {
  results: SearchDocument[];
  total: number;
  page: number;
  totalPages: number;
  countsByType: Record<SearchType, number>;
};

const pageDocuments: SearchDocument[] = [
  { id: "page-pemf", type: "page", title: "PEMF Therapy", description: "Learn the essentials of pulsed electromagnetic field therapy and everyday wellness.", content: "PEMF therapy uses pulsed electromagnetic fields. Explore how it works, its practical applications, programs, and wellness considerations.", url: "/pemf-therapy", topics: ["PEMF Therapy", "How It Works"] },
  { id: "page-science", type: "page", title: "The Science Behind PEMF", description: "Explore the research and concepts behind pulsed electromagnetic fields.", content: "FlexPulse explains PEMF research, magnetic fields, frequency, circulation, recovery, and the questions worth asking when reading wellness research.", url: "/science", topics: ["PEMF Therapy", "Research"] },
  { id: "page-how", type: "page", title: "How FlexPulse Works", description: "A practical introduction to using the FlexPulse G2 and its programs.", content: "Understand the FlexPulse controller, coil applicator, wellness programs, rechargeable battery, and how to build a consistent session routine.", url: "/how-it-works", topics: ["How It Works", "Product Usage"] },
  { id: "page-shipping", type: "page", title: "Shipping", description: "Shipping details for FlexPulse orders.", content: "Find FlexPulse shipping information, delivery timing, order support, and what to expect after placing an order.", url: "/shipping", topics: ["Shipping & Returns"] },
  { id: "page-guarantee", type: "page", title: "Guarantee & Returns", description: "Information about warranty coverage and returns.", content: "Learn about the FlexPulse controller warranty, accessory warranty, returns, and customer support.", url: "/guarantee", topics: ["Shipping & Returns", "Product Usage"] },
  { id: "page-contact", type: "page", title: "Contact FlexPulse", description: "Get in touch with the FlexPulse support team.", content: "Contact FlexPulse for product questions, shipping support, warranty help, and general customer service.", url: "/contact", topics: ["Shipping & Returns"] },
];

const guideDocuments: SearchDocument[] = [
  { id: "guide-started", type: "guide", title: "FlexPulse G2 User Guide", description: "Get started with your FlexPulse G2, programs, and applicators.", content: "The user guide covers setup, choosing one of 10 programs, positioning the coil, charging the rechargeable battery, and safe everyday use.", url: "/getting-started", topics: ["Product Usage", "How It Works"] },
  { id: "guide-programs", type: "guide", title: "FlexPulse Programs", description: "Understand the FlexPulse G2 wellness programs.", content: "Explore FlexPulse G2 programs, session duration, frequency, controller settings, and how to choose a routine.", url: "/programs", topics: ["Product Usage", "How It Works"] },
  { id: "guide-coil", type: "guide", title: "Coil Placement Guide", description: "Learn how to position the FlexPulse coil applicator.", content: "This guide covers practical coil placement, the replacement coil, and using the FlexPulse system comfortably.", url: "/coil-placement", topics: ["Product Usage"] },
];

const publishedFaqs = [
  { q: "How do I use the FlexPulse G2 PEMF?", a: "Charge it, place the coils where you want them, then choose one of the 10 programs and a session time. See the User Guide for step-by-step setup.", section: "using-flexpulse", topics: ["Product Usage", "PEMF Therapy"] },
  { q: "Should I use one or two coils?", a: "One coil gives full intensity; two coils share the unit’s intensity and drain the battery faster.", section: "using-flexpulse", topics: ["Product Usage"] },
  { q: "Does this have rechargeable batteries?", a: "Yes, the control unit has an internal rechargeable battery with up to 12 hours of use.", section: "coils-charging", topics: ["Product Usage"] },
  { q: "Is there a product warranty?", a: "2 years on the controller, 6 months on the charging disc and coils.", section: "orders-warranty", topics: ["Shipping & Returns", "Product Usage"] },
  { q: "My FlexPulse unit is not working, what should I do?", a: "Check charge, coil connection, and program selection. Contact support if issues persist.", section: "troubleshooting", topics: ["Product Usage"] },
];

export const searchDocuments: SearchDocument[] = [
  ...products.map((product) => ({
    id: product.id,
    type: "product" as const,
    title: product.name,
    description: product.description,
    content: `${product.description} ${product.packageContents.join(" ")} ${product.details.map((detail) => `${detail.label} ${detail.value}`).join(" ")}`,
    url: product.id === "flexpulse-g2" ? "/product" : `/product/${product.slug}`,
    image: product.images[0],
    topics: ["Product Usage", product.id === "flexpulse-g2" ? "PEMF Therapy" : "Accessories"],
    price: product.price,
    originalPrice: product.id === "flexpulse-g2" ? 1290 : undefined,
  })),
  ...blogPosts.map((post) => ({
    id: `article-${post.title}`,
    type: "article" as const,
    title: post.title,
    description: post.excerpt,
    content: `${post.title} ${post.category} ${post.excerpt}`,
    url: post.href,
    image: post.image,
    topics: post.category === "Research" ? ["Research", "PEMF Therapy"] : post.category === "Product guides" ? ["Product Usage", "How It Works"] : ["PEMF Therapy"],
    updatedAt: post.date,
  })),
  ...publishedFaqs.map((faq, index) => ({
    id: `faq-${index}`,
    type: "faq" as const,
    title: faq.q,
    description: faq.a,
    content: `${faq.q} ${faq.a}`,
    url: `/faq#faq-${faq.section}`,
    topics: faq.topics,
  })),
  ...pageDocuments,
  ...guideDocuments,
];

const types: SearchType[] = ["product", "article", "page", "faq", "guide"];

export function normalizeQuery(value: string) {
  return value.trim().toLocaleLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ");
}

function editDistance(left: string, right: string) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (left[i - 1] === right[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[right.length];
}

function scoreDocument(document: SearchDocument, terms: string[], phrase: string) {
  const title = normalizeQuery(document.title);
  const description = normalizeQuery(document.description);
  const content = normalizeQuery(document.content);
  let score = title.includes(phrase) ? 100 : 0;

  for (const term of terms) {
    if (title === term) score += 80;
    else if (title.includes(term)) score += 45;
    if (description.includes(term)) score += 18;
    if (content.includes(term)) score += 8;
    if (!title.includes(term) && !description.includes(term) && !content.includes(term)) {
      const words = `${title} ${description} ${content}`.split(" ");
      if (term.length > 4 && words.some((word) => editDistance(term, word) <= 1)) score += 5;
    }
  }
  return score;
}

export function search(request: SearchRequest): SearchResponse {
  const query = normalizeQuery(request.query);
  const terms = query.split(" ").filter(Boolean);
  const topicMatches = (document: SearchDocument) => !request.topics?.length || request.topics.some((topic) => document.topics.includes(topic));
  const matched = !terms.length ? [] : searchDocuments
    .map((document) => ({ document, score: scoreDocument(document, terms, query) }))
    .filter(({ score, document }) => score > 0 && topicMatches(document));
  const countsByType = Object.fromEntries(types.map((type) => [type, matched.filter(({ document }) => document.type === type).length])) as Record<SearchType, number>;
  let ranked = request.type ? matched.filter(({ document }) => document.type === request.type) : matched;
  const sort = request.sort ?? "relevance";
  ranked = [...ranked].sort((left, right) => {
    if (sort === "price-low") return (left.document.price ?? Infinity) - (right.document.price ?? Infinity);
    if (sort === "price-high") return (right.document.price ?? -Infinity) - (left.document.price ?? -Infinity);
    if (sort === "newest") return (right.document.updatedAt ?? "").localeCompare(left.document.updatedAt ?? "");
    if (sort === "oldest") return (left.document.updatedAt ?? "").localeCompare(right.document.updatedAt ?? "");
    return right.score - left.score || left.document.title.localeCompare(right.document.title);
  });
  const limit = request.limit ?? 10;
  const total = ranked.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(request.page ?? 1, 1), totalPages);
  return { results: ranked.slice((page - 1) * limit, page * limit).map(({ document }) => document), total, page, totalPages, countsByType };
}

export function getSnippet(document: SearchDocument, query: string) {
  const source = document.content;
  const term = normalizeQuery(query).split(" ").find(Boolean) ?? "";
  const index = term ? source.toLowerCase().indexOf(term) : -1;
  if (index < 0) return document.description;
  const start = Math.max(0, source.lastIndexOf(" ", Math.max(0, index - 75)) + 1);
  const end = source.indexOf(" ", index + term.length + 125);
  return `${start ? "…" : ""}${source.slice(start, end < 0 ? source.length : end)}${end >= 0 ? "…" : ""}`;
}
