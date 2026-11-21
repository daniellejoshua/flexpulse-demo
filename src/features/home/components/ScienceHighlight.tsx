import type { LucideIcon } from "lucide-react";

interface ScienceHighlightProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ScienceHighlight({ icon: Icon, title, description }: ScienceHighlightProps) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-7 w-7 shrink-0 text-white" strokeWidth={1.6} />
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="mt-1 max-w-[190px] text-sm leading-snug text-[#E4DAD7]">{description}</p>
      </div>
    </div>
  );
}
