import { Activity, ArrowRight, BatteryCharging, Gauge, Power, Radio, Settings2, ShieldCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { flexPulseG2 } from "@/data/products";

type Presentation = "text" | "visual_explanation" | "product_overview" | "steps" | "specifications" | "troubleshooting" | "safety";
type Props = { content: string; presentation?: Presentation; question?: string; onQuickReply: (question: string) => void };

function inferPresentation(question = "", content = ""): Presentation {
  const source = `${question} ${content}`.toLowerCase();
  if (/\b(flexpulse g2|product overview)\b/.test(source)) return "product_overview";
  if (/\b(specification|specs|frequency range|maximum intensity|gauss)\b/.test(source)) return "specifications";
  if (/\b(safe|contraindication|medical advice)\b/.test(source)) return "safety";
  if (/\b(not working|turn on|charging issue|troubleshoot)\b/.test(source)) return "troubleshooting";
  if (/\b(what is pemf|how does pemf|electromagnetic field)\b/.test(source)) return "visual_explanation";
  return extractNumberedSteps(content) ? "steps" : "text";
}

export function ChatMessageRenderer({ content, presentation, question, onQuickReply }: Props) {
  const type = presentation ?? inferPresentation(question, content);
  if (type === "product_overview") return <ChatProductOverview content={content} onQuickReply={onQuickReply} />;
  if (type === "visual_explanation") return <ChatVisualExplanation content={content} onQuickReply={onQuickReply} />;
  if (type === "specifications") return <ChatSpecificationGrid content={content} onQuickReply={onQuickReply} />;
  if (type === "safety") return <ChatSafetyNotice content={content} onQuickReply={onQuickReply} />;
  if (type === "troubleshooting") return <ChatTroubleshooting content={content} onQuickReply={onQuickReply} />;
  if (type === "steps") return <ChatProcessSteps content={content} onQuickReply={onQuickReply} />;
  if (/\|.+\|[\r\n]+\|?\s*:?-{3,}/.test(content)) return <ChatComparison content={content} />;
  return <ChatResponseFrame category="FLEXPULSE ASSISTANT"><ChatMarkdownRenderer content={content} /></ChatResponseFrame>;
}

function ChatResponseFrame({ category, title, children }: { category: string; title?: string; children: React.ReactNode }) {
  return <article className="[container-type:inline-size] w-full min-w-0 rounded-[20px] border border-[#E7E2E2] bg-white p-4 text-[13px] leading-[1.6] text-[#17191D] shadow-[0_4px_14px_rgba(33,30,29,.04)]">
    <p className="text-[10px] font-semibold tracking-[.12em] text-[#A90012]">{category}</p>
    {title && <h3 className="mt-2 text-[20px] font-bold leading-tight tracking-[-.035em] text-[#17191D]">{title}</h3>}
    <div className={title ? "mt-3" : "mt-2"}>{children}</div>
  </article>;
}

function ElectromagneticFieldVisual({ reduceMotion }: { reduceMotion: boolean | null }) {
  return <div className="relative grid min-h-36 place-items-center overflow-hidden rounded-2xl bg-[#FCEAEC]">
    <svg viewBox="0 0 240 140" className="h-36 w-full text-[#D60016]" aria-label="Illustration of pulsed electromagnetic fields" role="img">
      <path d="M10 96C43 64 72 64 104 96S167 128 230 54" fill="none" stroke="currentColor" strokeDasharray="2 7" strokeOpacity=".45" strokeWidth="1.5" />
      {[25, 42, 59].map((radius, index) => <motion.circle key={radius} cx="120" cy="70" r={radius} fill="none" stroke="currentColor" strokeWidth="1.2" animate={reduceMotion ? { opacity: .38 } : { opacity: [.2, .58, .2] }} transition={{ duration: 4.8, delay: index * .55, repeat: Infinity, ease: "easeInOut" }} />)}
      <circle cx="120" cy="70" r="17" fill="#D60016" />
      <path d="M111 70h18M120 61v18" stroke="white" strokeLinecap="round" strokeWidth="2" />
    </svg>
  </div>;
}

function ChatVisualExplanation({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  const reduceMotion = useReducedMotion();
  const steps = [["Pulsed field", "The device generates time-varying magnetic fields."], ["Field interaction", "Fields interact with materials and tissues according to electromagnetic principles."], ["Wellness applications", "Explore proposed applications alongside available scientific evidence."]];
  return <ChatResponseFrame category="ABOUT PEMF" title="What Is PEMF Therapy?">
    <p className="text-[#68707C]">PEMF stands for Pulsed Electromagnetic Field. It uses time-varying magnetic fields produced by electrical pulses.</p>
    <div className="mt-4 grid gap-3 @[390px]:grid-cols-[.9fr_1.1fr]">
      <ElectromagneticFieldVisual reduceMotion={reduceMotion} />
      <div className="space-y-2">{steps.map(([title, description], index) => <div key={title} className="border-l border-[#E7E2E2] pl-3"><p className="text-[10px] font-semibold tracking-[.1em] text-[#D60016]">0{index + 1} — {title}</p><p className="mt-0.5 text-xs leading-relaxed text-[#68707C]">{description}</p></div>)}</div>
    </div>
    <div className="mt-4 text-xs text-[#68707C]"><ChatMarkdownRenderer content={content} /></div>
    <ChatActions links={[["Explore the Science", "/science"]]} />
    <QuickReplies replies={["How does PEMF work?", "What is FlexPulse G2?"]} onQuickReply={onQuickReply} />
  </ChatResponseFrame>;
}

function ChatProductOverview({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  const features = [
    { icon: Activity, title: "10 Pre-Set Programs", description: "Available on the FlexPulse G2 controller." },
    { icon: Gauge, title: "Up to 200 gauss", description: "Listed maximum magnetic output." },
    { icon: BatteryCharging, title: "Rechargeable battery", description: "Internal battery with up to 12 hours of use." },
    { icon: Settings2, title: "Portable design", description: "Designed and manufactured in Germany." },
  ];
  return <ChatResponseFrame category="PRODUCT OVERVIEW" title={flexPulseG2.name}>
    <div className="flex gap-3"><p className="flex-1 text-xs leading-relaxed text-[#68707C]">{flexPulseG2.description}</p><img src={flexPulseG2.images[0]} alt="FlexPulse G2 product kit" className="size-20 shrink-0 object-contain" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} /></div>
    <div className="mt-4 divide-y divide-[#E7E2E2] border-y border-[#E7E2E2]">{features.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-3 py-2.5"><span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#FCEAEC] text-[#D60016]"><Icon className="size-4" /></span><p className="text-xs leading-relaxed"><strong className="block text-[#17191D]">{title}</strong><span className="text-[#68707C]">{description}</span></p></div>)}</div>
    {content && <div className="mt-3 text-xs text-[#68707C]"><ChatMarkdownRenderer content={content} /></div>}
    <ChatActions links={[["Explore FlexPulse G2", "/product"], ["View specifications", "/product#specifications"]]} />
    <QuickReplies replies={["How does PEMF work?", "How do I use it?", "What’s included?"]} onQuickReply={onQuickReply} />
  </ChatResponseFrame>;
}

function ChatSpecificationGrid({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  const detail = (label: string) => flexPulseG2.details.find((item) => item.label === label)?.value;
  const specs = [[Radio, "Frequency range", detail("Frequency Range")], [Gauge, "Maximum intensity", detail("Maximum Intensity")], [Settings2, "Programs", detail("Number of Programs")], [BatteryCharging, "Power", detail("Power")], [ShieldCheck, "Warranty", detail("Warranty")]];
  return <ChatResponseFrame category="TECHNICAL DETAILS" title="FlexPulse G2 specifications">
    <div className="grid gap-2 @[390px]:grid-cols-2">{specs.map(([Icon, label, value]) => { const SpecIcon = Icon as typeof Radio; return <div key={label as string} className="rounded-xl bg-[#F8F9FB] p-3"><SpecIcon className="size-4 text-[#D60016]" /><p className="mt-2 text-[11px] font-semibold text-[#68707C]">{label as string}</p><p className="mt-0.5 text-xs font-medium leading-relaxed text-[#17191D]">{value as string}</p></div>; })}</div>
    {content && <div className="mt-3 text-xs text-[#68707C]"><ChatMarkdownRenderer content={content} /></div>}
    <ChatActions links={[["View full specifications", "/product#specifications"]]} />
    <QuickReplies replies={["What’s included?", "How do I use FlexPulse?"]} onQuickReply={onQuickReply} />
  </ChatResponseFrame>;
}

function ChatProcessSteps({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  const extracted = extractNumberedSteps(content);
  const steps = extracted?.items ?? ["Charge the controller and connect the appropriate accessories according to the user guide.", "Choose one of the available programs using the documented controls.", "Follow the selected program instructions for your session."];
  return <ChatResponseFrame category="GETTING STARTED" title="Using FlexPulse">
    {extracted?.intro && <div className="text-xs text-[#68707C]"><ChatMarkdownRenderer content={extracted.intro} /></div>}
    <p className="mt-4 text-xs font-semibold text-[#17191D]">Steps</p>
    <ol className="mt-3 space-y-3">{steps.map((step, index) => <motion.li key={`${index}-${step}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: index * .07 }} className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#FCEAEC] text-[11px] font-bold text-[#D60016]">0{index + 1}</span><div className="min-w-0 pt-0.5 text-xs text-[#68707C]"><ChatMarkdownRenderer content={step} /></div></motion.li>)}</ol>
    <ChatActions links={[["Open the user guide", "/getting-started"]]} />
    <QuickReplies replies={["What programs are available?", "View specifications"]} onQuickReply={onQuickReply} />
  </ChatResponseFrame>;
}

function ChatTroubleshooting({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  const extracted = extractNumberedSteps(content);
  const steps = extracted?.items ?? ["Check the charge level and charging connection.", "Confirm the coil connection and program selection.", "Contact support if the issue continues."];
  return <ChatResponseFrame category="TROUBLESHOOTING" title="Device support">
    <div className="flex gap-2 rounded-xl bg-[#FCEAEC] p-3 text-xs text-[#68707C]"><Power className="size-4 shrink-0 text-[#D60016]" />Use the documented checks below. If the issue persists, FlexPulse support can help.</div>
    <ChatSteps steps={steps} />
    <ChatActions links={[["Contact support", "/contact"]]} />
    <QuickReplies replies={["Still having trouble?", "View the user guide"]} onQuickReply={onQuickReply} />
    {content && <div className="mt-3 text-xs text-[#68707C]"><ChatMarkdownRenderer content={content} /></div>}
  </ChatResponseFrame>;
}

function ChatSafetyNotice({ content, onQuickReply }: { content: string; onQuickReply: (question: string) => void }) {
  return <ChatResponseFrame category="SAFETY INFORMATION" title="Important considerations">
    <div className="flex gap-2 rounded-xl border border-[#F1CDD2] bg-[#FCEAEC] p-3 text-xs leading-relaxed text-[#68707C]"><ShieldCheck className="size-4 shrink-0 text-[#D60016]" />FlexPulse information is not medical advice. Review the contraindications and consult a qualified healthcare professional when appropriate.</div>
    <div className="mt-3 text-xs text-[#68707C]"><ChatMarkdownRenderer content={content} /></div>
    <ChatActions links={[["Review contraindications", "/contraindications"], ["Contact support", "/contact"]]} />
    <QuickReplies replies={["What are the product specifications?", "How do I use FlexPulse?"]} onQuickReply={onQuickReply} />
  </ChatResponseFrame>;
}

function ChatComparison({ content }: { content: string }) {
  return <ChatResponseFrame category="COMPARISON" title="At a glance"><div className="overflow-x-auto"><ChatMarkdownRenderer content={content} /></div></ChatResponseFrame>;
}

function ChatActions({ links }: { links: [string, string][] }) {
  return <div className="mt-4 flex flex-wrap gap-2">{links.map(([label, route]) => <Link key={route} to={route} className="group inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#D60016] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#A90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2">{label}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></Link>)}</div>;
}

function QuickReplies({ replies, onQuickReply }: { replies: string[]; onQuickReply: (question: string) => void }) {
  return <div className="mt-3 flex flex-wrap gap-1.5">{replies.map((reply) => <button key={reply} type="button" onClick={() => onQuickReply(reply)} className="min-h-8 rounded-full border border-[#E7E2E2] px-2.5 text-[11px] font-medium text-[#4E5560] transition-colors hover:border-[#E8B9C0] hover:bg-[#FFF9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016]">{reply}</button>)}</div>;
}

function extractNumberedSteps(content: string) {
  const lines = content.split("\n");
  const first = lines.findIndex((line) => /^\s*\d+[.)]\s+/.test(line));
  const items = lines.filter((line) => /^\s*\d+[.)]\s+/.test(line)).map((line) => line.replace(/^\s*\d+[.)]\s+/, "").trim());
  return first >= 0 && items.length >= 2 ? { intro: lines.slice(0, first).join("\n").trim(), items } : null;
}

export function ChatMarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h1: ({ children }) => <h4 className="mt-3 text-[15px] font-semibold leading-snug first:mt-0">{children}</h4>,
    h2: ({ children }) => <h4 className="mt-3 text-[14px] font-semibold leading-snug first:mt-0">{children}</h4>,
    h3: ({ children }) => <h5 className="mt-3 text-[13px] font-semibold leading-snug first:mt-0">{children}</h5>,
    p: ({ children }) => <p className="mt-2 first:mt-0">{children}</p>,
    ul: ({ children }) => <ul className="mt-2 list-disc space-y-1 pl-4 marker:text-[#D60016]">{children}</ul>,
    ol: ({ children }) => <ol className="mt-2 list-decimal space-y-1 pl-4 marker:font-semibold marker:text-[#D60016]">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-[#17191D]">{children}</strong>,
    code: ({ children }) => <code className="rounded bg-[#F8F9FB] px-1 py-0.5 text-[.9em]">{children}</code>,
    table: ({ children }) => <table className="min-w-full text-left text-xs">{children}</table>,
    th: ({ children }) => <th className="border-b border-[#E7E2E2] bg-[#F8F9FB] px-2 py-2 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-[#E7E2E2] px-2 py-2">{children}</td>,
    a: ({ href, children }) => <a href={href?.startsWith("/") || /^https?:\/\//.test(href ?? "") ? href : undefined} className="font-semibold text-[#D60016] underline" target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>{children}</a>,
  }}>{content}</ReactMarkdown>;
}

function ChatSteps({ steps }: { steps: string[] }) {
  return <ol className="mt-4 space-y-2.5">{steps.map((step, index) => <li key={`${index}-${step}`} className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#FCEAEC] text-[10px] font-bold text-[#D60016]">{index + 1}</span><span className="pt-0.5 text-xs leading-relaxed text-[#68707C]">{step}</span></li>)}</ol>;
}
