import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { H2, P } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Zap, Feather, Shield } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations/presets";

const features = [
  { icon: Zap, title: "10 Wellness Programs", desc: "A range of programs for different needs." },
  { icon: Feather, title: "Portable", desc: "Compact and easy to carry." },
  { icon: Shield, title: "Reliable", desc: "Durable build for daily use." },
];

export default function ProductSpotlight() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[#FFF0F0]" />
            <img
              src="/assets/flexpulse-front.webp"
              alt="FlexPulse G2 controller"
              className="w-full rounded-2xl object-cover aspect-[4/3]"
              loading="lazy"
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-primary">
              Product Spotlight
            </motion.span>
            <motion.div variants={fadeUp}>
              <H2>Meet the FlexPulse G2</H2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <P>
                A compact, portable wellness device built for everyday recovery and relaxation. Designed to fit into your routine at home, at work, or on the go.
              </P>
            </motion.div>
            <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-ink-soft">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <Button onClick={() => (window.location.href = "/product")}>Learn More</Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
