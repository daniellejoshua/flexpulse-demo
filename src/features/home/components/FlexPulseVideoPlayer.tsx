import { Play } from "lucide-react";
import { PulseImage } from "@/components/ui/PulseImage";
import { useUiStore } from "@/stores/uiStore";

export default function FlexPulseVideoPlayer() {
  const setDemoOpen = useUiStore((s) => s.setDemoOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setDemoOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[1.35rem] border border-[#E6DEDA] bg-[#EDE7E4] text-left shadow-[0_18px_35px_rgba(50,35,28,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        aria-label="Play FlexPulse demonstration video"
      >
        <PulseImage
          src="/assets/flexpulse-wellness.webp"
          alt="Woman relaxing while wearing the FlexPulse headband"
          containerClassName="aspect-video w-full"
          className="h-full w-full object-cover object-[61%_center] transition-transform duration-300 group-hover:scale-[1.015]"
          loading="lazy"
        />
        <span className="absolute inset-0 bg-white/5 transition-colors duration-300 group-hover:bg-white/15" />
        <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-[0_8px_22px_rgba(45,25,20,0.2)] transition-transform duration-200 group-hover:scale-105 sm:h-[72px] sm:w-[72px]">
          <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
        </span>
      </button>
    </>
  );
}
