import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H1, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { flexPulseCharger } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useUiStore } from "@/stores/uiStore";
import TryItCta from "@/components/layout/TryItCta";

export default function ChargerProductPage() {
  const product = flexPulseCharger;
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  return (
    <>
      <Section>
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <img src={product.images[0]} alt={product.name} className="aspect-square w-full rounded-3xl object-cover" loading="lazy" />
            <div className="space-y-5">
              <H1>{product.name}</H1>
              <p className="text-3xl font-bold">${product.price}</p>
              <P>{product.description}</P>
              <div className="flex items-center gap-4">
                <QuantitySelector value={qty} onChange={setQty} />
                <Button onClick={() => { addItem(product, qty); setCartOpen(true); }}>Add to Cart</Button>
              </div>
              <ul className="list-disc pl-5 text-ink-soft space-y-1">
                {product.packageContents.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <TryItCta />
    </>
  );
}
