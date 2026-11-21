import { cn } from "@/lib/utils/cn";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-2xl border border-border bg-white shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}
