import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function TryItCta({ compactOnMobile = false }: { compactOnMobile?: boolean }) {
  return (
    <Section className={compactOnMobile ? "bg-[#FAF8F8] md:border-y md:border-border md:bg-bg-soft" : "border-y border-border bg-bg-soft"}>
      <Container className={compactOnMobile ? "px-5 py-8 md:py-20 lg:py-24" : "py-16 sm:py-20 lg:py-24"}>
        <div className={`flex flex-col items-center gap-6 text-center ${compactOnMobile ? "gap-4 rounded-[20px] border border-[#E9E6E6] bg-white p-5 md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:p-0" : ""}`}>
          <H2 className={compactOnMobile ? "text-[26px] leading-tight md:text-5xl" : ""}>Try It for <span className={compactOnMobile ? "text-[#D60016]" : ""}>30 Days</span></H2>
          <P className={`max-w-2xl ${compactOnMobile ? "text-sm leading-[1.6] md:text-lg" : ""}`}>
            Send it back within 30 days of receipt for a refund. Return shipping is at your cost, and a 20% restocking fee applies unless it’s a manufacturer’s error. The controller carries a 2-year warranty, the charging disc and coils 6 months.
          </P>
          <div className={`mt-2 flex flex-wrap justify-center gap-3 ${compactOnMobile ? "w-full flex-col md:w-auto md:flex-row" : ""}`}>
            <Button className={compactOnMobile ? "h-12 w-full md:h-11 md:w-auto" : ""} onClick={() => (window.location.href = "/product")}>Shop Now · $999</Button>
            <Link to="/guarantee" className={compactOnMobile ? "w-full md:w-auto" : ""}><Button className={compactOnMobile ? "h-12 w-full md:h-11 md:w-auto" : ""} variant="outline">Guarantee & Warranty</Button></Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
