import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";

export default function FaqSection() {
  return (
    <Section className="bg-bg-soft">
      <Container>
        <div className="text-center mb-12">
          <H2>Frequently Asked Questions</H2>
          <P className="mx-auto mt-4 max-w-2xl">Answers to common questions. (Mock content.)</P>
        </div>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {faqItems.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
