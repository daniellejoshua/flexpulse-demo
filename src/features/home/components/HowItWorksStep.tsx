import { motion, type Variants } from "motion/react";
import type { HowItWorksStepData } from "./how-it-works.data";

interface HowItWorksStepProps {
  step: HowItWorksStepData;
  isLast: boolean;
  variants: Variants;
}

export default function HowItWorksStep({ step, isLast, variants }: HowItWorksStepProps) {
  const Icon = step.icon;

  return (
    <motion.article variants={variants} className="relative flex gap-4 py-5 sm:block sm:px-6 sm:py-0 sm:first:pl-0">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] text-lg font-bold text-primary">
        {step.number}
      </div>
      <div className="min-w-0 sm:mt-5">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.7} />
        <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">{step.title}</h3>
        <p className="mt-2 max-w-[190px] text-sm leading-snug text-ink-soft">{step.description}</p>
      </div>
      {!isLast && (
        <span className="absolute bottom-0 left-7 top-[56px] border-l border-primary/40 sm:-right-1 sm:left-auto sm:top-7 sm:h-px sm:w-7 sm:border-l-0 sm:border-t" aria-hidden="true" />
      )}
    </motion.article>
  );
}
