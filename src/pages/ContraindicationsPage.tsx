import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H1, H2, P } from "@/components/ui/Typography";
import TryItCta from "@/components/layout/TryItCta";

export default function ContraindicationsPage() {
  return (
    <>
      <Section>
        <Container>
          <H1>Contraindications &amp; Cautions</H1>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <div className="space-y-6 max-w-3xl">
            <div><H2 className="text-2xl">Contraindications</H2><P className="mt-2">Do not place coils directly over implanted electronic devices (pacemakers, defibrillators, cochlear implants, pumps). PEMFs are contraindicated in organ transplant patients.</P></div>
            <div><H2 className="text-2xl">Cautions</H2><P className="mt-2">Safety not established in pregnancy. Use caution with Grave’s disease or active bleeding.</P></div>
          </div>
        </Container>
      </Section>
      <TryItCta />
    </>
  );
}
