import { Activity, BookOpen, ChevronRight, ExternalLink, Info, MessageCircle, Minus, Send, ShoppingBag, Sparkles, Truck, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { ChatMessageRenderer } from "@/components/chat/ChatMessageRenderer";

type ChatPresentation = "text" | "visual_explanation" | "product_overview" | "steps" | "specifications" | "troubleshooting" | "safety";
type Message = { role: "user" | "assistant"; content: string; link?: string; presentation?: ChatPresentation; question?: string };
type Suggestion = { label: string; icon: typeof Activity };

const defaultSuggestions: Suggestion[] = [
  { label: "What is PEMF therapy?", icon: Activity },
  { label: "Explore FlexPulse G2", icon: ShoppingBag },
  { label: "Shipping & returns", icon: Truck },
  { label: "How do I use FlexPulse?", icon: BookOpen },
];

function suggestionsFor(pathname: string): Suggestion[] {
  if (pathname === "/product") return [
    { label: "What’s included with FlexPulse G2?", icon: ShoppingBag },
    { label: "What are the specifications?", icon: Activity },
    { label: "How long is the warranty?", icon: BookOpen },
    { label: "What is the return policy?", icon: Truck },
  ];
  if (pathname === "/checkout") return [
    { label: "Shipping information", icon: Truck },
    { label: "Return policy", icon: BookOpen },
    { label: "Contact support", icon: MessageCircle },
    { label: "Purchasing outside the US or Canada", icon: ShoppingBag },
  ];
  if (pathname === "/science" || pathname === "/pemf-therapy") return [
    { label: "What is PEMF?", icon: Activity },
    { label: "How does FlexPulse work?", icon: ShoppingBag },
    { label: "What programs are available?", icon: BookOpen },
    { label: "Where can I find research?", icon: Sparkles },
  ];
  return defaultSuggestions;
}

export default function ChatWidget() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const nearBottomRef = useRef(true);
  const suggestions = suggestionsFor(pathname);

  useEffect(() => {
    if (!open || window.innerWidth >= 640) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container && nearBottomRef.current) container.scrollTo?.({ top: container.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, sending, reduceMotion]);

  function resizeTextarea() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 112)}px`;
  }

  async function send(content: string) {
    const trimmed = content.trim();
    if (!trimmed || sending) return;
    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setSending(true);
    setFailedMessage(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content: text }) => ({ role, content: text })) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chat request failed.");
       const presentation: ChatPresentation | undefined = ["text", "visual_explanation", "product_overview", "steps", "specifications", "troubleshooting", "safety"].includes(data.presentation) ? data.presentation : undefined;
       setMessages((current) => [...current, { role: "assistant", content: data.message ?? "Sorry, I couldn't complete that request. Please try again.", link: data.link, presentation, question: trimmed }]);
      setInput("");
      window.requestAnimationFrame(resizeTextarea);
    } catch {
      setFailedMessage(trimmed);
      setMessages((current) => [...current, { role: "assistant", content: "Sorry, I couldn't complete that request. Please try again." }]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            initial={reduceMotion ? false : { opacity: 0, scale: .96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: .96, y: 12 }}
            transition={{ duration: .25, ease: "easeOut" }}
            aria-label="FlexPulse Assistant"
            className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-[#FAF8F6] sm:bottom-6 sm:left-auto sm:right-6 sm:top-auto sm:h-[min(600px,calc(100dvh-48px))] sm:w-[min(420px,calc(100vw-48px))] sm:rounded-[22px] sm:border sm:border-[#E8E1DB] sm:shadow-[0_20px_48px_rgba(33,30,29,.18)]"
          >
            <header className="flex shrink-0 items-center justify-between bg-[#211E1D] px-5 py-4 text-white sm:rounded-t-[22px]">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#D71920]/20 text-[#FFB9B9]"><Activity className="size-5" strokeWidth={1.7} /></span>
                <div><h2 className="text-sm font-semibold">FlexPulse Assistant</h2><p className="mt-0.5 text-xs text-white/65">Product &amp; support assistant</p></div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setOpen(false)} className="hidden size-10 place-items-center rounded-full text-white/75 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:grid" aria-label="Minimize chat"><Minus className="size-5" /></button>
                <button type="button" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-full text-white/75 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Close chat"><X className="size-5" /></button>
              </div>
            </header>

            <div ref={scrollRef} onScroll={(event) => { const target = event.currentTarget; nearBottomRef.current = target.scrollHeight - target.scrollTop - target.clientHeight < 48; }} className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5" aria-live="polite">
              {messages.length === 0 ? (
                <Welcome suggestions={suggestions} onSelect={(question) => void send(question)} reduceMotion={reduceMotion} />
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => <MessageBubble key={`${message.role}-${index}`} message={message} reduceMotion={reduceMotion} onQuickReply={(question) => void send(question)} />)}
                  {sending && <TypingIndicator reduceMotion={reduceMotion} />}
                  {failedMessage && <button type="button" onClick={() => void send(failedMessage)} className="ml-12 text-xs font-semibold text-[#D71920] underline focus-visible:outline-none">Retry</button>}
                </div>
              )}
            </div>

            <form onSubmit={submit} className="shrink-0 border-t border-[#E8E1DB] bg-white p-3 pb-[max(.75rem,env(safe-area-inset-bottom))]">
              <label className="sr-only" htmlFor="chat-message">Ask anything about FlexPulse</label>
              <div className="flex items-end gap-2 rounded-2xl border border-[#E8E1DB] bg-white p-1.5 focus-within:border-[#D71920] focus-within:ring-2 focus-within:ring-[#D71920]/15">
                <textarea ref={textareaRef} id="chat-message" value={input} onChange={(event) => { setInput(event.target.value); resizeTextarea(); }} onKeyDown={handleKeyDown} rows={1} maxLength={1200} placeholder="Ask anything about FlexPulse..." className="max-h-28 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-5 text-[#211E1D] outline-none placeholder:text-[#8A817C]" />
                <motion.button whileTap={{ scale: .96 }} type="submit" disabled={!input.trim() || sending} className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#D71920] text-white transition-colors hover:bg-[#B9121A] disabled:cursor-not-allowed disabled:opacity-45" aria-label="Send message"><Send className="size-4" /></motion.button>
              </div>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!open && <motion.button initial={reduceMotion ? false : { opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, scale: .96, y: 12 }} transition={{ duration: .25, ease: "easeOut" }} type="button" onClick={() => setOpen(true)} aria-label="Open FlexPulse Assistant" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 grid size-14 place-items-center rounded-full bg-[#D71920] text-white shadow-[0_10px_22px_rgba(215,25,32,.3)] transition-colors hover:bg-[#B9121A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:size-[58px]"><MessageCircle className="size-6" /></motion.button>}
      </AnimatePresence>
    </>
  );
}

function Welcome({ suggestions, onSelect, reduceMotion }: { suggestions: Suggestion[]; onSelect: (question: string) => void; reduceMotion: boolean | null }) {
  return <div className="space-y-5"><div className="flex items-start gap-3"><span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-[#FBE5E5] text-[#D71920]"><Sparkles className="size-4" /></span><div className="max-w-[300px] rounded-[18px] border border-[#E8E1DB] bg-white px-4 py-4 text-sm leading-relaxed text-[#625D59] shadow-[0_3px_10px_rgba(33,30,29,.03)]"><strong className="block text-[15px] text-[#211E1D]">Hi there! 👋</strong><p className="mt-2">Welcome to FlexPulse. I can help you explore our products, understand PEMF technology, or find support.</p></div></div><p className="ml-11 flex w-fit items-center gap-1.5 rounded-full bg-[#FBE5E5] px-3 py-1.5 text-xs text-[#8F3437]"><Info className="size-3.5" />For product information only — not medical advice.</p><div><p className="text-[11px] font-bold tracking-[.13em] text-[#625D59]">HOW CAN I HELP?</p><div className="mt-3 space-y-2">{suggestions.map(({ label, icon: Icon }) => <motion.button key={label} type="button" onClick={() => onSelect(label)} whileHover={reduceMotion ? undefined : { x: 2 }} whileTap={{ scale: .99 }} transition={{ duration: .18 }} className="group flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-[#E8E1DB] bg-white px-4 text-left text-sm font-medium text-[#211E1D] hover:border-[#E3B5B5] hover:bg-[#FFF9F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D71920]"><Icon className="size-4 shrink-0 text-[#D71920]" strokeWidth={1.8} /><span className="flex-1">{label}</span><ChevronRight className="size-4 text-[#625D59] transition-transform group-hover:translate-x-0.5" /></motion.button>)}</div></div></div>;
}

function MessageBubble({ message, reduceMotion, onQuickReply }: { message: Message; reduceMotion: boolean | null; onQuickReply: (question: string) => void }) {
  const user = message.role === "user";
  return <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25, ease: [0.22, 1, 0.36, 1] }} className={`flex gap-2 ${user ? "justify-end" : "justify-start"}`}>{!user && <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[#FBE5E5] text-[#D71920] max-[180px]:hidden"><Sparkles className="size-3.5" /></span>}<div className={`break-words ${user ? "max-w-[92%] whitespace-pre-wrap rounded-[18px] bg-[#D71920] px-4 py-3 text-sm leading-[1.55] text-white" : "min-w-0 flex-1"}`}>{user ? message.content : <ChatMessageRenderer content={message.content} presentation={message.presentation} question={message.question} onQuickReply={onQuickReply} />}{message.link && <a href={message.link} className={`mt-2 flex items-center gap-1 font-semibold underline ${user ? "text-white" : "text-[#D71920]"}`}>{message.link === "/contact" ? "Contact Us" : "Read Contraindications"} <ExternalLink className="size-3" /></a>}</div></motion.div>;
}

function TypingIndicator({ reduceMotion }: { reduceMotion: boolean | null }) {
  return <div className="flex items-start gap-2"><span className="mt-1 grid size-7 place-items-center rounded-full bg-[#FBE5E5] text-[#D71920]"><Sparkles className="size-3.5" /></span><div className="flex w-fit gap-1 rounded-[18px] border border-[#E8E1DB] bg-white px-4 py-3">{[0, 1, 2].map((dot) => <motion.span key={dot} animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }} transition={{ duration: .9, repeat: Infinity, delay: dot * .15 }} className="size-1.5 rounded-full bg-[#625D59]" />)}</div></div>;
}
