import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H1, H3, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import TryItCta from "@/components/layout/TryItCta";

const programs = [
  { id: "P1", hz: "3 Hz", title: "Deep relaxation", body: "Delta band. Evening use; coils across the temples." },
  { id: "P2", hz: "7.8 Hz", title: "Schumann resonance", body: "Theta band. Relaxation and meditation; coils anywhere." },
  { id: "P3", hz: "10 Hz", title: "Alpha relaxation", body: "All-round relaxed, meditative break." },
  { id: "P4", hz: "14 Hz", title: "SMR / relaxed attention", body: "Quiet, focused time; coils above the ears." },
  { id: "P5", hz: "23 Hz", title: "Alertness", body: "Beta band; daytime use. Avoid before bedtime." },
  { id: "P6", hz: "40 Hz", title: "Gamma focus", body: "Focused work or study; avoid with anxiety/insomnia/pain/seizures/tinnitus." },
  { id: "P7", hz: "50 Hz", title: "High gamma", body: "Powerline frequency in Europe; gamma applications." },
  { id: "P8", hz: "60 Hz", title: "High gamma", body: "Powerline frequency in the US; gamma applications." },
  { id: "P9", hz: "10/100 Hz", title: "Muscle oscillation", body: "Alternates every minute; for muscles, joints, tendons, ligaments." },
  { id: "P10", hz: "1000 Hz", title: "Highest frequency", body: "Coils on top of the head; 10-30 minutes." },
];

export default function ProgramsPage() {
  return (
    <>
      <Section>
        <Container>
          <H1>The Programs</H1>
          <P className="mt-4 max-w-3xl">
            The FlexPulse G2 comes with 10 programs producing pulsed electromagnetic fields tuned to frequencies selected by experts, from 3 Hz to 1000 Hz.
          </P>
          <div className="mt-6"><Button onClick={() => (window.location.href = "/product")}>Shop Now · $999</Button></div>
        </Container>
      </Section>
      <Section className="bg-bg-soft">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {programs.map((p) => (
              <div key={p.id} id={`program-${p.id.toLowerCase()}`} className="rounded-2xl bg-white p-6 border border-border">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">{p.id}</span>
                  <span className="text-sm font-semibold text-ink-soft">{p.hz}</span>
                </div>
                <H3 className="mt-3 text-lg">{p.title}</H3>
                <P className="mt-2 text-sm">{p.body}</P>
              </div>
            ))}
          </div>
          <P className="mt-6 text-sm">The FlexPulse is not a substitute for professional care. If you’re dealing with depression or any mental health concern, talk to a professional first.</P>
        </Container>
      </Section>
      <TryItCta />
    </>
  );
}
