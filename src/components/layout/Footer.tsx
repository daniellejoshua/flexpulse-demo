import { Container } from "@/components/ui/Container";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { ArrowRight, Mail, Megaphone, Tag } from "lucide-react";

const cols = [
  { title: "Products", links: [["FlexPulse G2", "/product"], ["FlexPulse Coil", "/product/flexpulse-coil"], ["Accessories", "/shop"]] },
  { title: "Resources", links: [["About Us", "/about"], ["The Science", "/science"], ["Blog", "/blog"], ["User Guide", "/getting-started"], ["FAQ", "/faq"], ["Affiliate Program", "/affiliate"]] },
  { title: "Support", links: [["Contact Us", "/contact"], ["Shipping & Handling", "/shipping"], ["Guarantee & Warranty", "/guarantee"], ["Privacy Policy", "/privacy"], ["Terms and Conditions", "/terms"]] },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#1b1816] text-[#eee9e5]">
      <Container className="py-16 sm:py-20">
        <div className="relative isolate mx-auto max-w-2xl overflow-hidden py-2 text-center sm:py-0">
          <svg className="pointer-events-none absolute -left-32 -top-16 h-44 w-[700px] text-[#D60016]/35 sm:hidden" viewBox="0 0 700 180" fill="none" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => <path key={index} d={`M-30 ${144 - index * 5}C154 ${144 - index * 5} 158 ${18 + index * 7} 348 ${18 + index * 7}s178 102 382 26`} stroke="currentColor" strokeWidth=".8" />)}
          </svg>
          <svg className="pointer-events-none absolute -bottom-14 -right-44 h-40 w-[720px] rotate-180 text-[#D60016]/35 sm:hidden" viewBox="0 0 700 180" fill="none" aria-hidden="true">
            {Array.from({ length: 8 }, (_, index) => <path key={index} d={`M-30 ${144 - index * 5}C154 ${144 - index * 5} 158 ${18 + index * 7} 348 ${18 + index * 7}s178 102 382 26`} stroke="currentColor" strokeWidth=".8" />)}
          </svg>
          <img src="/assets/flexpulse-logo.webp" alt="FlexPulse" className="relative mx-auto w-52 sm:hidden" />
          <p className="relative mt-10 text-[clamp(2rem,8vw,2.8rem)] font-bold leading-[1.08] tracking-[-.05em] text-white sm:mt-0 sm:text-xl sm:font-normal sm:leading-relaxed sm:tracking-normal sm:text-[#bdb5b0]">Stay informed with FlexPulse news and exclusive offers.</p>
          <div className="relative mt-8 grid grid-cols-3 divide-x divide-white/25 sm:hidden">
            <div className="flex flex-col items-center gap-2 px-1 text-[11px] font-medium leading-tight text-[#eee9e5]"><Mail className="size-6 text-[#FF3B43]" strokeWidth={1.75} /><span>Product Updates</span></div>
            <div className="flex flex-col items-center gap-2 px-1 text-[11px] font-medium leading-tight text-[#eee9e5]"><Tag className="size-6 text-[#FF3B43]" strokeWidth={1.75} /><span>Special Offers</span></div>
            <div className="flex flex-col items-center gap-2 px-1 text-[11px] font-medium leading-tight text-[#eee9e5]"><Megaphone className="size-6 text-[#FF3B43]" strokeWidth={1.75} /><span>New Resources</span></div>
          </div>
          <div className="relative mt-10 flex flex-col gap-3 sm:mt-6 sm:flex-row">
            <label className="sr-only" htmlFor="footer-email">Your email address</label>
            <div className="relative min-w-0 flex-1">
              <Mail className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-[#C7C4C1]" strokeWidth={1.75} />
              <input id="footer-email" type="email" placeholder="Your email address" className="h-14 w-full min-w-0 rounded-full border border-[#aaa19c] bg-[#26221f] py-0 pl-13 pr-5 text-base text-white placeholder:text-[#bdb5b0] focus:outline-none focus:ring-2 focus:ring-primary sm:rounded-2xl sm:pl-6" />
            </div>
            <button type="button" className="flex h-14 items-center justify-center gap-3 rounded-full bg-[#D60016] px-8 text-sm font-bold tracking-[0.12em] text-white transition-colors hover:bg-[#A90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1816]">SUBSCRIBE <ArrowRight className="size-5" strokeWidth={2} /></button>
          </div>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:gap-10">
          <div>
            <img src="/assets/flexpulse-logo.webp" alt="FlexPulse" className="hidden h-auto w-64 sm:block" />
            <p className="mt-7 text-2xl text-[#bdb5b0]">FlexPulse goes wherever you go.</p>
          </div>
          <Accordion type="multiple" className="border-y border-white/10 lg:hidden">
            {cols.map((column) => (
              <AccordionItem key={column.title} value={column.title} className="border-b border-white/10 last:border-b-0">
                <AccordionTrigger className="min-h-12 py-3 text-base font-normal text-white hover:text-white [&>svg]:text-white">{column.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pb-3">
                    {column.links.map(([label, href]) => <li key={label}><Link to={href} className="block text-[#bdb5b0] hover:text-white">{label}</Link></li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="hidden lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-10">
            {cols.map((column) => (
              <div key={column.title}>
                <p className="font-serif text-xl">{column.title}</p>
                <ul className="mt-5 space-y-4">
                  {column.links.map(([label, href]) => <li key={label}><Link to={href} className="text-lg text-[#bdb5b0] transition-colors hover:text-white">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
