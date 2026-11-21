import * as RadixAccordion from "@animate-ui/react/primitives/radix-ui/accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Accordion = RadixAccordion.Root;
export const AccordionItem = RadixAccordion.Item;

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof RadixAccordion.Trigger>) {
  return (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-left font-medium text-ink transition-all hover:text-primary [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof RadixAccordion.Content>) {
  return (
    <RadixAccordion.Content
      className={cn("overflow-hidden text-ink-soft ", className)}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </RadixAccordion.Content>
  );
}
