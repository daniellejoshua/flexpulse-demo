import { CalendarDays, ChartNoAxesColumnIncreasing, Waves, type LucideIcon } from "lucide-react";

export interface HowItWorksStepData {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const howItWorksSteps: HowItWorksStepData[] = [
  {
    number: "01",
    title: "Choose a Program",
    description: "Select from wellness programs that fit your needs.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Apply & Relax",
    description: "Use the included applicators in a comfortable position.",
    icon: Waves,
  },
  {
    number: "03",
    title: "Feel the Difference",
    description: "Support relaxation and your overall wellness routine.",
    icon: ChartNoAxesColumnIncreasing,
  },
];
