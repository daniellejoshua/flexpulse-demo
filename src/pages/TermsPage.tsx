import { AlertTriangle, FileText, Gavel, HeartPulse, Landmark, Scale, ShieldCheck, ShoppingCart } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type LegalSection = {
  title: string;
  icon: typeof FileText;
  paragraphs: string[];
};

const sections: LegalSection[] = [
  {
    title: "Ordering and payment",
    icon: ShoppingCart,
    paragraphs: [
      "It is your responsibility to know and obey all local, state, federal and international laws that apply to the possession, use and sale of any item you buy from the Site. By placing an order, you agree that the products you order will be used only in a lawful manner.",
      "While it is our practice to confirm orders by email, receiving an order confirmation email does not mean we have accepted your order or confirmed an offer to sell. We may, without prior notice, limit the quantity of any product, refuse service to any customer, or ask you to verify information before we accept or ship an order.",
      "By placing an order, you authorize our payment processor to charge the payment method you provide. If your payment is declined, your order will not be accepted and you will be notified that the payment failed.",
      "The Site calculates sales tax on U.S. orders where applicable. It does not calculate VAT or international duties or taxes. International customers are responsible for all duties and taxes charged by their local authorities.",
    ],
  },
  {
    title: "Shipping and delivery",
    icon: ShoppingCart,
    paragraphs: [
      "We process and ship orders within 1–2 business days after payment is received, using standard UPS or USPS services. Orders are processed and shipped Monday through Thursday, 9:00 AM – 4:00 PM Eastern Time, excluding holidays. Once shipped, allow up to 14 business days for U.S. delivery and up to 3 weeks for international delivery.",
      "A signature is required on all deliveries.",
      "For international orders, request a shipping quote through our Contact Us page. International customers pay all import duties and taxes.",
      "Full details are on our Shipping & Handling page.",
    ],
  },
  {
    title: "30-day satisfaction guarantee and returns",
    icon: ShieldCheck,
    paragraphs: [
      "All sales are final, except as provided by our 30-day satisfaction guarantee and the warranty below, or if a product is defective.",
      "If you are not benefiting from your FlexPulse PEMF device, you may request a return for a refund within 30 days of the date you receive it. We may choose to extend this period for a fair reason, at our discretion. Replacement coils and chargers bought separately have a limited 30-day guarantee, subject to the conditions and restocking fee below.",
      "Returned merchandise must be in excellent condition, with all parts, accessories and original packaging.",
      "You must get a Return Merchandise Authorization (RMA) number from us before sending anything back. Units returned without an RMA number will not be accepted.",
      "A 20% restocking fee is deducted from the refund for any return other than a manufacturer’s error.",
      "You are responsible for return shipping fees, which are non-refundable.",
      "We strongly suggest you insure the return shipment and get tracking and shipping confirmation. Returns damaged in transit will not be accepted, and we are not responsible for packages lost on the way back to us.",
      "Refunds are made to the original method of payment.",
      "To request an RMA number, contact us. Full details are on our Guarantee & Warranty page.",
    ],
  },
  {
    title: "Warranty",
    icon: ShieldCheck,
    paragraphs: [
      "FlexPulse products come with a warranty that provides free servicing during the warranty term, less shipping costs. The term starts on the date you receive the product:",
      "Controller: 2 years\nCharging disc: 6 months\nCoil applicators: 6 months",
      "The same terms apply to replacement coils and chargers bought separately: a 6-month warranty against manufacturer defects.",
      "The warranty applies only if the product is non-functional because of a production defect that is not present in other systems of the same model. To start a warranty claim, contact us. For servicing outside the warranty, contact us and we will make every effort to make it possible at minimal expense.",
    ],
  },
  {
    title: "Warranty disclaimer",
    icon: AlertTriangle,
    paragraphs: [
      "OTHER THAN THE EXPRESS WARRANTY ABOVE, TO THE FULLEST EXTENT PERMITTED BY LAW, FLEXPULSE DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS, AND FITNESS FOR A PARTICULAR PURPOSE. WE MAKE NO WARRANTY THAT OUR PRODUCTS WILL MEET YOUR REQUIREMENTS, NOR DO WE MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM THEIR USE. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED FROM YOU OR FROM US SHALL CREATE ANY WARRANTY NOT EXPRESSLY MADE IN THESE TERMS.",
    ],
  },
  {
    title: "Health information and medical disclaimer",
    icon: HeartPulse,
    paragraphs: [
      "FlexPulse products have not been evaluated by the FDA. These products do not claim to diagnose, treat, cure, or prevent any medical condition. The information on this Site has also not been evaluated by the FDA.",
    ],
  },
  {
    title: "No medical advice",
    icon: HeartPulse,
    paragraphs: [
      "Nothing on this Site, in our emails, or in conversations with our staff is medical advice or any form of diagnosis or treatment. All information we provide is for general informational and educational purposes only. Using the Site or buying a product does not create a doctor–patient relationship with FlexPulse or anyone associated with it, even if that person is a physician or other licensed health care practitioner. Whether to use PEMF is your own decision, to be made after considering this information and discussing it with your own medical providers.",
    ],
  },
  {
    title: "Using the information on this Site",
    icon: FileText,
    paragraphs: [
      "Reliance on any information provided by FlexPulse or its staff is solely at your own risk, and neither FlexPulse nor its principals nor anyone associated with it is responsible or liable for the use or misuse of that information.",
      "Always seek the advice of a qualified health professional about any questions or concerns you have about your specific health or any medications, herbs or supplements you are taking, and before acting on anything you read on this Site. Do not disregard medical advice or delay seeking it because of something you read here. Nothing on this Site recommends that you start, change or stop any treatment provided by a qualified health professional. If you have or suspect that you have a medical problem, contact a qualified health professional promptly. If you are experiencing a medical emergency, call 911 or go to your nearest emergency room. Do not use this Site for emergencies.",
      "Before using a FlexPulse device, read the user manual and our Contraindications & Cautions page.",
    ],
  },
  {
    title: "Blog",
    icon: FileText,
    paragraphs: [
      "Our blog and other published materials are an effort to provide educational material and reflect their authors’ own judgment. They are not a peer-reviewed journal, a sponsored publication, or the product of gatekeeping and editing. Do not rely on anything in the blog without using common sense and the help of your licensed health care practitioners.",
    ],
  },
  {
    title: "Testimonials and reviews",
    icon: FileText,
    paragraphs: [
      "Testimonials, reviews and real-world experiences shown on this Site are for illustration only. Results vary, and they are not a warranty or guarantee that you will achieve the same or similar results.",
    ],
  },
  {
    title: "No warranties for the Site",
    icon: AlertTriangle,
    paragraphs: [
      "The Site and all content on, downloaded from, or accessed through it are provided “as is” for informational purposes only, without guarantees or warranties of any kind. FlexPulse makes no representations or warranties of any kind about the Site or its content. TO THE FULLEST EXTENT PERMITTED BY LAW, FLEXPULSE DISCLAIMS ALL WARRANTIES, EITHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF THIRD PARTIES’ RIGHTS, AND FITNESS FOR A PARTICULAR PURPOSE, WITH RESPECT TO THE SITE AND ITS CONTENT.",
      "IF YOU ARE DISSATISFIED WITH ANY OF THE CONTENT OR MATERIALS ON THE SITE, OR ANY INFORMATION AVAILABLE THROUGH IT, YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP ACCESSING AND USING THE SITE. THIS LIMITATION APPLIES EVEN IF YOUR REMEDIES UNDER THESE TERMS FAIL OF THEIR ESSENTIAL PURPOSE. This does not affect your rights under our satisfaction guarantee or product warranty.",
    ],
  },
  {
    title: "Limitation of liability",
    icon: Scale,
    paragraphs: [
      "Neither FlexPulse nor any individual, business partner, agent or practitioner associated with FlexPulse is liable for any damages resulting from the use of the information on this Site. You agree that any reliance on or use of any information available on this Site is entirely at your own risk. While every attempt has been made to verify the information on this Site, neither the owners, distributors, agents, publishers nor their affiliates assume any responsibility or liability for any errors, inaccuracies or omissions in it, or for results from using it. No party is liable for any direct, incidental, consequential, indirect or punitive damages arising out of your access to, or use of, this Site.",
      "To the extent permitted under applicable law, in no event will FlexPulse or its officers, employees, directors, affiliates, partners, agents, advisors or licensors be liable for any indirect, incidental, special, consequential or exemplary damages, including but not limited to damages for loss of revenues, profits, use, data or other intangible losses (even if they were advised of, knew of, or should have known of the possibility of such damages, and notwithstanding the failure of essential purpose of any limited remedy), arising out of or related to your use of the Site or FlexPulse content, whether the damages are based on contract, tort, warranty, statute or otherwise. Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for incidental or consequential damages, so some of the above limitations and disclaimers may not apply to you. Where we cannot, as a matter of applicable law, disclaim an implied warranty or limit our liability, the scope and duration of that warranty and the extent of our liability will be the minimum permitted by that law.",
    ],
  },
  {
    title: "Indemnification and release of claims",
    icon: Gavel,
    paragraphs: [
      "You fully and completely hold harmless, indemnify and release FlexPulse and its agents, consultants, affiliates, joint venture partners, employees, shareholders, directors, staff, team members and anyone otherwise affiliated with our business from any and all causes of action, allegations, suits, claims, damages or demands whatsoever, in law or equity, that may arise in the past, present or future and that are in any way related to this Site.",
    ],
  },
  {
    title: "Copyright and trademarks",
    icon: FileText,
    paragraphs: [
      "Unless otherwise noted, all materials on this Site, including the text, site design, logos, graphics, icons and images, and their selection, assembly and arrangement, are the property of FlexPulse or its licensors. All rights reserved.",
      "You may use the Site to shop and place orders, and you may display, download, archive and print a single copy of information on it for your own personal, non-commercial use. It may not be used for resale, distribution, public display or performance, or any other purpose. Downloading, printing or otherwise using Site content for personal use does not give you any ownership rights in it.",
      "Otherwise, no part of the Site or its content may be copied, reproduced, modified, republished, uploaded, posted, transmitted or distributed in any form or by any means without our prior written permission. All rights not expressly granted are reserved. You acknowledge that the Site and its content were developed through significant investment of time, effort and expense and are valuable assets that need protection from improper and unauthorized use. Any unauthorized use may violate copyright, trademark and other laws and could result in criminal or civil penalties, and we reserve the right to pursue it to the fullest extent of the law.",
    ],
  },
  {
    title: "Links to other websites",
    icon: FileText,
    paragraphs: [
      "The Site may link to other websites, information, software, data or other content, on or off the internet, that are outside our control. We do not review content reached through such links and are not responsible for it. Following any link to another website is at your own risk. The information, software, data or other content (including opinions, claims and comments) on linked websites belongs to the companies responsible for those websites and should not be attributed to us. We have not attempted to verify the truth or accuracy of any such opinion, claim or comment, and we do not endorse or support them. We do not warrant, and are not responsible for, any information, software, data, privacy policies or other content outside our control.",
    ],
  },
  {
    title: "Content licensed from third parties",
    icon: FileText,
    paragraphs: [
      "Some content on the Site may be licensed from third parties, and those licenses may contain additional terms. Where they do, we will make those terms available to you on the pages concerned.",
    ],
  },
  {
    title: "Privacy",
    icon: ShieldCheck,
    paragraphs: [
      "Our Privacy Policy explains what information we collect when you use the Site or place an order, how we use it, and your choices. The Site uses cookies, including to keep track of your shopping cart. You can unsubscribe from our marketing emails at any time by following the instructions in any email you receive from us.",
    ],
  },
  {
    title: "Email and online forms",
    icon: AlertTriangle,
    paragraphs: [
      "Email sent to or from FlexPulse is not a secure means of communication and is not compliant with HIPAA security standards. Any personal information, including health information, could be exposed if sent this way. FlexPulse is not responsible for the privacy or security of information sent by email or submitted through forms on the Site, and disclaims any liability under HIPAA or other federal or state laws, including claims under implied contract or tort. If you email us or submit a request, you do so at your own risk, accept that risk, and release FlexPulse from any liability arising from or related to any unauthorized access.",
    ],
  },
  {
    title: "Accessibility",
    icon: FileText,
    paragraphs: [
      "If you have difficulty accessing or reading our pages because of a disability, please reach us through our Contact Us page.",
    ],
  },
  {
    title: "Changes to these Terms and the Site",
    icon: FileText,
    paragraphs: [
      "To the extent permitted by applicable law, we may modify these Terms at any time. Your continued use of the Site after the effective date of any change constitutes your acceptance of it. We may also modify, disable access to, or discontinue all or any part of the Site, temporarily or permanently, at our sole discretion and without liability or notice to you.",
    ],
  },
  {
    title: "Governing law and disputes",
    icon: Landmark,
    paragraphs: [
      "These Terms are governed by the laws of the State of New York. Any dispute arising from these Terms or a purchase from the Site will be resolved by arbitration administered by the American Arbitration Association (AAA).",
    ],
  },
  {
    title: "Contact us",
    icon: FileText,
    paragraphs: [
      "Questions about these Terms? Get in touch:",
      "Mail: Magitek Inc. d/b/a FlexPulse, 3954 State Highway 7, Oneonta, NY 13820, USA",
      "Online: our Contact Us page",
    ],
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42 } },
};

