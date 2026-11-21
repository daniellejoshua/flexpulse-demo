import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { flexPulseG2 } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PulseImage } from "@/components/ui/PulseImage";

export default function ShopSection() {
  const product = flexPulseG2;
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  const prev = () => setIndex((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-bg-soft">
              <PulseImage
                src={product.images[index]}
                alt={`${product.name} ${index + 1}`}
                containerClassName="aspect-square w-full"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`overflow-hidden rounded-xl border-2 ${i === index ? "border-primary" : "border-transparent"}`}
                  aria-label={`View image ${i + 1}`}
                >
                  <PulseImage
                    src={img}
                    alt=""
                    containerClassName="h-20 w-20"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Purchase info */}
          <div className="space-y-6">
            <H2>{product.name}</H2>
            <p className="text-3xl font-bold">${product.price}</p>
            <P>{product.description}</P>

            <div>
              <p className="font-semibold mb-2">Key included accessories</p>
              <ul className="list-disc pl-5 text-ink-soft space-y-1">
                {product.packageContents.slice(0, 5).map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <QuantitySelector value={qty} onChange={setQty} />
              <Button size="lg" className="flex-1" onClick={() => { addItem(product, qty); setCartOpen(true); }}>
                Add to Cart
              </Button>
            </div>

            <p className="text-xs text-ink-soft">Shipping and taxes calculated at checkout. (Mock — no real order.)</p>

            <Accordion type="single" collapsible>
              <AccordionItem value="specs" className="border-b border-border">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <dl className="grid grid-cols-2 gap-2 text-sm">
                    {product.details.map((d) => (
                      <div key={d.label} className="rounded-xl bg-bg-soft p-3">
                        <dt className="text-ink-soft">{d.label}</dt>
                        <dd className="font-medium">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="package" className="border-b border-border">
                <AccordionTrigger>Package Contents</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 text-ink-soft space-y-1">
                    {product.packageContents.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="info" className="border-b border-border">
                <AccordionTrigger>Additional Information</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-ink-soft">
                    Designed and manufactured in Germany. 30-day satisfaction guarantee. 2-year warranty on controller.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
