import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  return (
    <Section id="reviews">
      <Container>
        <div className="text-center mb-12">
          <H2>Reviews</H2>
          <P className="mx-auto mt-4 max-w-2xl">Mock reviews shown as placeholders — not verified customer feedback.</P>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.id} className="p-6">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <h3 className="mt-3 font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
              <p className="mt-4 text-xs text-ink-soft">{r.author} · {r.date} · placeholder</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
