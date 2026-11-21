import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { reviews } from "@/data/reviews";
import { faqItems } from "@/data/faq";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewsFaq() {
  const [index, setIndex] = useState(0);
  const r = reviews[index];
  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <Section className="bg-bg-soft">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <H2>Reviews</H2>
            <P className="mt-2">Real reviews from real FlexPulse users.</P>
            <Card className="mt-6 p-6">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <h3 className="mt-3 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
              <p className="mt-4 text-xs text-ink-soft">{r.author} · {r.date} · placeholder</p>
            </Card>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={prev} aria-label="Previous review" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-white">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-ink-soft">{index + 1} / {reviews.length}</span>
              <button onClick={next} aria-label="Next review" className="flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-white">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <H2>Frequently Asked Questions</H2>
            <P className="mt-2">Answers to common questions.</P>
            <Accordion type="single" collapsible className="mt-6">
              {faqItems.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
