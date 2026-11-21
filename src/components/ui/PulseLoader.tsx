import { motion } from "motion/react";
import { cn } from "@/lib/utils/cn";

interface PulseLoaderProps {
  className?: string;
  label?: string;
}

export function PulseLoader({ className, label = "Loading" }: PulseLoaderProps) {
  return (
    <div className={cn("grid place-items-center", className)} role="status" aria-live="polite">
      <div className="relative grid h-14 w-14 place-items-center" aria-hidden="true">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [0.65, 1.35], opacity: [0.75, 0] }}
          transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-primary/70"
          animate={{ scale: [0.65, 1.35], opacity: [0.65, 0] }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.45, repeat: Infinity }}
        />
        <span className="relative h-3 w-3 rounded-full bg-primary" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
