import * as RadixDialog from "@animate-ui/react/primitives/radix-ui/dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;

export function DialogOverlay({ className, ...props }: React.ComponentProps<typeof RadixDialog.Overlay>) {
  return (
    <RadixDialog.Overlay
      className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentProps<typeof RadixDialog.Content> {
  overlayClassName?: string;
  overlayTransition?: React.ComponentProps<typeof RadixDialog.Overlay>["transition"];
  overlayExitTransition?: React.ComponentProps<typeof RadixDialog.Overlay>["exitTransition"];
  showClose?: boolean;
}

export function DialogContent({ className, children, overlayClassName, overlayTransition, overlayExitTransition, showClose = true, ...props }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <DialogOverlay className={overlayClassName} transition={overlayTransition} exitTransition={overlayExitTransition} />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close className="absolute right-4 top-4 rounded-full p-1 text-ink-soft hover:bg-bg-soft focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Close">
            <X className="h-5 w-5" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}
export function DialogTitle({ className, ...props }: React.ComponentProps<typeof RadixDialog.Title>) {
  return <RadixDialog.Title className={cn("text-xl font-semibold", className)} {...props} />;
}
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof RadixDialog.Description>) {
  return <RadixDialog.Description className={cn("text-sm text-ink-soft", className)} {...props} />;
}
