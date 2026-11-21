import { cn } from "@/lib/utils/cn";

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-border bg-bg-soft px-3 py-1 text-xs font-medium text-ink-soft", className)} {...props}>
      {children}
    </span>
  );
}
