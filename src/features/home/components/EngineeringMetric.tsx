import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface EngineeringMetricProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export default function EngineeringMetric({ icon: Icon, value, label }: EngineeringMetricProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className="flex items-center gap-4 py-5 sm:gap-5 sm:py-6"
    >
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-[#FCE9E6] sm:size-[4.5rem]">
        <Icon className="size-7 text-primary sm:size-8" strokeWidth={1.7} />
      </span>
      <div>
        <p className="text-[clamp(1.875rem,2.5vw,2.25rem)] font-extrabold leading-none tracking-[-0.05em] text-[#171515]">{value}</p>
        <p className="mt-2 max-w-32 text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#5D5755]">{label}</p>
      </div>
    </motion.div>
  );
}
