import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "motion/react";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "right" | "bottom";
  children: React.ReactNode;
  className?: string;
}

export function Drawer({ open, onOpenChange, side = "right", children, className }: DrawerProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            <RadixDialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onOpenChange(false)}
              />
            </RadixDialog.Overlay>
            <RadixDialog.Content asChild>
              <motion.div
                className={cn(
                  "fixed z-50 bg-white shadow-2xl focus:outline-none",
                  side === "right" && "right-0 top-0 h-full w-full max-w-md",
                  side === "bottom" && "bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl",
                  className,
                )}
                initial={side === "right" ? { x: "100%" } : { y: "100%" }}
                animate={side === "right" ? { x: 0 } : { y: 0 }}
                exit={side === "right" ? { x: "100%" } : { y: "100%" }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <RadixDialog.Close className="absolute right-4 top-4 rounded-full p-1 text-ink-soft hover:bg-bg-soft" aria-label="Close">
                  <X className="h-5 w-5" />
                </RadixDialog.Close>
                {children}
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  );
}
