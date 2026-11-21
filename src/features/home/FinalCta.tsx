import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { PulseImage } from "@/components/ui/PulseImage";

export default function FinalCta() {
  return (
    <section className="w-full bg-primary">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20 lg:px-12 lg:py-24 xl:px-16">
        <PulseImage
          src="/assets/flexpulse-front.webp"
          alt="FlexPulse G2"
          containerClassName="h-40 w-40 shrink-0"
          className="h-full w-full object-contain"
          loading="lazy"
        />
        <div className="flex-1 text-center md:text-left">
          <H2 className="text-white">Ready to recover smarter?</H2>
          <P className="mt-2 text-white/80">Shop FlexPulse G2 today.</P>
        </div>
        <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => (window.location.href = "/product")}>
          Shop Now
        </Button>
      </div>
    </section>
  );
}
