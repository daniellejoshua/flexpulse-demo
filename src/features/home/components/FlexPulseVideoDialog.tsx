import { useState } from "react";
import { Play, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { PulseLoader } from "@/components/ui/PulseLoader";

const videoId = "BJODI4VTpow";

interface FlexPulseVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FlexPulseVideoDialog({ open, onOpenChange }: FlexPulseVideoDialogProps) {
  const [loaded, setLoaded] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setLoaded(false);
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showClose={false}
        overlayClassName="bg-[rgba(17,13,13,0.72)] backdrop-blur-[7px]"
        className="bottom-0 left-0 top-auto max-h-[92dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-b-none rounded-t-[24px] bg-[#FFFCFA] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(27,17,17,0.2)] sm:p-5 md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[calc(100dvh-48px)] md:w-[min(1100px,94vw)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[24px] md:p-6 md:shadow-[0_20px_60px_rgba(27,17,17,0.28)]"
      >
        <div>
          <DialogHeader className="mb-4 flex flex-row items-start gap-3 pr-0 sm:mb-5 sm:items-center sm:gap-4">
            <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-[#FCE9E9] text-primary sm:grid">
              <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <DialogTitle className="text-[20px] font-bold leading-tight tracking-[-0.03em] text-[#171515] sm:text-[26px]">
                See the FlexPulse in Action
              </DialogTitle>
              <DialogDescription className="mt-1 text-[13px] text-[#66615F] sm:text-[15px]">
                FlexPulse G2 demonstration video
              </DialogDescription>
            </div>
            <DialogClose
              className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F4F0EE] text-[#171515] transition-colors duration-200 hover:bg-[#EAE4E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:size-11"
              aria-label="Close video"
            >
              <X className="size-5" />
            </DialogClose>
          </DialogHeader>

          {open && (
            <div className="relative aspect-video max-h-[calc(100dvh-180px)] overflow-hidden rounded-2xl bg-[#171515]">
              {!loaded && <PulseLoader className="absolute inset-0 z-10 bg-[#171515]" label="Loading demonstration video" />}
              <iframe
                className={`h-full w-full transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&enablejsapi=1&rel=0`}
                title="FlexPulse G2 demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setLoaded(true)}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