function toId(title: string) {
  return `terms-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const documentSections = sections.map(({ title }) => document.getElementById(toId(title))).filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveSection(documentSections.indexOf(current.target as HTMLElement));
    }, { rootMargin: "-130px 0px -55% 0px", threshold: [0.05, 0.25] });
    documentSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    event.preventDefault();
    setActiveSection(index);
    document.getElementById(toId(sections[index].title))?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${toId(sections[index].title)}`);
  };

  return (
    <main className="bg-[#FAF8F8] text-[#17191D]">
      <section className="relative overflow-hidden border-b border-[#E9E6E6] bg-gradient-to-br from-white to-[#FAF8F8]">
        <WaveDecoration />
        <div className="relative mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 xl:px-0">
          <motion.p initial={reduceMotion ? false : "hidden"} animate="visible" variants={reveal} className="flex items-center gap-2 text-[11px] font-bold tracking-[.14em] text-[#D60016]"><span className="h-px w-7 bg-[#D60016]" />LEGAL</motion.p>
          <motion.h1 initial={reduceMotion ? false : "hidden"} animate="visible" variants={reveal} transition={{ delay: 0.06 }} className="mt-4 text-[clamp(2.25rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-.055em]">Terms and Conditions</motion.h1>
          <p className="mt-3 text-sm text-[#626975]">Last updated: October 1, 2026</p>
          <motion.p initial={reduceMotion ? false : "hidden"} animate="visible" variants={reveal} transition={{ delay: 0.12 }} className="mt-5 max-w-[780px] text-[15px] leading-[1.7] text-[#626975]">The website at flexpulse.com (the “Site”) and the online store on it are operated by Magitek Inc. d/b/a FlexPulse (“FlexPulse,” “we,” “us,” or “our”). These Terms and Conditions (“Terms”) apply to your use of the Site and to every purchase you make from it, including the FlexPulse G2 PEMF device, replacement coils and chargers. By viewing the Site or anything made available on or through it, or by placing an order, you agree to these Terms.</motion.p>
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-[#E9E6E6] bg-white shadow-[0_5px_12px_rgba(23,25,29,.04)] lg:hidden">
        <nav className="px-5 py-3 sm:px-8" aria-label="Browse terms sections">
          <p className="mb-2 text-[11px] font-bold tracking-[.13em] text-[#D60016]">BROWSE SECTIONS</p>
          <div className="flex snap-x gap-2 overflow-x-auto pb-1 pr-5 scroll-smooth [overscroll-behavior-x:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sections.map(({ title }, index) => (
              <a key={title} href={`#${toId(title)}`} onClick={(event) => navigate(event, index)} className={`inline-flex h-9 shrink-0 snap-start items-center rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] ${activeSection === index ? "border-[#D60016] bg-[#D60016] text-white" : "border-[#E9E6E6] bg-white text-[#3F454E]"}`}>{title}</a>
            ))}
          </div>
        </nav>
      </div>

      <section className="px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-14">
        <div className="mx-auto grid max-w-[1200px] gap-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <nav className="sticky top-[116px] max-h-[calc(100vh-9rem)] overflow-y-auto border-l border-[#E9E6E6] pl-5" aria-label="On this page">
              <p className="mb-4 text-[11px] font-bold tracking-[.13em] text-[#D60016]">ON THIS PAGE</p>
              <div className="space-y-1 pr-2">
              {sections.map(({ title }, index) => (
                <a key={title} href={`#${toId(title)}`} onClick={(event) => navigate(event, index)} className={`relative block py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D60016] focus-visible:ring-offset-2 ${activeSection === index ? "font-semibold text-[#D60016]" : "text-[#626975] hover:text-[#17191D]"}`}>
                  {activeSection === index && <motion.span layoutId="terms-active-indicator" transition={{ duration: reduceMotion ? 0 : 0.22 }} className="absolute -left-[21px] inset-y-1 w-0.5 bg-[#D60016]" />}
                  {title}
                </a>
              ))}
              </div>
            </nav>
          </aside>
          <div className="min-w-0 space-y-3">
            {sections.map(({ title, icon: Icon, paragraphs }, index) => (
              <motion.article key={title} id={toId(title)} initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={reveal} transition={{ delay: reduceMotion ? 0 : Math.min(index, 5) * 0.05 }} className="scroll-mt-28 rounded-[18px] border border-[#E9E6E6] bg-white p-5 shadow-[0_5px_14px_rgba(23,25,29,.035)] sm:grid sm:grid-cols-[64px_1px_1fr] sm:gap-6 sm:p-6">
                <span className="mb-4 grid size-12 place-items-center rounded-[14px] bg-[#FCEAEC] text-[#D60016] sm:mb-0 sm:size-16"><Icon className="size-6 sm:size-7" strokeWidth={1.55} /></span>
                <span className="hidden bg-[#E9E6E6] sm:block" />
                <div>
                  <h2 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold tracking-[-.03em]">{title}</h2>
                  <div className="mt-3 space-y-4 text-[14px] leading-[1.7] text-[#626975] sm:text-[15px]">
                    {paragraphs.map((paragraph) => <p key={paragraph} className="whitespace-pre-line">{renderLinkedText(paragraph)}</p>)}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function renderLinkedText(text: string) {
  const links: Record<string, string> = {
    "Shipping & Handling page": "/shipping",
    "Guarantee & Warranty page": "/guarantee",
    "Contraindications & Cautions page": "/contraindications",
    "Privacy Policy": "/privacy",
    "Contact Us page": "/contact",
  };
  const match = Object.keys(links).find((label) => text.includes(label));

  if (!match) return text;

  const [before, after] = text.split(match);
  return <>{before}<Link to={links[match]} className="font-semibold text-[#D60016] underline underline-offset-2">{match}</Link>{after}</>;
}

function WaveDecoration() {
  return <svg className="pointer-events-none absolute right-[-100px] top-[-80px] hidden h-[360px] w-[600px] text-[#D60016]/10 lg:block" viewBox="0 0 600 360" fill="none" aria-hidden="true"><path d="M122 359C233 254 301 83 592 20" stroke="currentColor" /><path d="M165 362C276 264 343 122 615 62" stroke="currentColor" /><path d="M211 362C322 278 387 162 621 107" stroke="currentColor" /></svg>;
}
