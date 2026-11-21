import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H1, H2, H3, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import TryItCta from "@/components/layout/TryItCta";

const spots = ["Eyes", "Neck", "Forehead", "Temples", "Upper chest", "Elbow", "Stomach", "Lower back", "Calf", "Ankle", "Knee", "Upper arm"];

export default function CoilPlacementPage() {
  return (
    <>
      <Section>
        <Container>
          <H1>Coil Placement</H1>
          <P className="mt-4 max-w-3xl">
            The FlexPulse has 2 separate ports for the coils. Each coil has a long lead. Plugging in 2 coils at the same time reduces individual power output and drains the battery faster.
          </P>
          <div className="mt-6"><Button onClick={() => (window.location.href = "/product")}>Shop Now · $999</Button></div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <H2>Coils can be placed anywhere on the body</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {spots.map((s) => (
              <div key={s} className="rounded-2xl bg-white p-6 border border-border text-center">
                <H3 className="text-lg">{s}</H3>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-3xl">
            <H2 className="text-2xl">Securing a coil</H2>
            <P className="mt-2">Ensure the side with the large circle printed on it faces the body. Secure with a wrap, band, athletic tape, or snug clothing.</P>
            <P className="mt-2 text-sm">Don’t place coils directly over an implanted electronic device. Read the contraindications and cautions before your first session.</P>
          </div>
        </Container>
      </Section>
      <TryItCta />
    </>
  );
}
