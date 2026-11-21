import { Layers3 } from "lucide-react";

export default function ProgramHighlight() {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#FBE5E5] text-primary">
        <Layers3 className="h-8 w-8" strokeWidth={1.7} />
      </span>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-[#171514]">10 Pre-configured Programs</h3>
        <p className="mt-2 max-w-[390px] text-[15px] leading-relaxed text-[#5F5B58]">
          From 3 Hz to 1000 Hz, finding the right one for your routine takes seconds.
        </p>
      </div>
    </div>
  );
}
